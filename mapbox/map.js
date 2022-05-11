mapboxgl.accessToken = 'pk.eyJ1IjoiYWFsaXlheXkiLCJhIjoiY2wwdGdrZWh2MDY3dzNqcGVkbmQxYTIweSJ9.K6lQwLGrkSurVnsVdqLnOw';
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/aaliyayy/cl1phbrmb006p14pnekazgj80', // ZZ location
center: [55.2708, 25.2048], // starting position
zoom: 12 // starting zoom
});


map.on('load', () => {

    map.addLayer({

      id: 'sound_heatmap',
      'type': 'heatmap',
      source: {
        type: 'geojson',
        data: int_geojson_file// replace this with the url of your own geojson
      },
     
      paint: {
        'heatmap-weight': [
          "interpolate",
          ["linear"],
          ["get", "sound_decibel"],
          43,
          0.1,
          49,
          0.2,
          55,
          0.3,
          62,
          0.4,
          68,
          0.5,
          74,
          0.6,
          78,
          0.7
        ],
        'heatmap-intensity': 3.6,  
        'heatmap-color': [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(0, 0, 255, 0)",
        0.1,
        "royalblue",
        0.3,
        "cyan",
        0.5,
        "lime",
        0.7,
        "yellow",
        1,
        "red"
      ],
        'heatmap-radius': [
          "interpolate",
          ["linear"],
          ["get", "sound_decibel"],
          43,
          10,
          49,
          20,
          55,
          30,
          62,
          40,
          68,
          50,
          74,
          70,
          78,
          80
        ],
        'heatmap-opacity': 1
  
  
  
      },
    //  filter: ['==', ['sound_decibel', ['get', 'Time']], 12],
    });
  //  'waterway-label'
  

  map.addLayer({
    id: 'sound_circles',
    type: 'circle',
    source: {
      type: 'geojson',
      data: geojson_file, // replace this with the url of your own geojson
    },
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'sound-decibel']],
        0,
        20,
        50,
        10
      ],
      'circle-color': 'white',
       /*[
        'interpolate',
        ['exponential', 1],
        ['number', ['get', 'Time']],
        0,
        '#ffffff',
        40,
        '#ffffff',
        50,
        '#A2719B',
        60,
        '#ffffff',
        70,
        '#ffffff',
       
      */
      'circle-opacity': 0.8
    },
   filter: ["==", ['number', ['get', 'Hour']],12],
  });


  document.getElementById('slider').addEventListener('input', (event) => {
  const hour = parseInt(event.target.value);
  console.log(event.target.value);
  // const filter = map.getFilter('Time');
  // update the map
   // map.setFilter('sound_heatmap', ['==', ['number', ['get', 'Time']], hour]);
   map.setFilter('sound_heatmap', ['==', ['number', ['get', 'hour']], hour]);
  
  // converting 0-23 hour to AMPM format
    const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById('active-hour').innerText = hour12 + ampm;
});
// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
  className: "circular-popup",
  closeButton: false,
  closeOnClick: false
  });
   
  map.on('mouseenter', 'sound_heatmap', (e) => {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';
   
  // Copy coordinates array.
  const coordinates = e.features[0].geometry.coordinates.slice();
  const sound_decibel = e.features[0].properties.sound_decibel;
  const video = `<video style="height:200px; margin:0" controls>
  <source src="/resources/sound1-video.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>`   
  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
   
  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates).setHTML(sound_decibel + "<br>"  + video ).addTo(map);
  });
   
  map.on('mouseleave', 'sound_heatmap', () => {
  map.getCanvas().style.cursor = '';
  popup.remove();
  });

});
