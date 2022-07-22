import './App.css';
import {memo, useCallback, useReducer, useRef} from 'react';

// IMPORT MAP
import Map from './components/Map';
import appReducer, { initialState } from './AppState/AppDispatcher';
import Controls from './components/Controls';
import { APP_ACTION_TYPES, EMPTY_MAP_SOURCE, TRANSPORT_METHODS } from './utils/constants';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { solveRoute } from '@esri/arcgis-rest-routing';
import mockResponse from './response.json';



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

    // let start = map.current.getSource('start');
    // let end = map.current.getSource('end');

    // start.setData(end._data);
    // end.setData(start._data);

  
    // SET START DATA
    map.current.getSource('start').setData({
      type: 'Point',
      coordinates: state.endCords,
    });

    // SET END DATA
    map.current.getSource('end').setData({
      type: 'Point',
      coordinates: state.startCords,
    });

    // EMPTY ROUTE SOURCE
    map.current.getSource('route').setData(EMPTY_MAP_SOURCE);
  

  }, [state.endCords, state.startCords]);


   // UPDATE ROUTE FUNCTION 
   const updateRoute = useCallback(async () => {

    // SET LOADING
    appDispatcher({
      type: APP_ACTION_TYPES.setKey,
      key: 'loading',
      value: true,
    });

    // AUTH FOR ArcGIS REST API
    let auth = ApiKeyManager.fromKey('AAPK65f73d9f93544540bed1ec91bce6bfb23iSWU4RgwFb79XWl9vAWtF6_R5vjmPhCtMzlrwvxFoCF4MwnK3cJ0WYirUHLnuXB');
    
    try {


      // GET BEST PATH
      let response = await solveRoute({
        stops: [state.startCords, state.endCords],
        endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
        authentication: auth,
      });

   
      console.log("Resolve: ", response.routes);

      // SET ROUTE SOURCE
      map.current.getSource("route").setData(response.routes.geoJson);

      // UPDATE APP STATE
      appDispatcher({
        type: APP_ACTION_TYPES.setMultiple,
        object: {
          loading: false,
          calculatedRoute: response,
        }
      });

    } catch (error) {
      console.log("Error fetching best path: ", error);
      // SET ERROR IN STATE TO SHOW USER AND RESET ALL DATA
    }

  }, [state.endCords, state.startCords]);
  

  // HANDLE SWITCH WAY OF TRANSPORT
  const handleChangeTransport = useCallback((transportId) => {

    // GET OBJECT OF THE TRANSPORT FROM CONSTANTS
    let transportObject = Object.values(TRANSPORT_METHODS).find((transportMethod) => transportMethod.id === transportId);


    // MAKE ROUTE SOURCE EMPTY
    map.current.getSource('route').setData(EMPTY_MAP_SOURCE);

    // REMOVE ROUTE LAYER COMPLETLY BECAUSE CAN'T UPDATE ENTIRE PAINT PROPERTY ON IT

    // REMOVE
    map.current.removeLayer("route-line");

    // CHECK IF CURRENT TRASNPORT IS FOOT
    if(state.transportChosen === "foot") {
      map.current.removeLayer('route-dots');
    }

    // IF NEW TRANSPORT IS FOOT ADD ROUTE DOTS LAYER
    if(transportObject.id === "foot") {
      // ADD CIRCLES
      map.current.addLayer({
        id: 'route-dots',
        type: 'circle',
        source: 'route',
        paint: {
          'circle-color': '#5190f5',
          'circle-radius': 4,
        },
      });
    }

    // CREATE NEW ONE
    map.current.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      paint: transportObject.routeLinePaint,
    });


    // HANDLE END MARKER
    if(transportObject.id === "subway") {
      // CHANGE TO SUBWAY MARKER
      map.current.setLayoutProperty('end-layer', 'icon-image', 'subway-marker');
      // SET OTHER SIZE
      map.current.setLayoutProperty('end-layer', 'icon-size', 1.3);

      map.current.setPaintProperty('end-layer', 'icon-color', 'red');
    }
    // ELSE IF WAS SUBWAY PREVIOUS, CHANGE BACK TO PLACE-MARKER
    else if(state.transportChosen === "subway") {
      map.current.setLayoutProperty('end-layer', 'icon-image', 'place-marker');
      map.current.setLayoutProperty('end-layer', 'icon-size', 0.09);
    }


  }, [state.transportChosen]);

  // HANDLE CLICK IN MOCK ROUTING BTN
  const handleClickMockRoutingBtn = useCallback(async () => {

    try {
        
        // GET START CORDS AND END CORDS
        let startCords = mockResponse.waypoints[0].location;
        let endCords = mockResponse.waypoints[1].location;

          // OPEN CONTROLS CONTAINER AND SET LOADING AND START + END CORDS
        appDispatcher({
          type: APP_ACTION_TYPES.setMultiple,
          object: {
            loading: true,
            isChoosing: true,
            startCords: startCords,
            endCords: endCords,
          }
        });

        // INIT SOURCE DATA
        let startData = {
          type: 'Point',
          coordinates: mockResponse.waypoints[0].location,
        };

        let endData = {
          type: 'Point',
          coordinates: mockResponse.waypoints[1].location,
        };


        // SET START AND END MAP DATA
        map.current.getSource('start').setData(startData);
        map.current.getSource('end').setData(endData);


        // AUTH FOR ArcGIS REST API
        let auth = ApiKeyManager.fromKey('AAPK65f73d9f93544540bed1ec91bce6bfb23iSWU4RgwFb79XWl9vAWtF6_R5vjmPhCtMzlrwvxFoCF4MwnK3cJ0WYirUHLnuXB');

        // FETCH RESPONSE
        let response = await solveRoute({
          stops: [startCords, endCords],
          endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
          authentication: auth,
        });

         // SET ROUTE SOURCE
        map.current.getSource("route").setData(response.routes.geoJson);

        // UPDATE APP STATE
        appDispatcher({
          type: APP_ACTION_TYPES.setMultiple,
          object: {
            loading: false,
            calculatedRoute: response,
          }
        });

    } catch (error) {
        console.log("Error while mocking response: ", error);
        appDispatcher({
          type: APP_ACTION_TYPES.setMultiple,
          object: {
            isChoosing: false,
            loading: false,
            startCords: null,
            endCords: null,
          }
        });
    }

   



  }, []);

  ////////////////////////
  // RENDER //////////////
  ////////////////////////

  return (
    <div className="App">

        {/* USE MOCK ROUTING RESPONSE FILE BTN */}
        <button className='mockRoutingBtn' onClick={handleClickMockRoutingBtn}>
            Mock Routing Response
        </button>


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
          updateRoute={updateRoute}
          handleChangeTransport={handleChangeTransport}
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

          // CALCULATED ROUTE
          calculatedRoute={state.calculatedRoute}
        />

    </div>
  );
}

export default memo(App);
