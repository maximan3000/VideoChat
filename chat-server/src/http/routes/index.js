const express = require('express');
const router = new express.Router();
const path = require('path');

router.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname + './../../../public/index.html'));
});

module.exports = router;
