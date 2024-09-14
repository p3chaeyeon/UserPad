<%-- Userpad/src/main/webapp/jsp/board.jsp --%>
<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="com.bit.userpad.dao.BoardDAO" %>
<%@ page import="com.bit.userpad.bean.BoardDTO" %>
<%@ page import="com.bit.userpad.bean.BoardPaging" %>

<%
	int pg = 1; // 기본값 설정
	if (request.getParameter("pg") != null) {
	    pg = Integer.parseInt(request.getParameter("pg"));
	}
	
	
	// 1 페이지당 5개씩
	int endNum = pg * 5;
	int startNum = endNum - 4;
	
	// DB
	BoardDAO boardDAO = BoardDAO.getInstance();
	List<BoardDTO> boardList = boardDAO.getAllBoards(startNum, endNum);
	
	// 페이징 처리
	int totalA = boardDAO.getTotalA();
	
	BoardPaging boardPaging = new BoardPaging();
	boardPaging.setCurrentPage(pg);
	boardPaging.setPageBlock(3);
	boardPaging.setPageSize(5);
	boardPaging.setTotalA(totalA);
	
	boardPaging.makePagingHTML();

    // 날짜 포맷 설정
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    // JSON 배열의 시작
    StringBuilder jsonBuilder = new StringBuilder();
    jsonBuilder.append("{\"items\":[");

    // 데이터 리스트를 JSON 문자열로 변환
    if (boardList != null && !boardList.isEmpty()) {
	    for (int i = 0; i < boardList.size(); i++) {
	        BoardDTO board = boardList.get(i);
	        jsonBuilder.append("{")
	                   .append("\"no\":").append(board.getNo()).append(",")
	                   .append("\"subject\":\"").append(board.getSubject().replaceAll("[\\\"]", "\\\\\"")).append("\",")
	                   .append("\"content\":\"").append(board.getContent().replaceAll("[\\\"]", "\\\\\"").replaceAll("[\\n]", "\\\\n")).append("\",")
	                   .append("\"userId\":\"").append(board.getUserId().replaceAll("[\\\"]", "\\\\\"")).append("\",")
	                   .append("\"logDate\":\"").append(sdf.format(board.getLogDate())).append("\"")
	                   .append("}");
	        if (i < boardList.size() - 1) {
	            jsonBuilder.append(",");
	        }
	    }
    }
    
    // JSON 배열의 끝, 출력
    jsonBuilder.append("], \"pagingHtml\":\"").append(boardPaging.getPagingHTML()).append("\"}");
	out.print(jsonBuilder.toString());
%>
