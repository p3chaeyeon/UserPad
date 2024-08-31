<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" 
import="java.util.*, com.bit.userpad.dao.BoardDAO, com.bit.userpad.bean.BoardDTO" %>

<%
    // URL 파라미터에서 게시물 번호 가져오기
    int postNo = Integer.parseInt(request.getParameter("no"));
    
    // 데이터베이스에서 해당 게시물을 조회
    BoardDAO dao = BoardDAO.getInstance();
    BoardDTO board = dao.getBoardByNo(postNo);

    // JSON 데이터 생성
    StringBuilder jsonBuilder = new StringBuilder();
    jsonBuilder.append("{")
               .append("\"no\":").append(board.getNo()).append(",")
               .append("\"subject\":\"").append(board.getSubject()).append("\",")
               .append("\"content\":\"").append(board.getContent()).append("\",")
               .append("\"userId\":\"").append(board.getUserId()).append("\",")
               .append("\"logDate\":\"").append(board.getLogDate()).append("\"")
               .append("}");

    // JSON 데이터 출력
    response.setContentType("application/json");
    response.getWriter().print(jsonBuilder.toString());
%>
