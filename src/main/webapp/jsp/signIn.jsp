<%@page import="com.bit.userpad.dao.UsersDAO"%>
<%@page import="com.bit.userpad.bean.UsersDTO"%>
<%@page contentType="application/json; charset=UTF-8" language="java" %>

<%
    String userId = request.getParameter("user_id");
    String userPwd = request.getParameter("user_pw");

    String status = "error";
    String message = "";

    if (userId != null && userPwd != null) {
        UsersDAO usersDAO = UsersDAO.getInstance();
        UsersDTO user = null;

        try {
            user = usersDAO.getUserByIdPassword(userId, userPwd);
            if (user != null) {
                status = "success";
            } else {
                message = "아이디 또는 비밀번호가 잘못되었습니다.";
            }
        } catch (Exception e) {
            message = "데이터베이스 오류가 발생했습니다.";
        }
    } else {
        message = "아이디와 비밀번호를 입력해주세요.";
    }

    String jsonResponse = String.format("{\"status\": \"%s\", \"message\": \"%s\"}", status, message);
    out.print(jsonResponse);
%>
