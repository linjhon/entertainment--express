var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';

/* GET home page. */
router.get('/', function(req, res, next) {
  var title=req.session.title;
  MongoClient.connect(DB_CONN_STR,function(err,db){ // 利用客户端连接模块进行connect连接操作
    if(err){
      console.log(err);
      return;
    }else{ // 如果连接成功，则执行下面代码 
    
      var conn = db.collection('music');
      conn.find().toArray(function(err,results){
       if(err){
         console.log(err)
         return;
       }else{
         res.render('music',{ title: 'music',list:results,email:req.session.email });
         db.close();
       }
     });

        
    }
  })  
  //title值，请勿修改，头部组件判断使用;
 
});
module.exports = router;