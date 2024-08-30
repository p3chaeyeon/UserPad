-- Oracle
 create table user (
 name VARCHAR2(20) NOT NULL,
 id VARCHAR2(30) PRIMARY KEY, -- 중복허용(무결성 제약조건), not null
 pwd VARCHAR2(50) NOT NULL,
 email VARCHAR2(50) NOT NULL,
 phone VARCHAR2(20) UNIQUE);