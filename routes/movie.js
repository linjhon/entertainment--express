var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient; // 引入mongodbClient客户端连接模块
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy'; // 设置连接字符串,后面代表所引用的集合;


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('movie', { title: "电影列表",email:req.session.email });
});

router.get('/moviedetail', function(req, res, next) {
    res.render('moviedetail', {});
});

module.exports = router;
