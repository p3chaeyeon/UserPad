-- Oracle
-- 테이블 생성
create table board( 
	seq number PRIMARY KEY,
	subject VARCHAR2(100) NOT NULL,
	content CLOB NOT NULL,
	user_id VARCHAR2(30),
	logtime date, 
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);
 
-- 시퀀스 생성  
create sequence board_seq
	start with 1
	increment by 1
	nocache
	nocycle;