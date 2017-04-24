var express = require('express');
var router = express.Router();
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.31.155.62:27017/happy';

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err);
      return;
    }else{
      var conn = db.collection('user');
      var email = req.body.email;
      var password = req.body.password;
      var data = {email:email,password:password};
      conn.find(data).toArray(function(err,results){
        if(err){
          console.log(err);
          return;
        }else{
          if(results.length > 0){
            console.log('login success');
            req.session.email = results[0].email;
            res.redirect('/');
          }else{
            //console.log('email or password is not exits,please try again')
             res.send('<script>alert("账号或密码错误，请重新登录");location.href="/login"</script>')

          }
          db.close();
        }
      });

    }
  })
  
})

router.post('/register',function(req,res,next){
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err);
      return;
    }else{
      var conn = db.collection('user');
      var name = req.body.name;
      var email = req.body.email;
      var password = req.body.password;
      conn.save({name:name,email:email,password:password},function(err,results){
        console.log(results);
      })
    }
  })
  res.send('<script>alert("注册成功，请登录");location.href="/login"</script>')
})

module.exports = router;