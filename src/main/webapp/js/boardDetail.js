$(function() {
    // 메뉴 항목 hover 스타일 변경
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

	$('#new-comment').on('focus', function() {
	    $(this).attr('data-placeholder', $(this).attr('placeholder'));
	    $(this).attr('placeholder', ''); // placeholder를 빈 문자열로 설정
	}).on('blur', function() {
	    $(this).attr('placeholder', $(this).attr('data-placeholder')); // 원래 placeholder 값으로 복원
	});
	
    // 쿠키에서 사용자 ID를 가져오는 함수
    function getCookie(name) {
        let cookieName = name + "=";
        let cookies = decodeURIComponent(document.cookie).split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    }

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
                if (data && data.no && data.subject && data.userId && data.logDate && data.content) {
                    // 게시물 데이터가 올바른 경우 처리
                    $('#post-title').text(data.subject);
                    $('#post-id').text(data.userId);
                    $('#post-date').text(data.logDate);
                    $('#post-body').html(data.content.replace(/\n/g, '<br>'));

                    // 댓글 처리
                    const $commentList = $('#comment-list');
                    $commentList.empty();
                    if (data.comments && data.comments.length > 0) {
                        data.comments.forEach(comment => {
                            $commentList.append(`
                                <div class="comment">
                                    <div class="list-user-id">${comment.userId}</div>
                                    <div class="list-content">${comment.content ? comment.content.replace(/\n/g, '<br>') : ''}</div>
                                    <div class="list-date">${new Date(comment.logDate).toLocaleDateString()}</div>
                                </div>
                            `);
                        });
                        $commentList.show();
                    } else {
                        $commentList.hide();
                    }

                    // 게시물 작성자 ID와 현재 로그인한 사용자 ID 비교
                    let currentUserId = getCookie("userId");
                    let postOwnerId = data.userId;

                    // 사용자 ID가 게시물 작성자 ID와 같지 않으면 '수정', 삭제' 버튼 숨기기
                    if (currentUserId !== postOwnerId) {
						$('.edit-post-btn').hide();
						$('.del-post-btn').hide();
                    } else {
						$('.edit-post-btn').show();
						$('.del-post-btn').show();
                    }
                } else if (data && data.status === 'error') {
                    // 에러 응답 처리 및 리디렉션
                    console.error("Invalid data format:", data);
                    alert(data.message || '게시물 데이터를 가져오는 데 문제가 발생했습니다.');
                    window.location.href = '../html/board.html'; // 게시물이 없을 때 리디렉션
                } else {
                    // 예상치 못한 응답 처리
                    console.error("Unexpected response:", data);
                    alert('게시물 데이터를 가져오는 데 문제가 발생했습니다.');
                    window.location.href = '../html/board.html'; // 예상치 못한 응답일 때 리디렉션
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX 요청 오류:", status, error);
                alert('게시물 데이터를 가져오는 데 문제가 발생했습니다.');
                window.location.href = '../html/board.html'; // 오류 발생 시 리디렉션
            }
        });

        // 삭제 버튼 클릭 이벤트 핸들러
        $('.del-post-btn').on('click', function() {
            if (confirm('이 게시글을 정말 삭제하시겠습니까?')) {
                $.ajax({
                    type: 'POST',
                    url: '../jsp/boardDelete.jsp',
                    data: {
                        no: postNo // 삭제할 게시글 번호
                    },
                    success: function(response) {
                        try {
                            // 응답이 JSON 객체일 수도 있으니 직접 확인
                            let result;
                            if (typeof response === 'string') {
                                result = JSON.parse(response);
                            } else {
                                result = response;
                            }
                            
                            if (result.status === 'success') {
                                alert('게시글이 삭제되었습니다.');
                                window.location.href = '../html/board.html'; 
                            } else {
                                alert('게시글 삭제에 실패했습니다: ' + result.message);
                            }
                        } catch (e) {
                            console.error("JSON 파싱 오류:", e);
                            alert('응답 데이터를 처리하는 데 문제가 발생했습니다.');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error("AJAX 요청 오류:", status, error);
                        alert('게시글 삭제 요청에 문제가 발생했습니다.');
                    }
                });
            }
        });
    } else {
        console.error("게시물 번호가 URL에 없습니다.");
        alert('게시물 번호가 제공되지 않았습니다.');
        window.location.href = '../html/board.html'; // 게시물 번호가 없을 때 리디렉션
    }
});
