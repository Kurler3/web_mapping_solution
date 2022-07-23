import L from 'leaflet';

// ADD MARKER FUNCTION
export function addMarker(longitude, latitude) {

    document.getElementById('map').innerHTML = "";

    let map = L.map('map');


    // SET BOUNDS

    // SET VIEW TO DESTINATION
    map.flyTo([longitude, latitude], 13);

    // ADD MARKER IN DESTINATION
    let marker = L.marker([longitude, latitude]).addTo(map);

}