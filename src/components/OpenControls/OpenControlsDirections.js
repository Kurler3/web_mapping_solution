import React, {memo, useMemo} from 'react';
import { TRANSPORT_METHODS } from '../../utils/constants';
import { secondsToHms } from '../../utils/functions';

const OpenControlsDirections = ({
    // START CORDS
    startCords,
    // END CORDS
    endCords,
    // CALCULATED ROUTE
    calculatedRoute,
    // LOADING
    loading,
    // UPDATE ROUTE
    updateRoute,
    // TRANSPORT CHOSEN,
    transportChosen,
}) => {
   
    // TOTAL TIME DURATION
    const totalTime = useMemo(() => {

        if(!calculatedRoute) return;

        let timeKey = Object.values(TRANSPORT_METHODS).find((transport) => transport.id === transportChosen).totalTimeKey;

        return secondsToHms(calculatedRoute.routes.features[0].attributes[timeKey] * 60)

    }, [calculatedRoute, transportChosen]);


    ////////////////////////
    // RENDER //////////////
    ////////////////////////

    return (
        <div className='flexColStartCenter' style={{width: '100%'}}>

            {/* GET DIRECTIONS BTN */}
            {
                startCords && endCords ? 

                <button className={`flexCenterCenter
                        ${loading?"loadingRouteBtn" : "openControlsDirectionsGetRouteBtn"}
                    `}
                    onClick={() => !loading ? updateRoute() : {}}
                >
                   
                    {
                        loading ?

                        <span className='spinner'>

                        </span>

                    :
                        <React.Fragment>
                            <span className='material-icons' style={{
                                position: 'absolute',
                                left: 0,
                                padding: '0px 10px',
                            }}>
                                alt_route
                            </span>

                            Calculate Route
                        </React.Fragment>
                    }
                    
                </button>

            :null}

            {/* MAPPING OF DIRECTIONS */}
            {
                calculatedRoute ?

                <React.Fragment>

                    {/* WARNINGS */}
                    
                    {
                        calculatedRoute.messages.length > 0 ?
                        
                        <div className='flexCenterCenter'
                            style={{
                                margin: '5px 0px',
                            }}
                        >
                            <span className='material-icons' 
                                style={{
                                    fontSize: '20px',
                                    color: 'var(--color-remove)'
                                }}
                            >warning</span>

                            <span style={{
                                fontWeight: '500',
                                marginLeft: '3px',
                            }}>There's some warnings for this route</span>
                        </div>
                    :null}

                    {/* TOTAL TRAVEL TIME +  TOTAL DISTANCE */}
                    
                    <div className='flexCenterCenter openControlsDirectionsTimeContainer'>

                            {/* TOTAL TIME */}
                            <span className="openControlsDirectionsTime">{totalTime}</span>

                            {/* TOTAL KM */}
                            <span className="openControlsDirectionsDistance">
                                ({calculatedRoute.routes.features[0].attributes.Total_Kilometers.toFixed(2)} KM)
                            </span>

                    </div>
                    

                    {/* DIRECTIONS LIST */}
                    <div className='flexColStartCenter openControlsDirectionsList'>
                        {
                            calculatedRoute.directions[0].features.map((f, index) => {

                                let timeFromLastStop = secondsToHms(f.attributes.time * 60);

                                return (
                                    <div
                                        key={`open_controls_directions_${f.attributes.text}_${index}`}
                                        className='openControlsDirectionsListItem flexColStartStart'  
                                    >

                                        <span className='openControlsDirectionsListItemText'>
                                            {f.attributes.text}
                                        </span>
                                        
                                        {
                                            timeFromLastStop ?

                                            <span className="openControlsDirectionsListItemTime">
                                                Time from last stop: {secondsToHms(f.attributes.time * 60)}
                                            </span>
                                        :null}
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
                    


                </React.Fragment>
                

            :null}

        </div>
    );
}

export default memo(OpenControlsDirections);