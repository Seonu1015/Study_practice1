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
select cart.*, books.title, books.image, books.price,
	format(books.price, 0) fmtprice, price*qnt as sum, format(price*qnt, 0) fmtsum
from cart, books
where cart.bid=books.bid
order by cid desc;

drop view view_cart;

select * from view_cart;

select *, qnt*price as sum, sum(qnt*price) as total from view_cart where uid='red';

select sum(qnt*price) as total from view_cart where uid='red';

select * from view_cart where cid in (5, 6);

create table purchase(
	pid int auto_increment primary key,
    uid varchar(20) not null,
    rname varchar(20) not null,
    rphone varchar(20) not null,
    raddress1 varchar(200) not null,
    raddress2 varchar(200) not null,
    regdate datetime default now(),
    status int default 0,
    sum int default 0,
    foreign key(uid) references users(uid)
);

create table orders(
	pid int not null,
    bid int not null,
    qnt int default 0,
    price int default 0,
    primary key(pid, bid),
    foreign key(pid) references purchase(pid),
    foreign key(bid) references books(bid)
);

select * from purchase;