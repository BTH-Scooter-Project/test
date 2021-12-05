var map = null;
//CREATING MAP FUNCTION
function crtmap(coords=[56.181932, 15.590525]) {
  map = L.map('map').setView(coords, 18);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: `&copy; contributors`}).addTo(map);
}

//NOW FLYING TO CURRENT POSITION. !!MIGHT CAUSE ISSUES!!
function success(pos){
    var crd = pos.coords;
    map.flyTo([crd.latitude, crd.longitude]);
    addBike([crd.latitude, crd.longitude]);
}

function addBike(pos){
    //orangeIcon(pos);
    L.marker(pos).addTo(map)
      .bindPopup('Your position.');

    var circle = L.circle(pos, {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: 20
    }).addTo(map);

    addTempBikes();
    console.log(document.getElementById("map"));
}

function crtMap() {
    navigator.geolocation.getCurrentPosition(success);
    crtmap();
}

function customer(pos){
    map.flyTo([crd.latitude, crd.longitude]);
    L.marker([crd.latitude, crd.longitude]).addTo(map)
      .bindPopup('Your position.');

    var circle = L.circle([crd.latitude, crd.longitude], {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: 20
    }).addTo(map);
}

function crtMap2(lat, long) {
    //console.log(`[${lat}, ${long}]`);
    crtmap([lat, long]);
    L.marker([lat, long]).addTo(map)
      .bindPopup('Your position.');
}


function addTempBikes() {
    var bikes = {};
    var data = [
      ['1', 56.170863,15.583974],
      ['2', 56.171267,15.583796],
      ['3', 56.171258,15.582991],
      ['4', 56.170974,15.584279],
      ['5', 56.170971,15.584333]
    ];

    data.forEach(function(item){
        var id = item[0];
        var latLng = L.latLng(item[1], item[2]);
        bikes[id] = new L.marker(latLng, {id: id, coords:latLng}).addTo(map)
          .on('click', onClick)
          .bindPopup(`Test Bike ${id}.`);
    });

    console.log(bikes['1']);
}

var activeClicked = null;

function onClick(e) {
    console.log(this.options);
    activeClicked = this.options.id;
    document.getElementsByClassName('bike_Id')[0].innerHTML = this.options.id;
    document.getElementsByClassName('bikeId')[0].value = this.options.id;
    var temp = this.options.coords.toString();
    document.getElementsByClassName('bike_Coords')[0].innerHTML = temp.slice(7, -1);
    document.getElementsByClassName('bikeCoords')[0].value = temp.slice(7, -1);
    document.getElementById('rentBtn').hidden=false;
}

function orangeIcon(pos){
    var orangeIcon = L.icon({
        iconUrl: 'images/orangeIcon.png'
    });
    L.marker(pos, {icon: orangeIcon}).addTo(map)
      .bindPopup('Your position.');
}

function rent() {
    console.log("clicked", activeClicked);
}

var start

function timer() {
    start = Date.now();
}

function endRent() {
    var millis = Date.now() - start;
    console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
}
