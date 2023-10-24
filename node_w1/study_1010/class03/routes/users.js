var express = require('express');
var router = express.Router();
var db = require("../db");

/* GET users listing. */
router.get('/list.json', function(req, res, next) {
  var sql = 'select * from users';
  db.get().query(sql, function(err, rows){
    res.send(rows);
  });
});

//사용자 목록
router.get('/', function(req, res){
    res.render('index', {title:'사용자 목록', pageName:'users/list.ejs'});
});

module.exports = router;
