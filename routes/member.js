const express = require('express');
const path = require('path');
const Member = require('../models/member');

const router = express.Router();

router.get('/signin', (req, res) => {
  console.log('[GET]/member/signin...');
  res.render('signin', {
    success: true,
    message: '',
    session: req.session
  });
});

router.post('/signin', (req, res) => {
  console.log('[POST]/member/signin...');

  let userId = req.body.userid;
  let passWd = req.body.passwd;

  if(userId === ''){
    return res.render('signin', {
      success: false,
      message: '아이디를 입력하세요.',
      session: req.session
    });
  }

  if(passWd === ''){
    return res.render('signin', {
      success: false,
      message: '아이디를 입력하세요.',
      session: req.session
    });
  }

  // To do...
  Member.findOne({ userid: userId }, (err, member) => {
    if (err) throw err;

    if (!member) {
      return res.render('signin', {
        success: false,
        message: '일치하는 id가 없습니다.',
        session: req.session
      });
    }

    if (!member.validateHash(passWd)) {
      return res.render('signin', {
        success: false,
        message: '비밀번호를 확인하세요.',
        session: req.session
      });
    }

    let session = req.session;
    session._id = member.userid;

    return res.redirect('/');
  })
});

router.get('/signup', (req, res) => {
  console.log('[GET]/member/signup...');
  res.render('signup', {
    success: true,
    message: '',
    session: req.session
  });
});

router.post('/signup', (req, res) => {
  console.log('[POST]/member/signup...');

  // To do...
  Member.findOne({ userid: req.body.userid }, (err, exists) => {
    if (err) throw err;
    if (exists) {
      return res.render('signup', {
        success: false,
        message: '이미 존재하는 아이디 입니다.',
        session: req.session
      });
    }

    console.log(req.body.userid);
    console.log(req.body.passwd);

    let member = new Member({
      userid: req.body.userid,
      password: req.body.passwd
    });

    member.password = member.generateHash(member.password);

    member.save(err => {
      if (err) throw err;
      return res.redirect('/');
    });
  });
});

router.get('/logout', (req, res) => {
  console.log("[POST]/member/logout...");

  // To do..

  let session = req.session;
  session.destroy((err) => { if (err) throw err });
  return res.redirect('/');
});

router.get('/', (req, res) => {
  console.log("[GET]/member/ ...");
  Member.find()
  .sort({'created': -1})
  .exec((err, members) => {
    if(err) throw err;

    return res.render('memberlist', {
      success: true,
      message: '',
      session: req.session,
      data: members
    });
  });
});

module.exports = router;