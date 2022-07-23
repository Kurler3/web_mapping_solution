import {memo, useCallback, useEffect, useRef, useState} from 'react';
import maplibregl from 'maplibre-gl';
import mockResponse from '../response.json';


// COMPONENT
export default memo(function Map() {

    // MAP CONTAINER REF
    const mapContainer = useRef(null);

    // MAP REP
    const map = useRef(null);

   
    // LONGITUDE, LATITUDE AND ZOOM
    const [state, setState] = useState({
        longitude: mockResponse.waypoints[1].location[1],
        latitude: mockResponse.waypoints[1].location[0],
        zoom: 13,
    });


    const addCircleLayers = () => {

        map.current.addSource("start", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        });
        map.current.addSource("end", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        });

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

        map.current.addLayer({
          id: "end-circle",
          type: "circle",
          source: "end",
          paint: {
            "circle-radius": 7,
            "circle-color": "black"
          }
        });

      }

    // USE MOCK RESPONSE 
    const handleMockResponseClick = useCallback(() => {

        // INITIAL CIRCLE


        // SET NEW MARKER
        let marker = new maplibregl.Marker({
            color: '#f54542',
            draggable: false,
        }).setLngLat([state.latitude, state.longitude])
        .addTo(map.current);
       
    }, [state.latitude, state.longitude]);


    // INITIALIZE THE MAP
    useEffect(() => {

        // IF MAP EXISTS, THEN JUST RETURN
        if(map.current) return;

        // ELSE INITIALIZE MAP
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=ujWcTLhowBbZJMS266dY#0.7/22.80535/2.86559',
            center: [state.latitude, state.longitude],
            zoom: state.zoom,
        });

       
        // ADD GEO JSON
        map.current.on("load", () => {
            addCircleLayers();
        });


        let currentStep = "start";
        let startCoords, endCoords;

        map.current.on("click", (e) => {

            const coordinates = e.lngLat.toArray();
            const point = {
              type: "Point",
              coordinates
            };
            
            if (currentStep === "start") {
                map.getSource("start").setData(point);
                startCoords = coordinates;
                const empty = {
                  type: "FeatureCollection",
                  features: []
                };
                map.getSource("end").setData(empty);
                map.getSource("route").setData(empty);
                endCoords = null;
                currentStep = "end";
              } else {
                map.getSource("end").setData(point);
                endCoords = coordinates;
                currentStep = "start";
              }

        });

          

    }, [handleMockResponseClick, state.latitude, state.longitude, state.zoom]);

    return (
        <div className='mapWrap'>
            <div ref={mapContainer} className="map">

            </div>
        </div>
    );
});
