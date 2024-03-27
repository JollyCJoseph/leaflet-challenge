// Creating the map object
let myMap = L.map("map", {
    center: [10.09, 76.71],
    zoom: 2
  });
  
  // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// Store our API endpoint as queryUrl.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL/
// Get the data with d3.
d3.json(url).then(function(data) {
    
    // Create a new marker cluster group.
    
    console.log(data.features);
  
    // Loop through the data.
    for (let i = 0; i < 1000; i++) {
  
        // Add a new marker to the cluster group, and bind a popup.
        L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]],{
            // Define which property in the features to use.
          color:"black",
          fillColor: getColor(),
          fillOpacity: 0.75,
          radius:data.features[i].properties.mag*50000
        }).bindPopup("<h3>" + "Earth quake magnitude   :"+"\ " + data.features[i].properties.mag+
         "</h3>"+"place  :"+"\ " + data.features[i].properties.place+ "</h3>"+"<h3>"+"Depth  :"+"\ " + data.features[i].geometry.coordinates[2]+ "</h3>").addTo(myMap);
      
      function getColor(){
        if (data.features[i].geometry.coordinates[2] < 1) return "#e1ddea";
        else if( (data.features[i].geometry.coordinates[2]  >1) && (data.features[i].geometry.coordinates[2]  <10 ) )return "#a696c8";
        else if( (data.features[i].geometry.coordinates[2]  >10) && (data.features[i].geometry.coordinates[2]  <40 ) )return "#695299";
        else if( (data.features[i].geometry.coordinates[2]  >40) && (data.features[i].geometry.coordinates[2]  <100 ) )return "#281552";
        else return "#080117";
}};
     let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    let limits = ["-10-10", "10-30", "30-50", "50-70","70-90"];
     let colors = ["#e1ddea","#a696c8","#695299","#281552","#080117"];
     let labels = [];
  
   // limits.forEach(function(limit, index) {
    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\">"+ limits[index]+ "</li>");
      //labels.push("<li>" + limit + "</li>");
  });
  
    //labels.push("<li style=\"background-color: " + colors[index]  +"\">"+limits[index]+"</li>");
    //labels.push("<li style=\"background-color: " + colors[index] + "\">"  + "</li>");
   // labels.push("<li style=\"background-color: " + colors[index] + "\">"+ limits[index]+ "</li>");
   /// limits.forEach(function(limit, index) {
     /// labels.push("<li style=\"background-color: " + colors[index]+ "\">"+limit+ "</li>");
  //});
  //});

     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
     return div;
     };
     legend.addTo(myMap);
  

  })

   
   
  


