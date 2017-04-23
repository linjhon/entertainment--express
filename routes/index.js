var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index',email:req.session.email });
});

router.get('/login',function(req,res,next){
  res.render('login',{title:'登陆',email:req.session.email});
})

router.get('/register',function(req,res,next){
  res.render('register',{title:'注册',email:req.session.email});
})

router.get('/logout',function(req,res,next){
  req.session.destroy(function(err){
    res.redirect('/');
  })
})

module.exports = router;
