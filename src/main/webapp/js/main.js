// main.js
$(function() {
	$('.menu-list').hover(
	    function() {
	        // 현재 항목 스타일 변경
	        $(this).css({
	            'color': '#F1AF23',
	            'font-weight': 'bold'
	        });

	        // 다른 메뉴 항목들의 스타일 복구
	        $('.menu-list').not(this).css({
	            'color': 'white',
	            'font-weight': 'normal'
	        });
	    },
	    function() {
	        // 현재 항목 스타일 원래대로 복구
	        $(this).css({
	            'color': 'white',
	            'font-weight': 'normal'
	        });

	        // 항상 "글 목록" 항목은 강조 스타일로 유지
	        $('a[href="board.html"]').find('p').css({
	            'color': '#F1AF23',
	            'font-weight': 'bold'
	        });
	    }
	);
});