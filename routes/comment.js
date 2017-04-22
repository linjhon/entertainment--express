var express = require('express');
var router = express.Router();
var MongoClient= require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';

router.get('/', function(req, res, next) {  // controller
   res.render('comment',{title:'Comment'})
});


router.post('/submit',function(req,res,next){
    var email = req.session.email;
    if(email){
        var title = req.body.title;
        var content = req.body.content;


        var insertData = function(db,callback){
            var conn = db.collection('comment');
            var data = {title:title,content:content};
            conn.insert(data,function(err,results){
                if(err) return;
                callback(results);
            })
        }


        MongoClient.connect(DB_CONN_STR,function(err,db){
            if(err){
                return;
            }else{
                insertData(db,function(results){
                    res.redirect('/');
                    db.close();
                })
            }
        })

    } else {
        res.send('<script>alert("用户登录过期，请重新登录");location.href="/login"</script>')
    }
})


router.get('/list',function(req,res){
    var email = req.session.email;

    //if(email){
        var pageNo = req.query.pageNo,
        pageNo = pageNo?pageNo:1,
        pageSize = 5,
        count = 0,
        totalPages = 0;



         var findData = function(db,callback){
            var conn = db.collection('comment');
            
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
                     conn.find({}).sort({_id:-1}).skip( (pageNo-1)*pageSize  ).limit(pageSize).toArray(function(err,results){
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


        MongoClient.connect(DB_CONN_STR,function(err,db){
            if(err){
                return;
            }else{
                findData(db,function(results){


                    //console.log(pageNo,totalPages,count)
                    res.render('list',{
                        pageNo:pageNo,
                        totalPages:totalPages,
                        list:results,
                        count:count
                    })
                    db.close();
                })
            }
        })
       


    //}
})


module.exports = router;