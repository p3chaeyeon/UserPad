-- 테이블 생성
create table board_java( 
seq number,
id varchar2(30),
name varchar2(15) not null,
subject varchar2(100),
content varchar2(500),
logtime date);
 
-- 시퀀스 생성  
create sequence board_java_seq
	start with 1
	increment by 1
	nocache
	nocycle;