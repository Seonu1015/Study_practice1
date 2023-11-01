desc books;

select * from books;
select count(*) from books;

select * from books 
where title like '%우리%' or contents like '%한국%' or authors like '%김%'
order by bid desc
limit 0, 5;

call books('한국', 2, 10);

desc users;
desc books;

alter table users add column regdate datetime default now();

select *, date_format(regdate, '%Y-%m-%d %T') fmtdate from users;

update users set photo = null where uid>'';

alter table users add column modidate datetime default now();

select *, format(price, 0) fmtprice, date_format(regdate, '%Y-%m-%d %T') fmtdate
from books
where bid=158
order by bid desc;

call book_read(158, 'red');

desc favorite;
desc review;

select *, (select count(*) from favorite where favorite.bid=books.bid) fcnt,
(select count(*) from favorite where favorite.bid=books.bid and uid='red') ucnt,
(select count(*) from review where review.bid=books.bid) rcnt
from books
where title like '%%' or contents like '%%' or authors like '%%'
order by rcnt desc
limit 0, 10;

select count(*) fcnt from favorite where bid=158;

insert into favorite(uid, bid) values('red', 158);
insert into favorite(uid, bid) values('blue', 158);

call book_list('', 1, 5, 'black');

select count(*)
from review
where bid=121;

select r.*, date_format(r.regdate, '%Y-%m-%d %T') fmtdate, uname, photo
from review r, users u
where r.bid=121 and r.uid=u.uid
order by r.rid desc
limit 0, 3;

call review_list(121,2,3);