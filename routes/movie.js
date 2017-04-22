var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient; // 引入mongodbClient客户端连接模块
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy'; // 设置连接字符串,后面代表所引用的集合;


/* GET users listing. */
router.get('/', function(req, res, next) {
	var selectData = function(db, callback) {
	  //连接到表
	  var collection = db.collection('happy');
	  //查询数据
	  var whereStr = {};
	  collection.find(whereStr).toArray(function(err, result) {
	    if(err)
	    {
	      console.log('Error:'+ err);
	      return;
	    }
	    callback(result);
	  });
	}

	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  console.log("连接成功！");
	  selectData(db, function(result) {
	    console.log(result);
	    db.close();
	  });
	});
    res.render('movie', { title: "电影列表" });
});

router.get('/moviedetail', function(req, res, next) {
    res.render('moviedetail', {});
});

module.exports = router;
