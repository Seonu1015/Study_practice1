var express = require('express');
var router = express.Router();

var db = require("../db");

// 사용자목록페이지
router.get('/', function (req, res) {
    res.render('index', { title: '사용자 목록', pageName: 'users/list.ejs' });
});

// 사용자목록 JSON
router.get('/list.json', function(req, res) {
    const sql = 'select * from users order by uname';
    db.get().query(sql, function(err, rows) {
        res.send(rows);
    })
})

//로그인페이지
router.get('/login', function (req, res) {
    res.render('index', { title: "로그인", pageName: 'users/login.ejs' });
})

//로그인체크
router.post('/login', function (req, res) {
    const uid = req.body.uid;
    const upass = req.body.upass;
    console.log(uid, upass);

    let result = '0'; // user가 없을 때
    const sql = "select * from users where uid=?";
    db.get().query(sql, [uid], function (err, rows) {
        console.log(rows[0]);
        if (rows[0]) {
            if (rows[0].upass == upass) {
                result = '1'; // 로그인 성공
            } else {
                result = '2'; // 비밀번호 불일치
            }
        }
        res.send(result);
    });
});

//회원가입 페이지 이동 (페이지를 가져오는 작업)
router.get('/insert', function(req, res) {
    res.render('index', {title:'회원가입', pageName:'users/insert.ejs'});
});

//회원가입
router.post('/insert', function(req, res) {
    const uid=req.body.uid;
    const upass=req.body.upass;
    const uname=req.body.uname;
    const phone=req.body.phone;
    const address1=req.body.address1;
    const address2=req.body.address2;

    console.log(uid, upass, uname, phone, address1, address2);

    const sql = 'insert into users(uid, upass, uname, phone, address1, address2) values(?,?,?,?,?,?)';
    db.get().query(sql, [uid, upass, uname, phone, address1, address2], function(err, rows) {
        res.redirect('/users/login');
    });

});

// 마이페이지 이동 (:uid를 해야 파라미터로 인식)
// 파라미터로 작성한 경우
// router.get('/mypage/:uid', function(req, res) {
//     const uid = req.params.uid;

// 쿼리로 작성한 경우
router.get('/mypage', function(req, res) {
    const uid = req.query.uid;
    const sql = 'select * from users where uid=?';
    db.get().query(sql, [uid], function(err, rows) {
        console.log('............', rows[0]);
        res.render('index', {title:'마이페이지', pageName:'users/mypage'});
    });
});

module.exports = router;
