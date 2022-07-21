import L from 'leaflet';

// ADD MARKER FUNCTION
export function addMarker(longitude, latitude) {

    let map = L.map('map');
    
    let marker = L.marker([longitude, latitude]).addTo(map);
    
}