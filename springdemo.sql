CREATE database springdemo;

--创建blog
CREATE TABLE blog
(
id bigint UNSIGNED not null auto_increment ,
title VARCHAR(100),
content VARCHAR(255),
user_id bigint,
pub_date date,
PRIMARY key(id),
unique key `title` (`title`)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET='utf8';

--创建user
create TABLE user
(
id bigint not null auto_increment ,
nickname nvarchar(50),
password VARCHAR(50),
first_name nvarchar(50),
last_name nvarchar(50),
PRIMARY key(id)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET='utf8';


