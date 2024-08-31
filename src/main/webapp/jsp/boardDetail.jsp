<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"
import="java.util.*, com.bit.userpad.dao.BoardDAO, com.bit.userpad.bean.BoardDTO, com.bit.userpad.dao.CommentDAO, com.bit.userpad.bean.CommentDTO" %>

<%
    int postNo = Integer.parseInt(request.getParameter("no"));

    BoardDAO boardDao = BoardDAO.getInstance();
    BoardDTO board = boardDao.getBoardByNo(postNo);

    CommentDAO commentDao = CommentDAO.getInstance();
    List<CommentDTO> comments = commentDao.getCommentsByPostNo(postNo);

    StringBuilder jsonBuilder = new StringBuilder();
	jsonBuilder.append("{")
               .append("\"no\":").append(board.getNo()).append(",")
               .append("\"subject\":\"").append(board.getSubject()).append("\",")
               .append("\"content\":\"").append(board.getContent()).append("\",")
               .append("\"userId\":\"").append(board.getUserId()).append("\",")
               .append("\"logDate\":\"").append(board.getLogDate().toString()).append("\",")
               .append("\"comments\":["); // 댓글 배열 시작

	for (int i = 0; i < comments.size(); i++) {
	     CommentDTO comment = comments.get(i);
	     jsonBuilder.append("{")
	                .append("\"userId\":\"").append(comment.getUserId()).append("\",")
	                .append("\"content\":\"").append(comment.getContent()).append("\",")
	                .append("\"logDate\":\"").append(comment.getLogDate().toString()).append("\"") // 날짜를 문자열로 변환
	                .append("}");
	     if (i < comments.size() - 1) {
	         jsonBuilder.append(",");
	     }
	 }
	
	jsonBuilder.append("]"); // 댓글 배열 끝
    jsonBuilder.append("}");
	
	response.setContentType("application/json");
	response.getWriter().print(jsonBuilder.toString());
%>
