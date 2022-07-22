import {memo, useCallback} from 'react';
import { APP_ACTION_TYPES } from '../utils/constants';
import OpenControlsContent from './OpenControls/OpenControlsContent';


const Controls = ({
    // IS CHOOSING OR NOT
    isChoosing,
    // TRANSPORT CHOSEN
    transportChosen,
    // START CORDS
    startCords,
    // END CORDS
    endCords,
    // APP DISPATCHER
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
}) => {


    // HANDLE OPEN CONTROL CONTAINER
    const handleOpenControlContainer = useCallback(() => {
        appDispatcher({
            type: APP_ACTION_TYPES.setKey,
            key: 'isChoosing',
            value: true,
        });
    }, [appDispatcher]);


    return (
        <div 
            className={`controlsContainer ${isChoosing ? "openControlsContainer flexColStartCenter" : ""}`}
        >
            
            {/* CLICK TO OPEN BTN */}
            {
                !isChoosing ?

                <div className='startChooseBtn flexCenterCenter'
                    onClick={handleOpenControlContainer} type="button"
                >
                
                    {/* ICON */}
                    <span className="material-icons startChooseBtnIcon">hail</span>

                    Click to choose a trajetory


                </div>
            :
            
                <OpenControlsContent 
                    startCords={startCords}
                    endCords={endCords}
                    transportChosen={transportChosen}
                    appDispatcher={appDispatcher}
                    handleResetMapData={handleResetMapData}
                    handleResetStartEndMapData={handleResetStartEndMapData}
                    handleSwitchMapData={handleSwitchMapData}
                    calculatedRoute={calculatedRoute}
                    loading={loading}
                    updateRoute={updateRoute}
                    handleChangeTransport={handleChangeTransport}
                />
            }
            
            
        </div>
    );
};

export default memo(Controls);