create database webdb;
create user web identified by 'pass';
grant all privileges on webdb.* to web@'%';

-- ALTER USER 'web'@'%'
-- IDENTIFIED WITH mysql_native_password
-- BY 'pass';
-- 비밀번호 오류시 입력해서 처리하자!!!