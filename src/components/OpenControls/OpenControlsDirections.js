import React, {memo} from 'react';

const OpenControlsDirections = ({
    // START CORDS
    startCords,
    // END CORDS
    endCords,
    // CALCULATED ROUTE
    calculatedRoute,
    // LOADING
    loading,
}) => {



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

        </div>
    );
}

export default memo(OpenControlsDirections);