const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const api = require('./routes');
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open',()=>{
  console.log('Connected mongodb server!');
});

const app = express();
const port = 3000;

app.use(
  session({
    secret: 'jongchan1234',
    resave: false,
    saveUninitialized: true
  })
);

app.use('/', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true })); // html form태그 데이터 넘길때 이렇게 설정해줘야함
app.use('/api', api);

mongoose.connect('mongodb://192.168.56.1/test',(err)=>{
  if(err){
    console.log('mongoose connection error : ' + err);
    throw err;
  }
  app.listen(port, () => {
    console.log('Express server start on ',port);
  });
});