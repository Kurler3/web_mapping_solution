import {memo} from 'react';


const Controls = () => {


    return (
        <div className="controlsContainer">
            
            {/* CLICK TO OPEN BTN */}
            <div className='startChooseBtn flexCenterCenter'>
                
                {/* ICON */}
                <span className="material-icons startChooseBtnIcon">hail</span>

                Click to choose a trajetory


            </div>

        </div>
    );
};

export default memo(Controls);