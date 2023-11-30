create table shop(
	pid int auto_increment primary key,
    productId varchar(100) not null,
    title varchar(500) not null,
    image varchar(500),
    lprice int default 0,
    maker varchar(100),
    regdate datetime default now()
);

desc shop;

select * from shop;

select *, date_format(regdate, "%Y-%m-%d %T") fmtdate, format(lprice, 0) fmtprice
from shop
where title like concat('%', '', '%') or maker like concat('%', '', '%')
order by pid desc
limit 0, 2;

drop table shop;

create table users (
	uid varchar(20) not null primary key,
    upass varchar(200) not null,
    uname varchar(20) not null
);

insert into users values
	('blue', 'pass', '최파란'),
    ('white', 'pass', '박하얀'),
    ('sky', 'pass', '김하늘');
    
select * from users;

desc shop;

alter table shop add column viewcnt int default 0;

create table favorites (
	uid varchar(20) not null,
    pid int not null,
    regdate datetime default now(),
    primary key(uid, pid),
    foreign key(uid) references users(uid),
    foreign key(pid) references shop(pid)
);

desc favorites;
select * from users;

select * from favorites;

select *, (select count(*) from favorites where uid='white' and pid=shop.pid) ucnt
from shop
where pid = 61;

insert into favorites(uid, pid) values
	('white', 61),
    ('white', 60),
    ('white', 58),
    ('sky', 60),
    ('sky', 59),
    ('blue', 61),
    ('blue', 58);
    
insert into favorites(uid, pid) values
    ('sky', 61);
	
alter table shop add column fcnt int default 0;

update shop
set fcnt=(select count(*) from favorites where pid=shop.pid)
where shop.pid > 0;

select * from shop order by pid desc;

select * from review where cid=17;

create table review (
	cid int auto_increment primary key,
    pid int not null,
    uid varchar(20) not null,
    body text not null,
    regdate datetime default now(),
    foreign key(pid) references shop(pid),
    foreign key(uid) references users(uid)
);

select count(*) from review;

select *
from review
where pid=59
order by cid desc
limit 0, 3;

alter table shop add column rcnt int default 0;

update shop
set rcnt=(select count(*) from review where pid=shop.pid)
where shop.pid > 0;

create table cart (
	cid int auto_increment primary key,
	pid int not null,
    uid varchar(20) not null,
    qnt int default 1,
    regdate datetime default now(),
    foreign key(pid) references shop(pid),
    foreign key(uid) references users(uid)
);

drop table cart;

insert into cart(uid, pid) values
	('white', 61),
    ('white', 59),
    ('white', 58),
    ('white', 17),
    ('white', 21);
    
create view view_cart as
select c.*, title, image, lprice, format(lprice, 0) fmtprice
from cart c, shop s
where c.pid = s.pid;

select * from view_cart order by cid desc;

select * from cart order by cid desc;

select sum(lprice*qnt) as sum, format(sum(lprice*qnt), 0) as fmtsum
from view_cart
where uid='white';

alter table users add column phone varchar(20);

desc users;

update users set address1='서울 용산구 백범로99길 40(용산 베르디움 프렌즈)', address2='102동 205호' where uid='white';

select * from users;

create table purchase (
	oid char(20) not null primary key,
    uid varchar(20) not null,
    uname varchar(20) not null,
    phone varchar(20) not null,
    address1 varchar(500) not null,
    address2 varchar(500) not null,
    sum int default 0,
    foreign key(uid) references users(uid)
);

create table orders (
	oid char(20) not null,
    pid int not null,
    lprice int default 0,
    qnt int default 0,
    primary key(oid, pid),
    foreign key(oid) references purchase(oid),
    foreign key(pid) references shop(pid)
);

drop table orders;

alter table purchase add column regdate datetime default now();
select * from purchase;
select * from orders;

select *, format(sum, 0) as fmtsum, date_format(regdate, '%Y-%m-%d %T') as fmtdate
from purchase
where uid = 'white'
order by regdate desc
limit 0, 3;

desc orders;

select * from view_orders where oid='8ed22af3-9e0e-45aa-b';

create view view_orders as
select o.*, title, image, format(o.lprice, 0) fmtprice, format((o.lprice * o.qnt), 0) fmtsum
from orders o, shop s
where o.pid = s.pid;

desc purchase;

alter table purchase add column status int default 0;
/* 0:결제대기, 1:결제완료, 2:배송준비, 3:배송중, 4:배송완료, 5:구매확정*/

create view view_purchase as
select *, format(sum, 0) as fmtsum, date_format(regdate, '%Y-%m-%d %T') as fmtdate,
case
	when(status = 0) then '결제확인중'
	when(status = 1) then '결제완료'
    when(status = 2) then '배송준비중'
    when(status = 3) then '배송중'
    when(status = 4) then '배송완료'
    when(status = 5) then '구매확정'
end as str_status
from purchase;

update purchase set status=1 where oid='6056b492-de9c-427f-a';

select * from view_purchase;