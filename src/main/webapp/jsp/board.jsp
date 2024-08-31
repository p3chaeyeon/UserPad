<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.bit.userpad.dao.BoardDAO" %>
<%@ page import="com.bit.userpad.bean.BoardDTO" %>

<%
    // 날짜 포맷 설정
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); // 원하는 형식으로 변경 가능

    // 데이터베이스에서 데이터 조회
    BoardDAO dao = BoardDAO.getInstance();
    List<BoardDTO> boardList = dao.getAllBoards();

    // JSON 배열의 시작
    StringBuilder jsonBuilder = new StringBuilder();
    jsonBuilder.append("{\"items\":[");

    // 데이터 리스트를 JSON 문자열로 변환
    for (int i = 0; i < boardList.size(); i++) {
        BoardDTO board = boardList.get(i);
        jsonBuilder.append("{")
                   .append("\"no\":").append(board.getNo()).append(",")
                   .append("\"subject\":\"").append(board.getSubject().replaceAll("[\\\"]", "\\\\\"")).append("\",")
                   .append("\"content\":\"").append(board.getContent().replaceAll("[\\\"]", "\\\\\"").replaceAll("[\\n]", "\\\\n")).append("\",")
                   .append("\"userId\":\"").append(board.getUserId().replaceAll("[\\\"]", "\\\\\"")).append("\",")
                   .append("\"logDate\":\"").append(dateFormat.format(board.getLogDate())).append("\"")
                   .append("}");
        if (i < boardList.size() - 1) {
            jsonBuilder.append(",");
        }
    }
    
    // JSON 배열의 끝
    jsonBuilder.append("]}");

    // JSON 데이터 출력
    response.setContentType("application/json");
    response.getWriter().print(jsonBuilder.toString());
%>
