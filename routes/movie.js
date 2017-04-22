var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('movie', {title:"电影列表"});
});

router.get('/moviedetail', function(req, res, next) {
  res.render('moviedetail', {});
});

module.exports = router;
