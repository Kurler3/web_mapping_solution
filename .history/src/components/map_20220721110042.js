import {memo, useCallback, useEffect, useRef, useState} from 'react';
import maplibregl from 'maplibre-gl';
import mockResponse from '../response.json';
import { CLICK_MAP_STEP, EMPTY_MAP_SOURCE } from '../utils/constants';

// ArcGIS ROUTE SERVICE
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import { solveRoute } from '@esri/arcgis-rest-routing';

// COMPONENT
export default memo(function Map() {

    // MAP CONTAINER REF
    const mapContainer = useRef(null);

    // MAP REP
    const map = useRef(null);

   
    // START CORDS, END CORDS AND ZOOM 
    const [state, setState] = useState({
        startCords: [mockResponse.waypoints[1].location[0], mockResponse.waypoints[1].location[1]],
        endCords: null,
        zoom: 13,
        currentStep: CLICK_MAP_STEP.start,
        loading: false,
    });

    // ADD CIRCLE LAYERS FUNCTION
    const addCircleLayers = () => {

        // SOURCE POINT GEO JSON DATA HOLDER
        map.current.addSource("start", {
          type: "geojson",
          data: EMPTY_MAP_SOURCE,
        });

        // DESTINATION POINT GEO JSON DATA HOLDER
        map.current.addSource("end", {
          type: "geojson",
          data: EMPTY_MAP_SOURCE,
        });

        // START CIRCLE VISUAL DATA REPRESENTATION OF COORDINATES IN MAP
        map.current.addLayer({
          id: "start-circle",
          type: "circle",
          source: "start",
          paint: {
            "circle-radius": 6,
            "circle-color": "white",
            "circle-stroke-color": "black",
            "circle-stroke-width": 2
          }
        });

        // END CIRCLE (WILL SWITCH TO ICON) DATA REPRESENTATION OF COORDINATES IN MAP
        map.current.addLayer({
          id: "end-circle",
          type: "circle",
          source: "end",
          paint: {
            "circle-radius": 7,
            "circle-color": "red"
          }
        });

      }

    // ADD ROUTE LAYERS FUNCTION (WILL BE THE LINE FROM SOURCE TO DESTINATION)
    const addRouteLayers = useCallback(() => {
      // ADD MAP ROUTE SOURCE (WILL ALSO BE GeoJSON data)
      map.current.addSource("route", {
        type: "geojson",
        data: EMPTY_MAP_SOURCE,
      });

      // ADDING VISUAL REPRESENTATION OF THE PATH (LINE/DOTS, DEPENDING ON THE TYPE OF TRANSPORTATION)
      map.current.addLayer({
        id: "route-line",
        type: "line", // NEEDS TO BE DYNAMIC LATER ON
        source: "route",
        paint: {
          // THIS ALSO NEEDS TO BE DYNAMIC LATER ON
          "line-color": "hsl(205, 100%, 50%)",
          "line-width": 4,
          "line-opacity": 0.6
        }
      });

    }, []);


    // UPDATE ROUTE FUNCTION 
    const updateRoute = useCallback(async () => {

      // SET LOADING

      // AUTH FOR ArcGIS REST API
      let auth = ApiKeyManager.fromKey('AAPK65f73d9f93544540bed1ec91bce6bfb23iSWU4RgwFb79XWl9vAWtF6_R5vjmPhCtMzlrwvxFoCF4MwnK3cJ0WYirUHLnuXB');

      try {

        // GET BEST PATH
        let response = await solveRoute({
          stops: [state.startCords, state.endCords],
          endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
          auth,
        });

        console.log("Response: ", response);

      } catch (error) {
        console.log("Error fetching best path: ", error);

        // SET ERROR IN STATE TO SHOW USER AND RESET ALL DATA
      }

    }, [state.endCords, state.startCords]);

    // ON CLICK MAP EVENT HANDLER
    const onClickMap = useCallback((e) => {

      // GET CORDINATES CLICKED [latitude, longitude] as number[]
      let coordinates = e.lngLat.toArray();

      const point = {
        type: "Point",
        coordinates
      };

      console.log("CurrentStep: ", state.currentStep);
      if (state.currentStep === CLICK_MAP_STEP.start) {
          
          // SET NEW COORDINATES TO MAP SOURCE WITH "start" ID.
          map.current.getSource("start").setData(point);
          
          // SET END AND ROUTE SOURCES BACK TO DEFAULT EMPTY MAP SOURCE OBJECT
          map.current.getSource("end").setData(EMPTY_MAP_SOURCE);
          map.current.getSource("route").setData(EMPTY_MAP_SOURCE);

          // SET NEW STATE (UPDATE START CORDINATES, SET END CORDINATES TO NULL AND UPDATE CLICK STEP)
          setState((prevState) => {
            return {
              ...prevState,
              startCords: coordinates,
              endCords: null,
              currentStep: CLICK_MAP_STEP.end,
            };
          });

        } else {
          // SET MAP END SOURCE TO NEW POINT
          map.current.getSource("end").setData(point);

          // SET NEW STATE (UPDATE END CORDINATES AND SET CURRENT STEP TO START)
          setState((prevState) => {
            return {
              ...prevState,
              endCords: coordinates,
              currentStep: CLICK_MAP_STEP.start,
            }
          });
        }
    }, [state.currentStep]);
  
    // INITIALIZE THE MAP
    useEffect(() => {

        // IF MAP EXISTS, THEN JUST RETURN
        if(map.current) return;

        // ELSE INITIALIZE MAP
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=ujWcTLhowBbZJMS266dY#0.7/22.80535/2.86559',
            center: state.startCords,
            zoom: state.zoom,
        });

       
        // WAIT FOR LOAD OF MAP TO BE DONE, THEN ADD LAYERS
        map.current.on("load", () => {
          // ADD SOURCE AND DESTINATION POINT REPRESENTATION 
          addCircleLayers();
          // ADD ROUTE LINE REPRESENTATION
          addRouteLayers();
        });

        // LISTEN TO ON CLICK EVENT
        map.current.on("click", onClickMap);

          
    }, [addRouteLayers, onClickMap, state.latitude, state.longitude, state.startCords, state.zoom]);

    return (
        <div className='mapWrap'>
            <div ref={mapContainer} className="map">

            </div>
        </div>
    );
});
