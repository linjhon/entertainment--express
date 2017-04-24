var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';
var async=require('async');

var request=require('request');
var querystring=require('querystring');


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



  

});

router.get('/moviedetail', function(req, res, next) {
   req.session.type="moviedetail"
  MongoClient.connect(DB_CONN_STR,function(err,db){ // 利用客户端连接模块进行connect连接操作
    var detailData={}
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
        detailData.results=results[0];        
        detailData.email= req.session.email;
        detailData.title='moviedetail';
         db.close();
       }
     });

<<<<<<< HEAD
        //查找电影评论信息;
     
      var bookdetaildata={
        id:req.body.id,
        type:req.session.type
      }
       var commentConn = db.collection('comment');
      commentConn.find(req.query).sort({_id:-1}).toArray(function(err,results){
       if(err){
         console.log(err)
         return;
       }else{
        
        //console.log(results)
        if(results.length>0){
          detailData.comment=results;
        }else{
          detailData.comment=false;
        }

         res.render('moviedetail',detailData);
         //console.log(detailData.comment);
         db.close();
       }
     });
=======
>>>>>>> 901b3d2b191936a13ca00a9e7901f4ab629604c5

    }
  })



  //console.log(req.query.id)
    //res.render('musicdetail', {id:req.query.id});
});

router.get('/search',function (req, res, next) {
	//console.log(req.query);
	request("https://movie.douban.com/j/subject_suggest?q="+req.query,function(error, response, body){
		var $body=JSON.parse(body)
    	console.log($body);
    	res.render('moviesearch',{body:$body, title: 'moviesearch',email:req.session.email});
    })
})


module.exports = router;