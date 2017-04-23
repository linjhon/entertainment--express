var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //title值，请勿修改，头部组件判断使用;
  res.render('book', {title:"book",email:req.session.email});
});

router.get('/bookdetail', function(req, res, next) {
  res.render('bookdetail', {});
});

module.exports = router;
