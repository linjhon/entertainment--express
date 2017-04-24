var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient; // 引入mongodbClient客户端连接模块
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy'; // 设置连接字符串,后面代表所引用的集合;
/* GET users listing. */
router.get('/', function(req, res, next) {
  //title值，请勿修改，头部组件判断使用;
  res.render('book', {title:"book",email:req.session.email});
});

router.get('/bookdetail', function(req, res, next) {
  res.render('bookdetail', {});
});

module.exports = router;
