use webdb;

create table users(
	uid varchar(20) not null primary key,
    upass varchar(200) not null,
    uname varchar(20),
    photo varchar(200),
    phone varchar(20),
    address1 varchar(200),
    address2 varchar(200)
);

insert into users(uid, upass, uname)
values('blue','pass','김블루');
insert into users(uid, upass, uname)
values('red','pass','이레드');
insert into users(uid, upass, uname)
values('green','pass','최그린');

update users set
phone='010-1010-2020', address1='인천 서구 서곶로120' where uid='blue';
update users set
phone='010-1010-3030', address1='서울 강서구 화곡동' where uid='red';
update users set
phone='010-1010-4040', address1='서울 강남구 대치동' where uid='green';

select * from users;
select * from users where uid='red';

select * from users order by uname;

create table books(
	bid int auto_increment primary key,
    title varchar(300) not null,
    price int default 0,
    authors varchar(300),
    publisher varchar(300),
    regdate datetime default now(),
    image varchar(300),
    contents text,
    isbn varchar(100)
);

drop table books; -- 테이블 통째로 날아감

desc books;
select * from books
order by bid desc
limit 0,5;

select *, format(price,0) fmtprice, date_format(regdate, '%Y-%m-%d') fmtdate
from books
order by bid desc;

select count(*) from books;

select * from books
order by bid desc;

select * from books where authors like '%이%';

select * from books order by bid desc limit 0, 6;

create table favorite(
	uid varchar(20) not null,
    bid int not null,
    regdate datetime default now(),
    primary key(uid, bid),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

desc users;

desc books;

desc favorite;

select * from favorite;

select * from users;

select bid, title from books
order by bid desc;

insert into favorite(uid, bid) values('red', 127);
insert into favorite(uid, bid) values('black', 127);
insert into favorite(uid, bid) values('green', 127);
insert into favorite(uid, bid) values('blue', 126);
insert into favorite(uid, bid) values('black', 126);

update favorite set regdate=now() where uid='red' and bid=127;

delete from favorite where bid=126 and uid='blue';

delete from favorite where bid>0;

select count(*) cnt from favorite where uid = 'red' and bid = 127;
select count(*) fcnt from favorite where bid=126;

select count(*) fcnt,
(select count(*) cnt from favorite where uid = 'red' and bid = 127) ucnt
from favorite
where bid=127;


select *,
(select count(*) from favorite where bid=books.bid) fcnt,
(select count(*) from favorite where bid=books.bid and uid='red') ucnt
from books
where title like '%%' or authors like '%%'
order by bid desc
limit 0, 6;

select count(*) fcnt from favorite where bid=127;
select count(*) ucnt from favorite where bid=127 and uid='red';