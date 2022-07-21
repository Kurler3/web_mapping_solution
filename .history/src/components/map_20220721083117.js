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

       handleMockResponseClick();

    }, [handleMockResponseClick, state.latitude, state.longitude, state.zoom]);

    return (
        <div className='mapWrap'>
            <div ref={mapContainer} className="map">

            </div>
        </div>
    );
});
