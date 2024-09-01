<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.bit.userpad.dao.UsersDAO" %>
<%@ page import="com.bit.userpad.bean.UsersDTO" %>
<%@ page import="javax.servlet.http.HttpServletRequest" %>
<%@ page import="javax.servlet.http.HttpServletResponse" %>
<%@ page import="java.io.IOException" %>

<%
    // 클라이언트로부터 전달된 값 받기
    String userId = request.getParameter("userId");
    String password = request.getParameter("password");

    // 응답 초기화
    boolean success = false;
    String message = "비밀번호가 일치하지 않거나 오류가 발생했습니다.";

    if (userId != null && password != null) {
        UsersDAO dao = UsersDAO.getInstance();
        // 사용자 ID와 비밀번호를 사용하여 삭제 시도
        success = dao.deleteUserByIdAndPassword(userId, password);
        if (success) {
            message = "사용자가 성공적으로 삭제되었습니다.";
        } else {
            message = "비밀번호가 일치하지 않습니다.";
        }
    } else {
        message = "필수 입력값이 부족합니다.";
    }

    // JSON 형식으로 결과 전송
    response.setContentType("application/json; charset=UTF-8");
    String jsonResponse = "{\"success\":" + success + ", \"message\": \"" + message + "\"}";

    try {
        response.getOutputStream().write(jsonResponse.getBytes("UTF-8"));
    } catch (IOException e) {
        e.printStackTrace();
    }
%>
