import {memo, useEffect} from 'react';
import './App.css';
import L from 'leaflet';


function App() {


  // USE useEffect TO INITIALIZE THE MAP
  useEffect(() => {

    // GET MAP DIV AND SET THE INITIAL VIEW TO LONDON
    // let map = L.map('map')

    let mapContainer = L.DomUtil.get('map');
    let map = L.map('map');

    // IF DOESNT EXISTS
    if(!mapContainer) {
      map.remove();
      map.setView([51.505, -0.09], 13);
      // ADD TILE LAYER (WHERE TO GET THE IMAGE FROM AND OTHER OPTIONS)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
        attribution: '© OpenStreetMap'
      }).addTo(map);

    }
      
    // NEED TO USE THIS BECAUSE MAP WAS ONLY RENDERING A PART OF THE IT'S HEIGHT EACH TIME IT RELOADED
    //Using setInterval can help the reloading or refreshing of the map itself.
    setInterval(function() {
      map.invalidateSize();
    }, 1);

  }, []);

  return (
    <div className="App">

        {/* CONTROLS (ON TOP LEFT CORNER) */}

        {/* MAP */}
        <div id="map"></div>
    </div>
  );
}

export default App;
