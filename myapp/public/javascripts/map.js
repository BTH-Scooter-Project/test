//CREATING MAP FUNCTION
function map(coords=[56.181932, 15.590525]) {
  var map = L.map('map',{ center: coords, zoom: 20});

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: `&copy; contributors`}).addTo(map);
  return map;
}
