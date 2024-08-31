<%@page contentType="application/json; charset=UTF-8" language="java" %>
<%@page import="com.bit.userpad.dao.UsersDAO"%>
<%@page import="com.bit.userpad.bean.UsersDTO"%>
<%@page import="javax.servlet.http.Cookie"%>
<%@page import="javax.servlet.http.HttpServletResponse"%>

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
             	// 로그인 성공 시 쿠키에 사용자 이름 저장
                Cookie userCookie = new Cookie("userName", user.getName());
                userCookie.setPath("/");
                userCookie.setMaxAge(60 * 60 * 24);
                response.addCookie(userCookie);
                
                // 로그인 성공 시 쿠키에 사용자 ID 저장
                Cookie userIdCookie = new Cookie("userId", user.getId()); // 쿠키 생성
                userCookie.setPath("/"); // 쿠키의 경로 설정
                userIdCookie.setMaxAge(60 * 60 * 24); // 쿠키의 유효 기간 설정 (1일)
                response.addCookie(userIdCookie); // 응답에 쿠키 추가
                
                status = "success";
            } else {
                message = "아이디 또는 비밀번호가 잘못되었습니다.";
            }
        } catch (Exception e) {
            message = "데이터베이스 오류가 발생했습니다.";
            e.printStackTrace(); // 로그에 오류 출력
        }
    } else {
        message = "아이디와 비밀번호를 입력해주세요.";
    }

    String jsonResponse = String.format("{\"status\": \"%s\", \"message\": \"%s\"}", status, message);
    out.print(jsonResponse);
%>
