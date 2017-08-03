var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');




var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var book = require('./routes/book');
var movie = require('./routes/movie');
var music = require('./routes/music');
var comment = require('./routes/comment');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret:'recommend 128 bytes random string', 
  cookie:{maxAge:30*60*1000}, // 20分钟 ,毫秒为单位
  resave:false,  // 如果来了一个新的请求，不管原来存在不存在，重新存储一个
  saveUninitialized:true // 存储一些未初始化的session内容
}))

app.use(function(req, res, next){//只要在一定的时间内页面一直保持活动状态，session就不会过期。
  req.session._garbage = Date();
  req.session.touch();
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/book', book);
app.use('/music', music);
app.use('/movie', movie);
app.use('/comment',comment);
//app.use('/commentlist',commentlist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
