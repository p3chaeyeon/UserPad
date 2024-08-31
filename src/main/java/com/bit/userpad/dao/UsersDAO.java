// src/main/java/com/bit/userpad/dao/UsersDAO.java
package com.bit.userpad.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.bit.userpad.bean.UsersDTO;

public class UsersDAO {
	private String driver = "oracle.jdbc.driver.OracleDriver";
	private String url = "jdbc:oracle:thin:@localhost:1521:XE";
	private String user = "c##java";
	private String password = "1234";
	
	// 싱글톤 인스턴스 생성
	private static UsersDAO instance = new UsersDAO();

	public static UsersDAO getInstance() {
		return instance;
	}
	
	public UsersDAO() { // Driver Loading
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

    // Connection 객체 생성
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    // 리소스 해제 메서드
    private void closeAll(Connection con, PreparedStatement pstmt, ResultSet rs) {
        try {
            if (rs != null) rs.close();
            if (pstmt != null) pstmt.close();
            if (con != null) con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /** Sign Up */
    // 사용자 조회 - id 중복 체크
    public UsersDTO getUserById(String id) {
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        UsersDTO user = null;
        String sql = "SELECT name, id, pwd, email, phone FROM users WHERE id = ?";

        try {
            con = getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                user = new UsersDTO();
                user.setName(rs.getString("name"));
                user.setId(rs.getString("id"));
                user.setPwd(rs.getString("pwd"));
                user.setEmail(rs.getString("email"));
                user.setPhone(rs.getString("phone"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeAll(con, pstmt, rs);
        }
        return user;
    }

    // 사용자 등록
    public boolean insertUser(UsersDTO user) {
        Connection con = null;
        PreparedStatement pstmt = null;
        boolean result = false;
        String sql = "INSERT INTO users (name, id, pwd, email, phone) VALUES (?, ?, ?, ?, ?)";

        try {
            con = getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, user.getName());
            pstmt.setString(2, user.getId());
            pstmt.setString(3, user.getPwd());
            pstmt.setString(4, user.getEmail());
            pstmt.setString(5, user.getPhone());
            int rowsAffected = pstmt.executeUpdate();

            if (rowsAffected > 0) {
                result = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeAll(con, pstmt, null);
        }
        return result;
    }

    /** Sign In */
    // 사용자 로그인
    public UsersDTO getUserByIdPassword(String id, String password) {
        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        UsersDTO user = null;
        String sql = "SELECT name, id, pwd, email, phone FROM users WHERE id = ? AND pwd = ?";

        try {
            con = getConnection();
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2, password);
            rs = pstmt.executeQuery();

            if (rs.next()) {
                user = new UsersDTO();
                user.setName(rs.getString("name"));
                user.setId(rs.getString("id"));
                user.setPwd(rs.getString("pwd"));
                user.setEmail(rs.getString("email"));
                user.setPhone(rs.getString("phone"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeAll(con, pstmt, rs);
        }
        return user;
    }
}