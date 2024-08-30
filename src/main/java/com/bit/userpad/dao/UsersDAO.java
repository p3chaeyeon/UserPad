package com.bit.userpad.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;
import com.bit.userpad.bean.UsersDTO;

public class UsersDAO {
	private String driver = "oracle.jdbc.driver.OracleDriver";
	private String url = "jdbc:oracle:thin:@localhost:1521:XE";
	private String user = "c##java";
	private String password = "1234";

	private Connection con;
	private PreparedStatement pstmt;
	private ResultSet rs; // SQL(select) 쿼리 결과를 저장하는 객체; select를 하면 ResultSet이 따라오도록. 여기에만 담아오도록
	
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

	private PreparedStatement prepareStatement(String sql, String... params) throws SQLException {
		getConnection(); // SQL; database 연결(접속)
		pstmt = con.prepareStatement(sql); // SQL 쿼리 정의
		for (int i = 0; i < params.length; i++) {
			pstmt.setString(i + 1, params[i]);
		}
		return pstmt;
	}
	
	// Sign Up
	
	public UsersDTO getUserById(String id) { // id 중복 체크
        UsersDTO user = null;
        String sql = "SELECT name, id, pwd, email, phone FROM users WHERE id = ?";

        try {
            pstmt = prepareStatement(sql, id);
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
            closeAll();
        }
        return user;
    }
	
	public boolean insertUser(UsersDTO user) { // DB 에 회원 등록
        String sql = "INSERT INTO users (name, id, pwd, email, phone) VALUES (?, ?, ?, ?, ?)";
        boolean result = false;

        try {
            pstmt = prepareStatement(sql, user.getName(), user.getId(), user.getPwd(), user.getEmail(), user.getPhone());
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                result = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeAll();
        }
        return result;
    }
	
	
	
	// Sign In
	public UsersDTO getUserByIdPassword(String id, String password) {
	    UsersDTO user = null;
	    String sql = "SELECT name, id, pwd, email, phone FROM users WHERE id = ? AND pwd = ?";

	    try {
	        pstmt = prepareStatement(sql, id, password);
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
	        closeAll();
	    }
	    return user;
	}

	
}
