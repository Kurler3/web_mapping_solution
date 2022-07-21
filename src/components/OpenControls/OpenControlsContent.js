import {memo, useCallback} from 'react';
import { APP_ACTION_TYPES } from '../../utils/constants';
import OpenControlsBody from './OpenControlsBody';
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
}) => {


    // HANDLE SELECT TRANSPORT 
    const handleSelectTransport = useCallback((transportId) => {

        // IF NOT SAME THEN UPDATE
        if(transportChosen!==transportId) {
            appDispatcher({
                type: APP_ACTION_TYPES.setKey,
                key: 'transportChosen',
                value: transportId,
            });
        }

    }, [appDispatcher, transportChosen]);

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
            

        </div>
    );
};

export default memo(OpenControlsContainer);