desc books;

select * from books;
select count(*) from books;

select * from books 
where title like '%우리%' or contents like '%한국%' or authors like '%김%'
order by bid desc
limit 0, 5;

call books('', 2, 10);