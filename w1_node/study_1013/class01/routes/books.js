var express = require('express');
var router = express.Router();

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

    console.log(title, authors, price, publisher, image, contents);

})

module.exports = router;
