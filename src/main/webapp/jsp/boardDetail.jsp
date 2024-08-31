<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.bit.userpad.dao.BoardDAO" %>
<%@ page import="com.bit.userpad.bean.BoardDTO" %>
<%@ page import="com.bit.userpad.dao.CommentDAO" %>
<%@ page import="com.bit.userpad.bean.CommentDTO" %>

<%
    int postNo = Integer.parseInt(request.getParameter("no"));

    BoardDAO boardDao = BoardDAO.getInstance();
    BoardDTO board = boardDao.getBoardByNo(postNo);

    CommentDAO commentDao = CommentDAO.getInstance();
    List<CommentDTO> comments = commentDao.getCommentsByPostNo(postNo);

    // JSON 문자열 생성
    StringBuilder jsonBuilder = new StringBuilder();
    if (board != null) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        jsonBuilder.append("{")
                   .append("\"no\":").append(board.getNo()).append(",")
                   .append("\"subject\":\"").append(board.getSubject().replaceAll("[\\\"]", "\\\\\"")).append("\",")
                   .append("\"content\":\"").append(board.getContent().replaceAll("[\\\"]", "\\\\\"").replaceAll("\\n", "\\\\n")).append("\",")
                   .append("\"userId\":\"").append(board.getUserId().replaceAll("[\\\"]", "\\\\\"")).append("\",")
                   .append("\"logDate\":\"").append(dateFormat.format(board.getLogDate())).append("\",")
                   .append("\"comments\":["); // 댓글 배열 시작

        for (int i = 0; i < comments.size(); i++) {
            CommentDTO comment = comments.get(i);
            jsonBuilder.append("{")
                       .append("\"userId\":\"").append(comment.getUserId().replaceAll("[\\\"]", "\\\\\"")).append("\",")
                       .append("\"content\":\"").append(comment.getContent().replaceAll("[\\\"]", "\\\\\"").replaceAll("\\n", "\\\\n")).append("\",")
                       .append("\"logDate\":\"").append(dateFormat.format(comment.getLogDate())).append("\"")
                       .append("}");
            if (i < comments.size() - 1) {
                jsonBuilder.append(",");
            }
        }
        
        jsonBuilder.append("]"); // 댓글 배열 끝
        jsonBuilder.append("}");
    } else {
        // 게시물이 존재하지 않는 경우
        jsonBuilder.append("{\"status\":\"error\",\"message\":\"게시물을 찾을 수 없습니다.\"}");
    }
    
    response.setContentType("application/json");
    response.getWriter().print(jsonBuilder.toString());
%>

