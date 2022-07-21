import './App.css';
import {memo, useReducer} from 'react';

// IMPORT MAP
import Map from './components/Map';
import appReducer, { initialState } from './AppState/AppDispatcher';
import Controls from './components/Controls';


const App = () => {

  // INITIALIZE APP STATE
  const [state, appDispatcher] = useReducer(appReducer, initialState);


  return (
    <div className="App">

        {/* CONTROLS (ON TOP LEFT CORNER) */}
        <Controls 
          isChoosing={state.isChoosing}
          transportChosen={state.transportChosen}
          startCords={state.startCords}
          endCords={state.endCords}
          appDispatcher={appDispatcher}
        />

        {/* MAP LIBRE MAP */}
        <Map 
          loading={state.loading}
          startCords={state.startCords}
          endCords={state.endCords}
          zoom={state.zoom}
          currentStep={state.currentStep}
         
          isChoosing={state.isChoosing}
          appDispatcher={appDispatcher}
        />

        {/* POP-UP AT BOTTOM */}

    </div>
  );
}

export default memo(App);
