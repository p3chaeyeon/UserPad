// boardPost.js
$(function() {
    $('#post-form').on('submit', function(event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        const title = $('#post-title').val().trim();
        const content = $('#post-content').val().trim();

        // 유효성 검사: 제목 또는 내용이 비어 있으면
        if (title === '' || content === '') {
            // 오류 메시지 표시
            $('.message-container').html('<p style="color: red; text-align: center; font-size: 18px;">제목과 내용은 필수 입력 항목입니다.</p>');
        } else {
            // AJAX 요청으로 폼 데이터 전송
            $.ajax({
                type: 'POST',
                url: '../jsp/boardPost.jsp',
                dataType: 'json',
                data: {
                    subject: title,
                    content: content
                },
                success: function(response) {
                    if (response.success) {
                        window.location.href = 'board.html'; // 게시물 추가 후 목록 페이지로 이동
                    } else {
                        $('.message-container').html('<p style="color: red; text-align: center; font-size: 18px;">게시물 작성 중 오류가 발생했습니다.</p>');
                    }
                },
                error: function() {
                    $('.message-container').html('<p style="color: red; text-align: center; font-size: 18px;">서버 오류가 발생했습니다.</p>');
                }
            });
        }
    });

    // 제목 입력란을 클릭하면 오류 메시지 사라지기
    $('#post-title').on('focus', function() {
        $('.message-container').html('');
    });

    // 내용 입력란을 클릭하면 오류 메시지 사라지기
    $('#post-content').on('focus', function() {
        $('.message-container').html('');
    });
});