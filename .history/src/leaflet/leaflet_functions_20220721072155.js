import L from 'leaflet';

// ADD MARKER FUNCTION
export function addMarker(longitude, latitude) {

    let map = L.map('map');

    // REMOVE MAP
    map.off();
    map.remove();
    
    document.getElementById('map').innerHTML = "";

    // SET BOUNDS

    // SET VIEW TO DESTINATION
    map.flyTo([longitude, latitude], 13);

    // ADD MARKER IN DESTINATION
    let marker = L.marker([longitude, latitude]).addTo(map);

}