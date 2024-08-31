<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<%@ page import="com.bit.userpad.dao.UsersDAO" %>
<%@ page import="com.bit.userpad.dao.BoardDAO"  %>

<%
String subject = request.getParameter("subject");
String content = request.getParameter("content");

//쿠키에서 사용자 ID 읽기
String userId = null;
Cookie[] cookies = request.getCookies();
if (cookies != null) {
 for (Cookie cookie : cookies) {
     if ("userId".equals(cookie.getName())) {
         userId = cookie.getValue();
         break;
     }
 }
}

StringBuilder jsonResponse = new StringBuilder();
jsonResponse.append("{");

try {
 BoardDAO boardDao = BoardDAO.getInstance();
 
 // 글 작성
 boardDao.insertBoard(subject, content, userId);

 jsonResponse.append("\"success\": true");
} catch (Exception e) {
 e.printStackTrace();
 jsonResponse.append("\"success\": false,");
 jsonResponse.append("\"message\": \"게시물 작성 중 오류가 발생했습니다.\"");
} finally {
 jsonResponse.append("}");
 response.setContentType("application/json");
 response.getWriter().print(jsonResponse.toString());
}

%>