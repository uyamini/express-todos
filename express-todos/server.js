var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();


/*-------------- Server Setup --------------*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev')); //doesn't necessarily need to be there for request-response functionality
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //allows you to use forms in ejs
app.use(cookieParser()); //allows you to handle cookies in ejs
app.use(express.static(path.join(__dirname, 'public'))); //allows you to use static files in ejs

app.use(methodOverride('_method')); //allows you to use PUT and DELETE methods in ejs

//add middleware below the above line of code
app.use(function(req, res, next) {
  console.log('Hello SEI!');
  // Add a time property to the res.locals object
  // The time property will then be accessible when rendering a view
  res.locals.time = new Date().toLocaleTimeString();
  next();  // Pass the request to the next middleware
});

/*-------------- Routes --------------*/

app.use('/', indexRouter);
app.use('/todos', todosRouter);



/*-------------- Error Handling Drip Pen --------------*/

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

module.exports = app;
