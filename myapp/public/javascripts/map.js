
function map() {
  var map = L.map('map',{ center: [56.181932, 15.590525], zoom: 20});

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: `&copy; contributors`}).addTo(map);
}
