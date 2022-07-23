import {memo, useEffect} from 'react';
import './App.css';
import { addMarker } from './leaflet/leaflet_functions';
import mockResponse from './response.json';


function App() {


  // useEffect(() => {

  //   // ADD INITIAL MARKER
  //   addMarker(mockResponse.waypoints[1].location[1], mockResponse.waypoints[1].location[0]);
  // }, []);

  return (
    <div className="App">

        {/* CONTROLS (ON TOP LEFT CORNER) */}

        
    </div>
  );
}

export default App;
