var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelizeInit = require('./config/sequelize/init');
const fmt = require('./util/dateFormatting');
const session = require('express-session');
const i18n = require('i18n');
var cors = require('cors');

const mechanicApiRouter = require('./routes/api/mechanicApiRoute');
const carApiRouter = require('./routes/api/carApiRoute');
const repairApiRouter = require('./routes/api/repairApiRoute');
const authApiRouter = require('./routes/api/AuthApiRoute');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

sequelizeInit()
  .catch(err => {
    console.log(err);
  });


i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  defaultLocale: 'pl',
  cookie: 'ryc-lang',
});

app.use((req, res, next) => {
  if (!res.locals.lang) {
    const currentLang = req.cookies['ryc-lang'];
    res.locals.lang = currentLang;
  }
  next();
});

app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if (!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});

app.use((req, res, next) => {
  res.locals.fmt = fmt;
  next();
});

app.use(i18n.init);

app.use('/api/cars', carApiRouter);
app.use('/api/mechanics', mechanicApiRouter);
app.use('/api/repairs', repairApiRouter);
app.use('/api/model', repairApiRouter);
app.use('/api/authorized-service', repairApiRouter);
app.use('/api/auth', authApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;