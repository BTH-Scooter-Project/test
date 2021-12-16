var express = require('express');
var router = express.Router();
var request = require('request');
var axios = require('axios');

var apiAdr = "http://localhost:1337";
var apiKey = "90301a26-894c-49eb-826d-ae0c2b22a405";
var token = null;
var email = null;


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
      console.log(response.data);
      res.redirect('/');
  })
  .catch(error => {
      console.log(error.response);
      res.redirect('/register');
  });
});

//LOGIN
router.post('/', async function(req, res) {
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
      console.log(response.data.data);
      res.redirect('/map');
  })
  .catch(error => {
      console.log(error.response);
      res.redirect('/');
  });
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
        console.log(response.data.data);
        res.render('rental', {
          title: req.body.bikeId,
          bId: req.body.bikeId,
          bCrd: req.body.bikeCoords,
          usr: email
        });
    })
    .catch(error => {
        console.log(error.response);
        res.redirect('/');
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

/*
router.get('/map', function(req, res) {
  if(token != null) {
    //console.log(req.body.bikeId);
    axios({
      method: 'delete',
      headers: {
          "x-access-token": token
      },
      url: `${apiAdr}/v1/travel/bike/7?apiKey=${apiKey}`
    })
    .then(response => {
        console.log(response.data);
        axios({
          method: 'get',
          url: `${apiAdr}/v1/travel/rented?apiKey=${apiKey}`
        })
        .then(response => {
            res.redirect('/');
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response);
        })
    })
    .catch(error => {
        console.log(error.response);
    });
  } else {
      res.redirect('/');
  }
});
*/

/*
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
*/
module.exports = router;
