<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.bit.userpad.dao.BoardDAO" %>
<%@ page import="javax.servlet.http.HttpServletRequest" %>
<%@ page import="javax.servlet.http.HttpServletResponse" %>

<%
    int postNo = Integer.parseInt(request.getParameter("no"));

    BoardDAO boardDao = BoardDAO.getInstance();
    
    String status = "error";
    String message = "";

    try {
        boolean isDeleted = boardDao.deleteBoard(postNo);
        if (isDeleted) {
            status = "success";
        } else {
            message = "게시글 삭제에 실패했습니다.";
        }
    } catch (Exception e) {
        message = "서버 오류가 발생했습니다.";
        e.printStackTrace();
    }

    String jsonResponse = String.format("{\"status\": \"%s\", \"message\": \"%s\"}", status, message);
    response.setContentType("application/json");
    response.getWriter().print(jsonResponse);
%>
