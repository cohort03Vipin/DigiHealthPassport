var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')


//var favicon= require('serve-favicon');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var travellersRouter = require('./routes/travellers');
var healthCareRouter=require('./routes/healthCare');
var airportAuthRouter=require('./routes/airportauthority');
const { Console } = require('console');

var app = express();
//#region "EJS View Engine"
// Ejs view engine setup
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
//#endregion "EJS"
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname,'public/images','favicon.ico')));
// create application/json parser
var jsonParser = bodyParser.json() 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/', indexRouter);
app.use('/traveller',travellersRouter);
app.use('/healthCare/',healthCareRouter);
app.use('/airportAuth', airportAuthRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



app.listen(4000,()=>{
  console.log('App is Listening...');
})