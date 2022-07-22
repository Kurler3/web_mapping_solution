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
    // UPDATE ROUTE
    updateRoute,
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

                calculatedRoute.directions[0].features.map((f, index) => (
                    <span key={`open_controls_directions_${f.attributes.text}_${index}`}>
                        {f.attributes.text}
                    </span>
                ))

            :null}

        </div>
    );
}

export default memo(OpenControlsDirections);