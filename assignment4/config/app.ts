import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';

import indexRouter from '../routes/index';
import usersRouter from '../routes/users';

import * as DBConfig from './db';
import mongoose from 'mongoose';
mongoose.connect(DBConfig.DBURI);
const db = mongoose.connection;

db.on("error", function () {
  console.error("Connection error");
});

db.once("open", function () {
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});
const app = express();

let p = path.join(__dirname, './node_modules');
console.log(p);
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../node_modules')))
app.use(express.static(path.join(__dirname, '../client/assets')))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;
