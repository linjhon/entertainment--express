var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('movie', {title:"电影列表"});
});

router.get('/movielist', function(req, res, next) {
  res.render('movielist', {});
});

module.exports = router;
