var express = require('express');
var router = express.Router();
var request = require('request');
var axios = require('axios');

var apiAdr = "http://localhost:1337";
var apiKey = "90301a26-894c-49eb-826d-ae0c2b22a405";
var token = null;
var email = null;
var city = null;

serverUp();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register'});
});

//REGISTER USER
router.post('/register', async function(req, res) {
  //console.log(req.body)
  axios({
    method: 'post',
    url: `${apiAdr}/v1/auth/customer?apiKey=${apiKey}`,
    data: {
      email: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      cityid: req.body.cityid
    }
  })
  .then(response => {
      //console.log(response.data);
      res.redirect('/');
  })
  .catch(error => {
      //console.log(error.response);
      if(error.response !== undefined) {
          res.render('register', {msg: error.response.data.errors.message});
      } else {
          res.render('register', {msg: "Server down!"});
      }
  });
});

//LOGIN
router.post('/', function(req, res) {
  //console.log(req.body.username);
  var temp = JSON.stringify({email: req.body.email})
  axios({
    method: 'post',
    url: `${apiAdr}/v1/auth/customer/login?apiKey=${apiKey}`,
    data: {
      email: req.body.username,
      password: req.body.password
    }
  })
  .then(response => {
      token = response.data.data.token;
      email = response.data.data.user;
      //console.log(response.data);
      res.redirect('/map');
  })
  .catch(error => {
      //console.log(error.response.data.errors.title);
      //console.log(error);
      if(error.response !== undefined) {
          res.render('index', {msg: error.response.data.errors.title});
      } else {
          res.render('index', {msg: "Server down!"});
      }
  });
});


//BIKE RENTAL PAGE
router.get('/map', function(req, res, next) {
  if(token != null) {
      request(`${apiAdr}/v1/city/2/bike?apiKey=${apiKey}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          //cities();
          res.render('map', {
            title: 'test',
            bikeId: 'Click Bike',
            bikeCoords: '',
            bikeBattery: '',
            dataPack: data
          });
        } else {
          console.log('Api not available');
          res.render('map');
        }
      })
  } else {
      res.redirect('/');
  }
});


//RENTAL CALL
router.post('/map', function(req, res) {
  if(token != null) {
    console.log(req.body.bikeId);
    axios({
      method: 'post',
      headers: {
          "x-access-token": token
      },
      url: `${apiAdr}/v1/travel/bike/${req.body.bikeId}?apiKey=${apiKey}`
    })
    .then(response => {
        //console.log(response.data.data);
        rentQueue();
        res.render('rental', {
          title: req.body.bikeId,
          bId: req.body.bikeId,
          bCrd: req.body.bikeCoords,
          usr: email
        });
    })
    .catch(error => {
        if(error.response !== undefined) {
            res.render('index', {msg: error.response.data.errors.title});
        } else {
            res.render('index', {msg: "Server down!"});
        }
    });
  }
});

//END RENTAL CALL
router.post('/rental', function(req, res) {
  if(token != null) {
    console.log(req.body);
    axios({
      method: 'delete',
      headers: {
          "x-access-token": token
      },
      url: `${apiAdr}/v1/travel/bike/${req.body.bikeId}?apiKey=${apiKey}`
    })
    .then(response => {
        console.log(response.data.data);
        res.redirect('/');
    })
    .catch(error => {
        console.log(error.response);
        res.redirect('/');
    });
  } else {
      res.redirect('/');
  }
});


function stations(cityid){
  request(`${apiAdr}/v1/city/${cityid}/station?apiKey=${apiKey}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log(data);
    } else {
      console.log('Api not available');
    }
  })
}


function cities(){
  request(`${apiAdr}/v1/city?apiKey=${apiKey}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      //getUserLocation();
      data.data.forEach(function(city) {
          console.log(city.name);
      })
    } else {
      console.log('Api not available');
    }
  })
}

function serverUp(){
  request(`${apiAdr}/v1/city?apiKey=${apiKey}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        apiAdr = "http://localhost:1337";
        console.log("Server is up");
      } else {
        apiAdr = "server:1337";
        console.log("Server down");
    }
  })
}

function userRequest(userId) {
  axios({
    method: 'get',
    headers: {
        "x-access-token": token
    },
    url: `${apiAdr}/v1/travel/rented?apiKey=${apiKey}`
  })
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.log(error.response);
  });
}

function rentQueue(){
  axios({
    method: 'get',
    headers: {
        "x-access-token": token
    },
    url: `${apiAdr}/v1/travel/rented?apiKey=${apiKey}`
  })
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.log(error.response);
  });
}

/*/v1/travel/rented*/


module.exports = router;
