import './App.css';
import {memo, useCallback, useReducer, useRef} from 'react';

// IMPORT MAP
import Map from './components/Map';
import appReducer, { initialState } from './AppState/AppDispatcher';
import Controls from './components/Controls';
import { EMPTY_MAP_SOURCE } from './utils/constants';


const App = () => {

  // INITIALIZE APP STATE
  const [state, appDispatcher] = useReducer(appReducer, initialState);

  // MAP REFERENCE
  const map = useRef(null);

  ////////////////////////
  // FUNCTIONS ///////////
  ////////////////////////

  // HANDLE RESET ALL DATA (WHEN CLICKING CLOSE IN THE OPEN CONTROLS FOR EXAMPLE)
  const handleResetMapData = useCallback(() => {
    // EMPTY START SOURCE
      map.current.getSource('start').setData(EMPTY_MAP_SOURCE);
    // EMPTY END SOURCE
      map.current.getSource('end').setData(EMPTY_MAP_SOURCE);
      // EMPTY ROUTE SOURCE
      map.current.getSource('route').setData(EMPTY_MAP_SOURCE);
  }, []);

  // HANDLE RESET START/END POINT FROM OPEN CONTROLS BODY
  const handleResetStartEndMapData = useCallback((isStart) => {

    if(isStart) {
      map.current.getSource('start').setData(EMPTY_MAP_SOURCE);
      
    }

    // ALSO RESET END 
    map.current.getSource('end').setData(EMPTY_MAP_SOURCE);
    
    // IF ROUTE WAS CALCULATED, THEN MAKE IT NULL
    if(state.calculatedRoute) {
      map.current.getSource('route').setData(EMPTY_MAP_SOURCE);
    }

  }, [state.calculatedRoute]);

  // HANDLE SWITCH START AND END MAP DATA
  const handleSwitchMapData = useCallback(() => {

    let start = map.current.getSource('start');
    let end = map.current.getSource('end');
    console.log("Switch: ", start._data,end)
    start.setData(end._data);
    end.setData(start._data);

    // EMPTY ROUTE SOURCE
    map.current.getSource('route').setData(EMPTY_MAP_SOURCE);
  

  }, []);
  

  ////////////////////////
  // RENDER //////////////
  ////////////////////////

  return (
    <div className="App">

        {/* CONTROLS (ON TOP LEFT CORNER) */}
        <Controls 
          isChoosing={state.isChoosing}
          transportChosen={state.transportChosen}
          startCords={state.startCords}
          endCords={state.endCords}
          appDispatcher={appDispatcher}
          handleResetMapData={handleResetMapData}
          handleResetStartEndMapData={handleResetStartEndMapData}
          handleSwitchMapData={handleSwitchMapData}
          calculatedRoute={state.calculatedRoute}
          loading={state.loading}
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

          // MAP REFERENCE
          map={map}
        />

        {/* POP-UP AT BOTTOM */}

    </div>
  );
}

export default memo(App);
