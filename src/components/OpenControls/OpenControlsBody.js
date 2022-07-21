import {memo, useCallback} from 'react';
import { APP_ACTION_TYPES } from '../../utils/constants';


const OpenControlsBody = ({
    // START CORDS
    startCords,
    
    // END CORDS
    endCords,
    
    // APP DISPATCHER
    appDispatcher,

    // CALCULATED ROUTE
    calculatedRoute,

    // RESET START/END MAP DATA
    handleResetStartEndMapData,

    // HANDLE SWITCH START/END MAP DATA
    handleSwitchMapData,
}) => {

    ////////////////////////
    // FUNCTIONS ///////////
    ////////////////////////

    // HANDLE RESET START/END POINT
    const handleResetStartEndPoint = useCallback((isStart) => {
        appDispatcher({
            type: APP_ACTION_TYPES.setMultiple,
            object: {
                startCords: isStart ? null : startCords,
                endCords: null,
                calculatedRoute: startCords && endCords ? null : calculatedRoute
            }
        });

        // CALL RESET MAP POINT
        handleResetStartEndMapData(isStart);

    }, [appDispatcher, calculatedRoute, endCords, handleResetStartEndMapData, startCords]);


    // HANDLE SWITCH START/END POINT
    const handleSwitchPoints = useCallback(() => {

        // IF BOTH START CORDS AND END CORDS EXIST
        if(startCords && endCords) {

            // SWITCH IN APP STATE AND MAKE CALCULATED ROUTE BACK TO NULL
            appDispatcher({
                type: APP_ACTION_TYPES.setMultiple,
                object: {
                    startCords: endCords,
                    endCords: startCords,
                    calculatedRoute: null,
                }
            });

            // UPDATE MAP DATA
            handleSwitchMapData();

        }

    }, [appDispatcher, endCords, handleSwitchMapData, startCords]);

    

    ////////////////////////
    // RENDER //////////////
    ////////////////////////

    return (
        <div className='flexCenterCenter openControlsBody'>

            {/* START ICON + DOTS + END ICON */}
            <div className='flexColBetweenCenter' style={{minHeight: '75px'}}>

                {/* STARTING POINT */}
                <div style={{
                    width: '10px',
                    height: '10px',
                    border: "2px solid black",
                    borderRadius: '100%',
                }}></div>

                <div className='material-icons'
                    style={{
                        color: 'var(--border-gray)'
                    }}
                >
                    more_vert
                </div>

                <div className="material-icons"
                    style={{
                        color: 'red',
                        fontSize: '18px'
                    }}
                >
                    place
                </div>         
            </div>

            {/* STARTING POINT + END POINT CONTAINER*/}
            <div className='flexColCenterCenter' style={{flex: 1}}>
                
                {/* STARTING DIV */}
                <div 
                    className={`
                        ${startCords ? "openControlsBodyCordFilled" : "openControlsBodyCordContainer"}
                    `}
                    onClick={() => startCords ? handleResetStartEndPoint(true) : {}}
                >
                    {
                        startCords ? "Click to reset start point" : "Start Point"
                    }
                </div>
                
                {/* END DIV */}
                <div
                    className={`
                    ${endCords ? "openControlsBodyCordFilled" : "openControlsBodyCordContainer"}
                    `}
                    onClick={() => endCords ? handleResetStartEndPoint(false) : {}}
                >
                    {
                        endCords ? "Click to reset end point" : startCords ? "Destination Point" : "Choose starting point first"
                    }
                </div>

            </div>

            {/* SWITCH */}
            <div className='flexCenterCenter material-icons' onClick={handleSwitchPoints}>
                change_circle
            </div>

        </div>
    );
};

export default memo(OpenControlsBody);