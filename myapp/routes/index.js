var express = require('express');
var router = express.Router();

var token = null;
var email = null;
var password = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
      res.render('map', {
        title: 'Express',
        bikeId: 'Click Bike',
        bikeCoords: '',
        bikeBattery: 'Test_Battery',
        travelCost: 'Test_Cost'
      });
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
