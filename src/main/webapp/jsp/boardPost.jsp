<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<%@ page import="com.bit.userpad.dao.UsersDAO" %>
<%@ page import="com.bit.userpad.dao.BoardDAO"  %>

<%
String subject = request.getParameter("subject");
String content = request.getParameter("content");
String userName = (String) session.getAttribute("userName"); // 로그인한 사용자의 이름을 세션에서 가져오기

String userId = null;
if (userName != null) {
    UsersDAO usersDao = UsersDAO.getInstance();
    userId = usersDao.getUserIdByName(userName);
}

StringBuilder jsonResponse = new StringBuilder();
jsonResponse.append("{");

try {
    BoardDAO boardDao = BoardDAO.getInstance();
    
    // 게시물 추가
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