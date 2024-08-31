// src/main/java/com/bit/userpad/dao/BoardDAO.java
package com.bit.userpad.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.Statement;
import com.bit.userpad.bean.BoardDTO;

public class BoardDAO {
	private String driver = "oracle.jdbc.driver.OracleDriver";
	private String url = "jdbc:oracle:thin:@localhost:1521:XE";
	private String user = "c##java";
	private String password = "1234";

	private Connection con;
	private PreparedStatement pstmt;
	private ResultSet rs; // SQL(select) 쿼리 결과를 저장하는 객체; select를 하면 ResultSet이 따라오도록. 여기에만 담아오도록
	
	// 싱글톤 인스턴스 생성
	private static BoardDAO instance = new BoardDAO();

	public static BoardDAO getInstance() {
		return instance;
	}
	
	public BoardDAO() { // Driver Loading
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	private void getConnection() { // connection
		try {
			con = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void closeAll() {
		try { // con --> pstmt --> rs 순서로 만들었으니 닫는건 반대로
			if (rs != null) rs.close();
			if (pstmt != null) pstmt.close();
			if (con != null) con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/** board.html */
	// 글 목록 가져오기
	public List<BoardDTO> getAllBoards() {
	    List<BoardDTO> list = new ArrayList<>();
	    String sql = "SELECT seq AS no, subject, content, user_id, logtime FROM board ORDER BY logtime DESC"; 

	    try {
	        getConnection();
	        pstmt = con.prepareStatement(sql);
	        rs = pstmt.executeQuery();

	        while (rs.next()) {
	            BoardDTO dto = new BoardDTO(
	                rs.getInt("no"),
	                rs.getString("subject"),
	                rs.getString("content"),
	                rs.getString("user_id"),
	                rs.getDate("logtime")
	            );
	            list.add(dto);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } finally {
	        closeAll();
	    }
	    return list;
	}

	/**  boardDetail.html */
	// 글 세부사항 가져오기
	public BoardDTO getBoardByNo(int no) {
        BoardDTO board = null;
        String sql = "SELECT seq AS no, subject, content, user_id, logtime FROM board WHERE seq = ?";

        try {
            getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setInt(1, no);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                board = new BoardDTO(
                    rs.getInt("no"),
                    rs.getString("subject"),
                    rs.getString("content"),
                    rs.getString("user_id"),
                    rs.getDate("logtime")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeAll();
        }
        return board;
    }
	
	/** boardPost.html */
    // 글 작성
	public void insertBoard(String subject, String content, String userId) {
	    String sql = "INSERT INTO board (seq, subject, content, user_id, logtime) VALUES (board_seq.NEXTVAL, ?, ?, ?, SYSDATE)";

	    try {
	        getConnection();
	        pstmt = con.prepareStatement(sql);
	        pstmt.setString(1, subject);
	        pstmt.setString(2, content);
	        pstmt.setString(3, userId);
	        pstmt.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } finally {
	        closeAll();
	    }
	}	

}
