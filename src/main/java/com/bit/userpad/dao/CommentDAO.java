// src/main/java/com/bit/userpad/dao/CommentDAO.java
package com.bit.userpad.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.bit.userpad.bean.CommentDTO;

public class CommentDAO {
    private String driver = "oracle.jdbc.driver.OracleDriver";
    private String url = "jdbc:oracle:thin:@localhost:1521:XE";
    private String user = "c##java";
    private String password = "1234";

    private Connection con;
    private PreparedStatement pstmt;
    private ResultSet rs;

    private static CommentDAO instance = new CommentDAO();

    public static CommentDAO getInstance() {
        return instance;
    }

    public CommentDAO() {
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private void getConnection() {
        try {
            con = DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void closeAll() {
        try {
            if (rs != null) rs.close();
            if (pstmt != null) pstmt.close();
            if (con != null) con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // boardDetail.html
    public List<CommentDTO> getCommentsByPostNo(int postNo) {
        List<CommentDTO> comments = new ArrayList<>();
        String sql = "SELECT comment_content, user_id, comment_date FROM comments WHERE board_seq = ? ORDER BY comment_date";
        try {
            getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setInt(1, postNo);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                // CommentDTO 생성 시 comment_id 제외
                CommentDTO comment = new CommentDTO(
                    rs.getString("comment_content"),  
                    rs.getString("user_id"),         
                    rs.getDate("comment_date")       
                );
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeAll();
        }
        return comments;
    }
}
