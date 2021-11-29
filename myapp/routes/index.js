var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title:"Express"
    });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.post('/contact', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  console.log("test");
  if(email=="Test@home.se" && password=="test") {
    res.redirect('/features');
  } else {
    res.redirect('/');
  }
  //res.send( `Email: ${email} Password: ${password}`);
});

router.get('/features', function(req, res, next) {
  res.render('features', { title: 'Express'});
});

module.exports = router;
