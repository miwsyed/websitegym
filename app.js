const mongo = require('mongodb')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var express = require('express');


var app = express();
const EmployeeRoute = require('./routes/employee')
mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser:true , useUnifiedTopology :true})
mongoose.connection.on('error',(err) => {
  console.log(err)
})



mongoose.connection.on('open',() =>{
  console.log('Database Connection Established!')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const AuthRoute = require('./routes/auth')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.use('/api',AuthRoute)  
app.use('/api',EmployeeRoute)  




module.exports = app;
