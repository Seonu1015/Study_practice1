var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '사용자페이지', pageName:'users/users.ejs'});
});

module.exports = router;
