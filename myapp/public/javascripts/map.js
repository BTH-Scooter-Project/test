//CREATING MAP FUNCTION
function map(coords=[56.181932, 15.590525]) {
  var map = L.map('map',{ center: coords, zoom: 20});

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: `&copy; contributors`}).addTo(map);
  return map;
}

//GET COORDINATES FROM DEVICE
function getPosition() {
    return new Promise((res, rej) => {
    	navigator.geolocation.getCurrentPosition(res, rej)
    });
}

//THIS WILL GIVE ME THE USERS CURRENT COORDINATES
//COORDINATES WILL THEN BE USED TO ESTABLISH THE MAP
async function getLocation() {
    var crd = await getPosition();
    var map = L.map('map',{ center: [crd.coords.latitude, crd.coords.longitude], zoom: 20});

    console.log(`[${crd.coords.latitude}, ${crd.coords.longitude}]`);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: `&copy; contributors`}).addTo(map);
    return map;
}
