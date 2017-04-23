var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('book', {title:"书籍",email:req.session.email});
});

router.get('/bookdetail', function(req, res, next) {
  res.render('bookdetail', {});
});

module.exports = router;
