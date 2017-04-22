var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/music', function(req, res, next) {
  res.render('musiclist', { title: 'music' });
});
module.exports = router;