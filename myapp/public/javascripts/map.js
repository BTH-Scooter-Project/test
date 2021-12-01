var map = null;
//CREATING MAP FUNCTION
function crtmap(coords=[56.181932, 15.590525]) {
  map = L.map('map').setView(coords, 20);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: `&copy; contributors`}).addTo(map);
}

//GET COORDINATES FROM DEVICE
function getPosition() {
    return new Promise((res, rej) => {
    	navigator.geolocation.watchPosition(res, rej)
    });
}

//THIS WILL GIVE ME THE USERS CURRENT COORDINATES
//COORDINATES WILL THEN BE USED TO ESTABLISH THE MAP
async function getLocation() {
    var temp = [56.181932, 15.590525];
    var crd = await getPosition();
    temp = [crd.coords.latitude, crd.coords.longitude];
    var map = L.map('map',{ center: temp, zoom: 20});

    console.log(`[${crd.coords.latitude}, ${crd.coords.longitude}]`);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: `&copy; contributors`}).addTo(map);
}

//NOW FLYING TO CURRENT POSITION. !!MIGHT CAUSE ISSUES!!
function success(pos){
    var crd = pos.coords;
    map.flyTo([crd.latitude, crd.longitude]);
}

function test() {
    navigator.geolocation.watchPosition(success);
    crtmap();
}
