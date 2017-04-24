var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.title='index';
  res.locals.email= req.session.email;
  MongoClient.connect(DB_CONN_STR, function (err, db) { // 利用客户端连接模块进行connect连接操作
    if (err) {
      console.log(err);
      return;
    } else { // 如果连接成功，则执行下面代码 
      
      var resultsList = {}     
      function findData(item,num,fn){
        db.collection(item).find().skip(num).limit(6).toArray(function (err, results) {
          if (err) {
            console.log(err)
            return;
          } else {            
            resultsList[item]=results;
            res.locals.resultsList=resultsList;
            fn(resultsList)
            db.close();
          }
        })
      }

      findData('music',0,function(){
      })
      findData('movie',3,function(){  
      })
      findData('book',3,function(){
        res.render('index');
        console.log(resultsList.movie[0].title)
      })
        
    }    
  })




});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: '登陆',
    email: req.session.email
  });
})

router.get('/register', function (req, res, next) {
  res.render('register', {
    title: '注册',
    email: req.session.email
  });
})

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/');
  })
})
router.get('/commentlist', function (req, res, next) {
  res.render('commentlist', {
    title: '评论列表',
    email: req.session.email
  })
})

module.exports = router;