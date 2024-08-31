// boardDetail.js

$(function() {
    // URL에서 'no' 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postNo = urlParams.get('no');
	
    if (postNo) {
        // AJAX 요청을 통해 게시물의 상세 데이터 가져오기
        $.ajax({
            type: 'GET',
            url: `../jsp/boardDetail.jsp?no=${postNo}`, // 특정 게시물의 데이터를 가져옴
            dataType: 'json',
            success: function(data) {
                console.log(JSON.stringify(data));

                // 데이터를 해당 HTML 요소에 삽입
                $('#post-title').text(data.subject);
                $('#post-id').text(data.userId);
                $('#post-date').text(data.logDate);
                $('#post-body').text(data.content);
            },
            error: function(e) {
                console.log(e);
            }
        });
    } else {
        console.error("게시물 번호가 URL에 없습니다.");
    }
	
	$('.menu-list').hover(
	    function() { // 마우스를 올렸을 때
	        $(this).css({
	            'color': '#F1AF23',
	            'font-weight': 'bold'
	        });
	    },
	    function() { // 마우스를 치웠을 때
	        $(this).css({
	            'color': 'white',
	            'font-weight': 'normal'
	        });
	    }
	);
});
