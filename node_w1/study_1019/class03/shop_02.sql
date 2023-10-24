desc users;

create view view_review as
select users.uname, users.photo, review.*, date_format(regdate, '%Y-%m-%d %T') fmtdate
from review, users
where review.uid=users.uid
order by rid desc;

drop view view_review;

select * from view_review;

create table cart(
	cid int auto_increment primary key,
    uid varchar(20) not null,
    bid int not null,
    qnt int default 1,
    regdate datetime default now(),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

select * from cart;

delete from cart where cid>0;
desc books;

create view view_cart as 
select cart.*, books.title, books.image, books.price, format(books.price, 0) fmtprice
from cart, books
where cart.bid=books.bid
order by cid desc;

drop view view_cart;

select * from view_cart;

select *, qnt*price as sum, sum(qnt*price) as total from view_cart where uid='red';

select sum(qnt*price) as total from view_cart where uid='red';




