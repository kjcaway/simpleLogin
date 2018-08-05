const express = require('express');
const member = require('./member');

const router = express.Router();
router.use('/member',member);

module.exports = router;