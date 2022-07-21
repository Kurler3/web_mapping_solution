import {memo, useEffect, useRef, useState} from 'react';
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


    // INITIALIZE THE MAP
    useEffect(() => {

        // IF MAP EXISTS, THEN JUST RETURN
        if(map.current) return;

        // ELSE INITIALIZE MAP
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            // style: 'https://demotiles.maplibre.org/style.json',
            style: 'https://api.maptiler.com/maps/openstreetmap/?key=ujWcTLhowBbZJMS266dY#0.7/22.80535/2.86559',
            center: [state.longitude, state.latitude],
            zoom: state.zoom,
        });

    }, [state.latitude, state.longitude, state.zoom]);

    return (
        <div className='mapWrap'>
            <div ref={mapContainer} className="map">

            </div>
        </div>
    );
});
