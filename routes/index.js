var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';

/* GET home page. */
router.get('/', function (req, res, next) {

  MongoClient.connect(DB_CONN_STR, function (err, db) { // 利用客户端连接模块进行connect连接操作
    if (err) {
      res.render('index', {
        title: 'index',
        email: req.session.email
      });
      console.log(err);
      return;
    } else { // 如果连接成功，则执行下面代码 
      
      var resultsList = {}     
      function findData(item,fn){
        db.collection(item).find().skip(3).limit(6).toArray(function (err, results) {
          console.log(item)
          if (err) {
            console.log(err)
            return;
          } else {            
            resultsList[item]=results;
            fn(resultsList)
            db.close();
          }
        })
      }

      findData('music',function(){
      })
      findData('movie',function(){  
      })
      findData('book',function(){
        res.render('index', {
          title: 'index',
          email: req.session.email,
          resultsList: resultsList
        })
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

module.exports = router;