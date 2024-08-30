<%@page import="com.bit.userpad.dao.UsersDAO"%>
<%@page import="com.bit.userpad.bean.UsersDTO"%>
<%@page contentType="application/json; charset=UTF-8" language="java" %>

<%
    String userName = request.getParameter("user_name");
    String userId = request.getParameter("user_id");
    String userPwd = request.getParameter("user_pw");
    String userEmail = request.getParameter("email");
    String userPhone = request.getParameter("phone");
    String action = request.getParameter("action");

    String status = "error";
    String message = "";

    UsersDAO usersDAO = UsersDAO.getInstance();

    try {
        if ("checkId".equals(action)) {
            // 아이디 중복 체크
            if (userId != null && !userId.trim().isEmpty()) {
                UsersDTO existingUser = usersDAO.getUserById(userId);
                if (existingUser != null) {
                    status = "unavailable";
                    message = "이미 사용 중인 아이디입니다.";
                } else {
                    status = "available";
                    message = "사용 가능한 아이디입니다.";
                }
            } else {
                status = "error";
                message = "아이디를 입력해주세요.";
            }
        } else if ("signUp".equals(action)) {
            // 회원가입 처리
            if (userName != null && userId != null && userPwd != null && userEmail != null && userPhone != null) {
                UsersDTO existingUser = usersDAO.getUserById(userId);
                if (existingUser != null) {
                    status = "unavailable";
                    message = "이미 사용 중인 아이디입니다.";
                } else {
                    UsersDTO newUser = new UsersDTO(userName, userId, userPwd, userEmail, userPhone);
                    boolean result = usersDAO.insertUser(newUser);
                    if (result) {
                        status = "success";
                        message = "회원가입이 성공적으로 완료되었습니다.";
                    } else {
                        status = "error";
                        message = "회원가입 처리 중 문제가 발생했습니다.";
                    }
                }
            } else {
                message = "모든 필드를 정확히 입력해주세요.";
            }
        } else {
            message = "잘못된 요청입니다.";
        }
    } catch (Exception e) {
        status = "error";
        message = "데이터베이스 오류가 발생했습니다.";
        e.printStackTrace(); // 로그에 에러 출력
    }

    String jsonResponse = String.format("{\"status\": \"%s\", \"message\": \"%s\"}", status, message);
    out.print(jsonResponse);
%>
