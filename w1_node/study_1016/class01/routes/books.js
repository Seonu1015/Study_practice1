var express = require('express');
var router = express.Router();
var db = require('../db');

/* 도서 검색 */
router.get('/', function (req, res, next) {
    res.render('index', { title: '도서검색', pageName: 'books/search.ejs' });
});

/* 도서검색결과 저장 */
router.post('/search/insert', function (req, res) {
    const title = req.body.title;
    const authors = req.body.authors;
    const price = req.body.price;
    const publisher = req.body.publisher;
    const image = req.body.thumbnail;
    const contents = req.body.contents;
    const isbn = req.body.isbn;

    // console.log(title, authors, price, publisher, image, contents, isbn);

    // 책이 중복되서 저장되지 않도록 고유값인 isbn을 사용해서 체크
    const sql1 = 'select * from books where isbn=?';
    db.get().query(sql1, [isbn], function(err, rows) {
        if(rows.length > 0) { // 도서가 이미 있는 경우
            res.send('1');
        } else { // 도서가 없는 경우
            const sql = 'insert into books(title, authors, price, publisher, image, contents, isbn) values(?,?,?,?,?,?,?)';
            db.get().query(sql, [title, authors, price, publisher, image, contents, isbn], function(err, rows){
                if(err) {
                    console.log("도서저장 오류 =============", err);
                }
                res.send('0');
            });
        }
    });
});

// 도서상품목록 JSON
router.get('/list.json', function(req, res) {
    const page = req.query.page;
    const start = (parseInt(page)-1) * 5;
    const sql = 'select * from books order by bid desc limit ?, 5';
    db.get().query(sql, [start], function(err, rows) {
        if(err) console.log('도서목록JSON : ', err);
        res.send(rows);
    });
});

// 도서상품목록 페이지 이동
router.get('/list', function(req, res) {
    res.render('index', {title:'도서상품목록', pageName:'books/list.ejs'});
});

// 데이터 개수 출력
router.get('/count', function(req, res) {
    const sql= 'select count(*) total from books';
    db.get().query(sql, function(err, rows) {
        if(err) console.log("데이터 개수 출력 : ", err);
        res.send(rows[0]);
    })
});

// 도서 삭제
router.post('/delete', function(req, res) {
    const bid = req.body.bid;
    const sql = 'delete from books where bid = ?';
    db.get().query(sql, [bid], function(err) {
        if(err) console.log("도서 삭제 에러 : ", err);
        res.sendStatus(200);
    });
});

module.exports = router;
