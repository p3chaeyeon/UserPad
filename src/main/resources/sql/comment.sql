-- 테이블 생성
CREATE TABLE comments (
    comment_id NUMBER PRIMARY KEY,
    board_seq NUMBER,
    comment_content CLOB NOT NULL,
    user_id VARCHAR2(30),
    comment_date DATE,
    FOREIGN KEY (board_seq) REFERENCES board(seq) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 시퀀스 생성
CREATE SEQUENCE comment_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
