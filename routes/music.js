var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';
var async=require('async');
var app = express();
var http =require('http');
var request=require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  var title=req.session.title;
  var pageNo = req.query.pageNo,
        pageNo = pageNo?pageNo:1,
        pageSize = 12,
        count = 0,
        totalPages = 0;
         var findData = function(db,callback){
            var conn = db.collection('music');
            
            // 其实要做2件事，一件是查询列表数据，一件统计总记录

            async.parallel([
                function(callback){
                    conn.find({}).toArray(function(err,results){
                        if(err){
                            return;
                        }else{
                            
                            totalPages = Math.ceil(results.length/pageSize);
                            count = results.length;
                            callback(null,'');
                        }
                    })
                },
                function(callback){
                     conn.find({}).skip( (pageNo-1)*pageSize  ).limit(pageSize).toArray(function(err,results){
                        if(err){
                            return;
                        }else{
                            callback(null,results);
                        }
                    })
                }
            ],function(err,results){
                callback(results[1]);
            })


        }
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
         findData(db,function(results){
            console.log(pageNo,totalPages,count)
            res.render('music',{
                title: 'music',
                email:req.session.email,
                pageNo:pageNo,
                totalPages:totalPages,
                list:results,
                count:count
            })
            db.close();
        })
         //res.render('music',{ title: 'music',list:results,email:req.session.email });
        
       }
     });

        
    }
  })  
  //title值，请勿修改，头部组件判断使用;
 
});
router.get('/musicdetail', function(req, res, next) {

  MongoClient.connect(DB_CONN_STR,function(err,db){ // 利用客户端连接模块进行connect连接操作
    if(err){
      console.log(err);
      return;
    }else{ // 如果连接成功，则执行下面代码
      // app.all('*', function(req, res, next) {
      //     res.header("Access-Control-Allow-Origin", "*");
      //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
      //     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      //     res.header("X-Powered-By",' 3.2.1')
      //     res.header("Content-Type", "application/json;charset=utf-8");
      //     next();
      // });
      // //?method=baidu.ting.song.lry&songid=877578
      //  app.get('http://tingapi.ting.baidu.com/v1/restserver/ting/?method=baidu.ting.song.lry&songid=877578', function(req, res) {
      //      res.send();
      //       console.log(req)
      //       console.log(res)
      //      console.log('success')
      //  });
      //  // app.listen(3000);

      var conn = db.collection('music');
      //通过id查找相关数据
      conn.find(req.query).toArray(function(err,results){
       if(err){
         console.log(err)
         return;
       }else{
        //console.log(results)
         res.render('musicdetail', {results:results[0],email: req.session.email,title:'details'});
        //console.log(results)
         db.close();
       }
     });
    }
  })  
  // res.render('musicdetail', {email: req.session.email,title:'details');
});
module.exports = router;