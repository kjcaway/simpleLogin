const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const api = require('./routes');
const mongoose = require('mongoose');
const ejs = require('ejs');

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

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.get('/', (req, res)=>{
  console.log('[GET]/...');

  res.render('index', {
    session: req.session
  });
});

app.use('/js', express.static(__dirname + '/static/js'));
app.use('/css', express.static(__dirname + '/static/css'));
app.use('/images', express.static(__dirname + '/static/images'));


app.use(bodyParser.urlencoded({ extended: true })); // html form태그 데이터 넘길때 이렇게 설정해줘야함
app.use('/api', api);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


mongoose.connect('mongodb://192.168.56.1/test',(err)=>{
  if(err){
    console.log('mongoose connection error : ' + err);
    throw err;
  }
  app.listen(port, () => {
    console.log('Express server start on ',port);
  });
});