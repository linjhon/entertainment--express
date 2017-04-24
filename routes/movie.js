var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';
var async=require('async');

//跨域
/*var http = require("http");
var cheerio = require("cheerio");
var fs =require('fs');*/

/* GET home page. */
router.get('/', function(req, res, next) {
  var title=req.session.title;
  var pageNo = req.query.pageNo,
        pageNo = pageNo?pageNo:1,
        pageSize = 12,
        count = 0,
        totalPages = 0;
         var findData = function(db,callback){
            var conn = db.collection('movie');
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
      var conn = db.collection('movie');
      conn.find().toArray(function(err,results){
       if(err){
         console.log(err)
         return;
       }else{
         findData(db,function(results){
            //console.log(pageNo,totalPages,count)
            res.render('movie',{
                title: 'movie',
                email:req.session.email,
                pageNo:pageNo,
                totalPages:totalPages,
                list:results,
                count:count
            })
            db.close();
        })
         //res.render('movie',{ title: 'movie',list:results,email:req.session.email });
       }
     });
    }
  })
  //title值，请勿修改，头部组件判断使用;
  



  

// Utility function that downloads a URL and invokes
// callback with the data.
/*function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}



    var url = "https://movie.douban.com/j/subject_suggest?q=速度";
    download(url, function(data) {
    	console.log(data);
      if (data) {
          //console.log(data);
          var $ = cheerio.load(data);
          var total =$(".fred").text();
          fs.appendFile('./number.txt',total,'utf-8',function(err){
              if(err) {throw err;}
          });
          var numArrs=$("div[class='d d-num']").text();
          numArrs =numArrs.replace(/,/g,'');//把所有的逗号变为空(数字中间的逗号)
          numArrs =numArrs.replace(/\s+/g, ',');//把所有的空字符串变为一个逗号(数字与数字之间变为逗号)
          numArrs =numArrs.replace(/,$/gi, '');//去除最后一个逗号
          fs.appendFile('./number.txt',numArrs,'utf-8',function(err){            
              if(err) {throw err;}
          });
          console.log("done");
        }
        else console.log("error");  
    });*/





});

router.get('/moviedetail', function(req, res, next) {
  MongoClient.connect(DB_CONN_STR,function(err,db){ // 利用客户端连接模块进行connect连接操作
    if(err){
      console.log(err);
      return;
    }else{ // 如果连接成功，则执行下面代码 
    
      var conn = db.collection('movie');
      console.log(req.query)
      conn.find(req.query).toArray(function(err,results){
       if(err){
         console.log(err)
         return;
       }else{
        
        //console.log(results)
         res.render('moviedetail', {results:results[0],
                  title: 'moviedetail',
                email:req.session.email,});
         db.close();
       }
     });

        
    }
  })  

  //console.log(req.query.id)
    //res.render('musicdetail', {id:req.query.id});
});

module.exports = router;