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
    
      var conn = db.collection('movie');
      conn.find().toArray(function(err,results){
       if(err){
         console.log(err)
         return;
       }else{
        
        title=results[0].title;
        console.log(title)

         db.close();
       }
     });

        
    }
  })
  res.render('music',{ title: title,email:req.session.email });
});
module.exports = router;