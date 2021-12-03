var express = require('express');
var router = express.Router();
const bike = require("../public/models/bike.js");
//var session = require('express-session');
var token = null;
var email = null;
var password = null;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(token != null) {
        res.render('index', {
            title: "TEST",
            bId: "Wrong",
            bCrd: "way",
            usr: email
        });
    } else {
      res.redirect('/contact');
    }
});
//RENDER LOGIN
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});
//LOGIN FORM
router.post('/contact', function(req, res) {
  email = req.body.email;
  password = req.body.password;
  console.log("test");
  if(email=="Test@home.se" && password=="test") {
    token = "aBcD1234";
    res.redirect('/features');
  } else {
    res.redirect('/');
  }
  //res.send( `Email: ${email} Password: ${password}`);
});
//BIKE RENTAL PAGE
router.get('/features', function(req, res, next) {
  if(token != null) {
      res.render('features', {
        title: 'Express',
        bikeId: 'Click Bike',
        bikeCoords: '',
        bikeBattery: 'Test_Battery',
        travelCost: 'Test_Cost'
      });
  } else {
      res.redirect('/contact');
  }
});
//BIKE RENT INFORMATION
router.post('/features', function(req, res) {
  if(token != null) {
    //console.log(req.body.bikeCoords);
    res.render('index', {
      title: req.body.bikeId,
      bId: req.body.bikeId,
      bCrd: req.body.bikeCoords,
      usr: email
    });
  } else {
    console.log("Error");
    res.redirect('/contact');
  }
});

router.get('/:id', (req, res) => bike.getSpecificBike(res, req));

module.exports = router;
