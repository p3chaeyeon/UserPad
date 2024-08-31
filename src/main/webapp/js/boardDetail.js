// boardDetail.js
$(function() {
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
	
    // URL에서 'no' 파라미터 가져오기
	const urlParams = new URLSearchParams(window.location.search);
	const postNo = urlParams.get('no');
    
    if (postNo) {
        // AJAX 요청 - 게시물 데이터 및 댓글 데이터
        $.ajax({
            type: 'GET',
            url: `../jsp/boardDetail.jsp?no=${postNo}`,
            dataType: 'json',
            success: function(data) {
                $('#post-title').text(data.subject);
                $('#post-id').text(data.userId);
                $('#post-date').text(data.logDate);
                $('#post-body').html(data.content.replace(/\n/g, '<br>')); // 줄 바꿈을 <br>로 변환

                const $commentList = $('#comment-list');
                $commentList.empty();
                if (data.comments.length > 0) {
                    data.comments.forEach(comment => {
                        $commentList.append(`
                            <div class="comment">
                                <div class="list-user-id">${comment.userId}</div>
                                <div class="list-content">${comment.content.replace(/\n/g, '<br>')}</div> <!-- 줄 바꿈을 <br>로 변환 -->
                                <div class="list-date">${new Date(comment.logDate).toLocaleDateString()}</div>
                            </div>
                        `);
                    });
                    $commentList.show();
                } else {
                    $commentList.hide();
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
    } else {
        console.error("게시물 번호가 URL에 없습니다.");
    }
});