import {memo, useCallback, useEffect, useRef} from 'react';
import maplibregl from 'maplibre-gl';
import mockResponse from '../response.json';
import { APP_ACTION_TYPES, CLICK_MAP_STEP, EMPTY_MAP_SOURCE, TRANSPORT_METHODS } from '../utils/constants';

// IMPORT SUBWAY IMAGE
import subwayIcon from '../img/subway.png';


// COMPONENT
const Map = ({
  // IS CHOOSING
  isChoosing,
  // LOADING
  loading,
  // START CORDS
  startCords,
  // END CORDS
  endCords,
  // ZOOM
  zoom,
  // CURRENT STEP
  currentStep,
  // APP DISPATCHER,
  appDispatcher,
  // MAP REFERENCE
  map,
  // CALCULATED ROUTE
  calculatedRoute,
}) => {

    // MAP CONTAINER REF
    const mapContainer = useRef(null);

    // ADD CIRCLE LAYERS FUNCTION
    const addCircleLayers = useCallback(() => {

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
        // LISTENS DIRECTLY TO CHANGES IN END SOURCE
        map.current.addLayer(
          {
            id: "start-circle",
            type: "circle",
            source: "start",
            layout: {
              visibility: 'visible',
            },
            paint: {
              "circle-radius": 6,
              "circle-color": "white",
              "circle-stroke-color": "black",
              "circle-stroke-width": 2
            },
          }
        );

        // END CIRCLE (WILL SWITCH TO ICON) DATA REPRESENTATION OF COORDINATES IN MAP
        // LISTENS DIRECTLY TO CHANGES IN END SOURCE

        // LOAD SUBWAY AND PLACE ICONS

        // LOAD PLACE MARKER
        map.current.loadImage(
              'https://cdn2.iconfinder.com/data/icons/pin-1/100/.svg-2-512.png',
              (error, image) => {
                
                // IF ERROR
                if(error) throw error;

                // ELSE ADD IMAGE AND ADD LAYER

                map.current.addImage('place-marker', image);
                
                map.current.addLayer(
                  {
                    id: "end-layer",
                    type: "symbol",
                    source: "end",
                    layout: {
                      'icon-image': 'place-marker', // reference the image
                      'icon-size': 0.09
                    }
                  }
                );


              }
        );

        // LOAD SUBWAY
        map.current.loadImage(subwayIcon, (error, image) => {
          if(error) throw error;
          map.current.addImage('subway-marker', image);
        })

      
      }, [map]);

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
        // DEFAULT TRANSPORT WAY IS CAR
        paint: TRANSPORT_METHODS.Car.routeLinePaint,
      });

    }, [map]);


    // ON CLICK MAP EVENT HANDLER
    const onClickMap = useCallback((e) => {

      // GET CORDINATES CLICKED [latitude, longitude] as number[]
      let coordinates = e.lngLat.toArray();

      let point = {
        type: "Point",
        coordinates,
      };

      let dispatchObject;

      if (
         //map.current.getSource('start')._data===EMPTY_MAP_SOURCE && 
         currentStep === CLICK_MAP_STEP.start && !startCords
        ) {
          
          // SET NEW COORDINATES TO MAP SOURCE WITH "start" ID.
          map.current.getSource("start").setData(point);
          
          // SET END AND ROUTE SOURCES BACK TO DEFAULT EMPTY MAP SOURCE OBJECT
          // map.current.getSource("end").setData(EMPTY_MAP_SOURCE);
          map.current.getSource("route").setData(EMPTY_MAP_SOURCE);
          map.current.getSource("end").setData(EMPTY_MAP_SOURCE);
          
          // UPDATE APP STATE
          // UPDATE START CORDS, SET END CORDS TO NULL AND UPDATE CLICK STEP
        
          dispatchObject = {
              startCords: coordinates,
              endCords: null,
              currentStep: CLICK_MAP_STEP.end,
              isChoosing: true,
              calculatedRoute: null,
          };
          
      } else {
          // SET MAP END SOURCE TO NEW POINT
          map.current.getSource("end").setData(point);

          // IF ALREADY CALCULATED A ROUTE, THEN MAKE IT NULL
          if(calculatedRoute) {
            map.current.getSource("route").setData(EMPTY_MAP_SOURCE);
          }

          // UPDATE APP STATE
          // SET NEW END CORDS AND SET CURRENT STEP BACK TO START
          
            dispatchObject = {
              endCords: coordinates,
              currentStep: CLICK_MAP_STEP.start,
              isChoosing: true,
              calculatedRoute: null,
            };

        }

        if(dispatchObject) {
          appDispatcher({
            type: APP_ACTION_TYPES.setMultiple,
            object: dispatchObject,
          });
        }
       
        // // IF BOTH START AND END COORDINATES ARE FILLED, THEN SEARCH BEST PATH 
        // if(currentStep===CLICK_MAP_STEP.end && coordinates) {          
        //   updateRoute(startCords, coordinates);
        // }

    }, [appDispatcher, calculatedRoute, currentStep, map, startCords]);
    
    // INITIALIZE THE MAP
    useEffect(() => {

        // IF MAP EXISTS, THEN JUST RETURN
        if(!map.current) {
           // ELSE INITIALIZE MAP
          map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=ujWcTLhowBbZJMS266dY#0.7/22.80535/2.86559',
            center: [mockResponse.waypoints[1].location[0], mockResponse.waypoints[1].location[1]],
            zoom: zoom,
          });

          // WAIT FOR LOAD OF MAP TO BE DONE, THEN ADD LAYERS
          map.current.on("load", () => {
            // ADD SOURCE AND DESTINATION POINT REPRESENTATION 
            addCircleLayers();
            // ADD ROUTE LINE REPRESENTATION
            addRouteLayers();
          });
        }

        // LISTEN TO ON CLICK EVENT
        map.current.on("click", onClickMap);

        return () => {
          if(map.current) {
            map.current.off("click", onClickMap);
          }
        }

    }, [addCircleLayers, addRouteLayers, map, onClickMap, zoom]);

    
    return (
        <div className='mapWrap'>
            <div ref={mapContainer} className="map"></div>
        </div>
    );
};

export default memo(Map);
