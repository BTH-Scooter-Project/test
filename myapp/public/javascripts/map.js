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
    addYou([crd.latitude, crd.longitude]);
}

function addYou(pos){
    //orangeIcon(pos);
    L.marker(pos).addTo(map)
      .bindPopup('Your position.');
/*
    var circle = L.circle(pos, {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: 20
    }).addTo(map);
*/
    //addTempBikes();
    //console.log(document.getElementById("map"));
}

function crtMap(dataPack=null) {
    crtmap();
    navigator.geolocation.getCurrentPosition(success);
    if(typeof dataPack === 'object' && dataPack !== null) {
        addBikes(dataPack);
    }
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
    //var image = "scooter.jpg";
    var qr = "<img class=qr src=/images/qr-code.svg>";

    data = ranBike();
    data.forEach(function(item){
        var id = item[0];
        var latLng = L.latLng(item[1], item[2]);
        bikes[id] = new L.marker(latLng, {id: id, coords:latLng}).addTo(map)
          .on('click', onClick)
          .bindPopup(`Test Bike ${id}. ${qr}`);
    });

    console.log(bikes['1']);
}

function addBikes(dataPack) {
    var bikes = {};
    var id = 0;

    dataPack.data.forEach(function(item){
        if(item.status === 'vacant'){
            var latLng = L.latLng(item.gps_lat, item.gps_lon);
            var image = `<img class=qr src=/images/${item.image}>`;

            bikes[id] = new L.marker(latLng, {name: item.name,
               description: item.description,
               battery_level: item.battery_level,
               coords: latLng }).addTo(map)
              .on('click', bikeClick)
              .bindPopup(`Bike ${id} ${image}`)
            id+=1;
        }
        //console.log(item);
    })
}

var activeClicked = null;

function bikeClick(e) {
    //console.log(this.options);
    var temp = this.options.coords.toString();

    document.getElementsByClassName('bike_Id')[0].innerHTML = this.options.name;
    document.getElementsByClassName('bikeId')[0].value = this.options.name;
    document.getElementsByClassName('bike_Desc')[0].innerHTML = this.options.description;
    document.getElementsByClassName('bikeDesc')[0].value = this.options.description;
    document.getElementsByClassName('bike_Battery')[0].innerHTML = this.options.battery_level+"/7500";
    document.getElementsByClassName('bikeBattery')[0].value = this.options.battery_level;
    document.getElementsByClassName('bikeCoords')[0].value = temp.slice(7, -1);
    document.getElementById('rentBtn').hidden=false;
}

function onClick(e) {
    console.log(this.options);
    activeClicked = this.options.id;
    document.getElementsByClassName('bike_Id')[0].innerHTML = this.options.id;
    document.getElementsByClassName('bikeId')[0].value = this.options.id;
    var temp = this.options.coords.toString();
    document.getElementsByClassName('bike_Coords')[0].innerHTML = temp.slice(7, -1);
    document.getElementsByClassName('bikeCoords')[0].value = temp.slice(7, -1);
    //document.getElementById('bike_Img').innerHTML = "<img src=images/"+this.options.img+">";
    document.getElementById('rentBtn').hidden=false;
    //document.getElementById('bike_Img').innerHTML = "<img class=orange src=images/"+this.options.img+">";
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

function ranBike() {
    var lat = 56.16156;
    var lng = 15.58661;
    var arr = [];

    for (var i = 0; i < 200; i++) {
        arr.push([i, (lat+Math.random() * (0.019 - 0.001)).toFixed(4), (lng+Math.random() * (0.039 - 0.001)).toFixed(4)]);
    }
    return arr;
}
