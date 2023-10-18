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
(select count(*) from favorite where bid=books.bid and uid=?) ucnt
from books
where title like ? or authors like ?
order by bid desc
limit ?, 6;

select count(*) fcnt from favorite where bid=127;
select count(*) ucnt from favorite where bid=127 and uid='red';

create table review(
	rid int auto_increment primary key,
    uid varchar(20) not null,
    bid int not null,
    contents text,
    regdate datetime default now(),
    foreign key(uid) references users(uid),
    foreign key(bid) references books(bid)
);

select bid from books order by bid desc;

insert into review(bid, uid, contents)
values(127, 'red', '나태주 시인이 우리에게 들려주는 따뜻한 위로의 말들. 너무 잘하려고 애쓰지 마라는 총 4부로 구성되어 있다. 각 장마다 나태주 시인의 대상에 대한 따뜻한 바라봄이 느껴진다. 
	시를 따라가다 보면 떠밀려 사는 우리들에게 여유와 위로를 건넨다. 쉽게 읽히면서도 한 구절 한 구절 곱씹어 볼수록 우리에게 따뜻한 위로를 건네는 나태주 시인을 만나볼 수 있다.');
    

insert into review(bid, uid, contents)
values(127, 'blue', '코로나 시대를 거치면서, 또한 왜인지는 정확히 알 수 없으나 점점 더 딱딱하고 거칠어져가는 세상에서 지친 사람들을 위로하려는 시인의 마음으로 가득한 시집입니다. 
	마음을 땅 부드럽게 때리면서 한 구절 꼭 마음안에 새기게 되는 시를 딱 꼽을 구 없는 것이 아쉽긴 합니다만, 뭐 어떻습니까. 그래도 나태주 시인인걸요. 
    서점에서 보고 사서 시험준비로 바쁜 중학생 조카에게 선물했습니다. 꼭 읽으라는 것은 아니고, 책상 위 참고서들 사이에 세워놓고 제목이라도 볼때마다 한 템포 쉬어갔으면 좋겠네요.');
    
insert into review(bid, uid, contents)
values(127, 'black', '풀꽃이라는 시로 잘 알려진 나태주 작가님의 따스한 마음이 담긴 시집이었습니다. 매일 한 편씩 써내려간 시라고 들었어요. 
	내가 소중한 존재라는 걸 마음 깊이 느낄 수 있었던 시간이었습니다. 마음에 위로를 받을 수 있는 따뜻한 시집입니다. 위로가 필요하신 분들께 추천드려요.');

insert into review(bid, uid, contents)
values(121, 'red', '너무나 유명세를 탔던 작품이라... 딱히 줄거리를 몇 자 적는것이 리뷰가 될지 모르겠다. 일제 강점기의 굶주림을 조금이나마 벗어나고자 몸부림쳤던 
	선조들의 삶이 바다건너 일본과 미국으로 건너간 후 대를 잇는 후손들이 그들의 삶을 이어받아 얽히고 섥혀 뿌리를 내리고 멸시당하면서도 나름 그들만의 세계를 만들어 꿎꿎하게 삶을 이어가고 있다... 
    일제강점기라는 있어서는 안될 시기를 거친 우리나라의 치유되지 않는 몇 십년의 삶에 민초들이 겪어야했던 삶의 부침과 그들의 후손들이 타국에서 겪어야했던 
    멸시와 배척을 딛고 살아가는 한인들이 날줄, 씨줄이 만나는 것처럼 일 저리 부딪혀 만들어내는 땀내나는 삶의 흔적이 이 책에 있다 하겠다. 
    파친코를 하여 가게를 일으킨, 그리고 그와 얽힌 여인들의 삶... 치유보다는 그걸 넘어선 사람들의 이야기다.');

select * from review;
