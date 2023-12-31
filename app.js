var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dollRouter = require('./routes/doll');
var legoRouter = require('./routes/lego');
const handlebars = require('handlebars');

var app = express();


//khai báo body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


//Khai báo mongoose
var mongoose = require("mongoose");
var uri = "mongodb+srv://dung26122003:dung12345@cluster0.wkae9zq.mongodb.net/toyweb";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connect to DB succeed !"))
.catch((err) => console.log(err));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lego', legoRouter);
app.use('/doll', dollRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
//khai báo port
app.listen(process.env.PORT || 3001);

module.exports = app;
