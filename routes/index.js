var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hhhhhhh12233');
  res.render('index', { title: 'Digital Passport' });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/travellers', function(req, res, next) {  
  console.log('index Route');
  res.render('traveller');
});
module.exports = router;
