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