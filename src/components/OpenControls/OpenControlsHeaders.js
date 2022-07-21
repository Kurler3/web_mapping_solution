import {memo} from 'react';
import { TRANSPORT_METHODS } from '../../utils/constants';


const OpenControlsHeaders = ({
    // TRANSPORT CHOSEN
    transportChosen,
    // HANDLE SELECT TRANSPORT
    handleSelectTransport,
    // HANDLE CLOSE CONTROLS
    handleCloseControls,
}) => {

    return (
         <div className="flexBetweenCenter openControlsHeaders">

                {/* TRANSPORT ICONS CONTAINER */}
                <div className='flexCenterCenter' style={{flex: 1}}>
                    {
                        Object.keys(TRANSPORT_METHODS).map((transportKey) => {

                            // IF IS SELECTED OR NOT
                            let isSelected = transportChosen ? transportChosen === TRANSPORT_METHODS[transportKey].id : false;
                            
                            return (
                                <button
                                    key={`open_controls_content_transport_${TRANSPORT_METHODS[transportKey].id}_${isSelected}`} 
                                    className='material-icons openControlsContentTransportBtn'
                                    style={{
                                        color: isSelected === true ? "white":"",
                                        background: isSelected === true ? "var(--blue-bg)" : "",
                                        boxShadow: isSelected === true ? "var(--common-box-shadow)" : "",
                                    }}
                                    onClick={() => handleSelectTransport(TRANSPORT_METHODS[transportKey].id)}
                                >
                                    {TRANSPORT_METHODS[transportKey].icon}
                                </button>
                            )
                        })
                    }
                </div>
                
                {/* CLOSE BTN */}
                <button className='material-icons openControlsHeaderCloseBtn' onClick={handleCloseControls}>
                    close
                </button>
            </div>
    );
};

export default memo(OpenControlsHeaders);