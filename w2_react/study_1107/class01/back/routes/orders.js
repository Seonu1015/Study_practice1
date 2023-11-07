var express = require('express');
var router = express.Router();
var db = require('../db');

// 주문자 정보 저장
router.post('/insert/purchase', function (req, res) {
    const uid = req.body.uid;
    const rname = req.body.uname;
    const rphone = req.body.phone;
    const raddress1 = req.body.address1;
    const raddress2 = req.body.address2;
    const sum = req.body.sum;

    let sql = 'insert into purchase (uid, rname, rphone, raddress1, raddress2, sum) values(?,?,?,?,?,?)';
    db.get().query(sql, [uid, rname, rphone, raddress1, raddress2, sum], function (err) {
        if (!err) {
            sql = 'select last_insert_id() last from purchase'; // 가장 최근 pid를 읽어옴
            db.get().query(sql, function (err, rows) {
                res.send({ last: rows[0].last });
            });
        } else {
            res.send('0');
        }
    });
});

// 주문 상품 등록
router.post('/insert', function (req, res) {
    const cid = req.body.cid;
    const pid = req.body.pid;
    const bid = req.body.bid;
    const qnt = req.body.qnt;
    const price = req.body.price;

    let sql = 'insert into orders(pid, bid, qnt, price) values(?,?,?,?)';
    db.get().query(sql, [pid, bid, qnt, price], function (err) {
        if (!err) {
            sql = 'delete from cart where cid =?';
            db.get().query(sql, [cid], function (err) {
                res.send('1');
            });
        } else {
            res.send('0');
        }
    });
});

// 주문 상세 list.json
router.get('/list/purchase.json', function(req, res) { // localhost:5000/orders/list/purchase.json?uid=red
    const uid = req.query.uid;
    const page = req.query.page ? req.query.page : 1;
    const size = req.query.size ? req.query.size : 3;

    const sql = 'call purchase_list(?,?,?)';
    db.get().query(sql, [uid, page, size], function(err, rows) {
        res.send({list:rows[0], total:rows[1][0].total});
    });
});

// 주문 상품 목록
router.get('/list/order.json', function(req, res) {
    const pid = req.query.pid;
    const sql = 'call order_list(?)';
    db.get().query(sql, [pid], function(err, rows) {
        res.send(rows[0]);
    });
})

// 주문 상품 목록 - 관리자용
router.get('/list.json', function(req, res) { // localhost:5000/orders/list.json
    const page = req.query.page ? req.query.page : 1;
    const size = req.query.size ? req.query.size : 3;
    const query = req.query.query ? req.query.query : "";

    const sql = 'call purchase_all(?,?,?)';
    db.get().query(sql, [page, size, query], function(err, rows) {
        res.send({list:rows[0], total:rows[1][0].total});
    });
});

// 주문 상태 변경
router.post('/update', function(req, res) {
    const pid = req.body.pid;
    const status = req.body.status;

    const sql = 'update purchase set status=? where pid=?';
    db.get().query(sql, [status, pid], function(err) {
        if(err) {
            res.send('0');
        } else {
            res.send('1');
        }
    });
});

module.exports = router;