const express = require('express');
const path = require('path');
const Member = require('../models/member');

const router = express.Router();

router.get('/signin', (req, res)=>{
  console.log('[GET]/member/signin...');
  res.sendFile(path.join(__dirname, '../public/signin.html'));
});

router.post('/signin', (req, res)=>{
  console.log('[POST]/member/signin...');

  // To do...
});

router.get('/signup', (req, res)=>{
  console.log('[GET]/member/signup...');
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.post('/signup', (req, res)=>{
  console.log('[POST]/member/signup...');

  // To do...
  Member.findOne({userid:req.body.userid }, (err,exists)=>{
    if(err) throw err;
    if(exists){
      return res.json({error:'USERID EXISTS'});
    }

    console.log(req.body.userid);
    console.log(req.body.passwd);

    let member = new Member({
      userid : req.body.userid,
      password : req.body.passwd
    });

    member.password = member.generateHash(member.password);

    member.save(err=>{
      if(err) throw err;
      return res.json({success:true});
    });
  });
});

module.exports =  router;