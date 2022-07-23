import {memo, useCallback} from 'react';
import { APP_ACTION_TYPES } from '../../utils/constants';
import OpenControlsBody from './OpenControlsBody';
import OpenControlsDirections from './OpenControlsDirections';
import OpenControlsHeaders from './OpenControlsHeaders';

const OpenControlsContainer = ({
    // START CORDS
    startCords,
    // END CORDS
    endCords,
    // TRANSPORT CHOSEN
    transportChosen,
    // APP DISPATCHER,
    appDispatcher,
    // RESET MAP DATA
    handleResetMapData,
    // RESET START/END MAP DATA
    handleResetStartEndMapData,
    // HANDLE SWITCH START/END MAP DATA
    handleSwitchMapData,
    // CALCULATED ROUTE
    calculatedRoute,
    // LOADING
    loading,
    // UPDATE ROUTE
    updateRoute,
    // HANDLE CHANGE TRANSPORT IN MAP LAYER STYLE
    handleChangeTransport,
    // HANDLE SELECT STEP
    handleSelectStep,
    // HIGHLIGHTED STEP
    highlightedStep,
}) => {


    // HANDLE SELECT TRANSPORT 
    const handleSelectTransport = useCallback((transportId) => {

        // IF NOT SAME THEN UPDATE
        if(transportChosen!==transportId) {
           

            // CHANGE MAP LAYER DATA ACCORDING TO THE TRANSPORT CHOSEN
            handleChangeTransport(transportId);

            // UPDATE STATE
            appDispatcher({
                type: APP_ACTION_TYPES.setMultiple,
                object: {
                    transportChosen: transportId,
                    calculatedRoute: null,
                    highlightedStep: null,
                }
            });

        }

    }, [appDispatcher, handleChangeTransport, transportChosen]);

    // HANDLES WHEN USER CLICKS CLOSE CONTROLS BTN
    const handleCloseControls = useCallback(() => {
        // RESET APP STATE
        appDispatcher({
            type: APP_ACTION_TYPES.reset
        });

        // RESET MAP DATA
        handleResetMapData();
    }, [appDispatcher, handleResetMapData]);

    return (
        <div className='flexColStartCenter openControlsContentContainer'
        >
            
            {/*  HEADERS */}
            <OpenControlsHeaders 
                transportChosen={transportChosen}
                handleSelectTransport={handleSelectTransport}
                handleCloseControls={handleCloseControls}
            />

            {/* BODY */}
            <OpenControlsBody 
                startCords={startCords}
                endCords={endCords}
                appDispatcher={appDispatcher}
                handleResetStartEndMapData={handleResetStartEndMapData}
                handleSwitchMapData={handleSwitchMapData}
            />

            {/* DIRECTIONS CONTAINER */}
            <OpenControlsDirections 
                startCords={startCords}
                endCords={endCords}
                calculatedRoute={calculatedRoute}
                loading={loading}
                updateRoute={updateRoute}
                transportChosen={transportChosen}
                handleSelectStep={handleSelectStep}
                highlightedStep={highlightedStep}
            />

        </div>
    );
};

export default memo(OpenControlsContainer);