var express = require('express');
var router = express.Router();
var request = require('request');

var apiAdr = "http://localhost:1337";
var apiKey = "90301a26-894c-49eb-826d-ae0c2b22a405";
var token = null;
var email = null;
var password = null;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.post('/', function(req, res) {
  email = req.body.email;
  password = req.body.password;
  console.log("test");
  if(email=="Test@home.se" && password=="test") {
    token = "aBcD1234";
    res.redirect('/map');
  } else {
    res.redirect('/');
  }
});

//BIKE RENTAL PAGE
router.get('/map', function(req, res, next) {
  if(token != null) {
      request(`${apiAdr}/v1/city/2/bike?apiKey=${apiKey}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var data = JSON.parse(body);
          //console.log(data);
          res.render('map', {
            title: 'test',
            bikeId: 'Click Bike',
            bikeCoords: '',
            bikeBattery: '',
            travelCost: 'Test_Cost',
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

//BIKE RENT INFORMATION
router.post('/map', function(req, res) {
  if(token != null) {
    //console.log(req.body.bikeCoords);
    res.render('rental', {
      title: req.body.bikeId,
      bId: req.body.bikeId,
      bCrd: req.body.bikeCoords,
      usr: email
    });
  } else {
    console.log("Error");
    res.redirect('/');
  }
});

module.exports = router;
