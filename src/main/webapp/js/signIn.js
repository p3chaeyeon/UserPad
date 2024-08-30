$(document).ready(function() {
    const $idInput = $('.id_input');
    const $pwInput = $('.pw_input');
    const $signUpBtn = $('#signUpBtn');
    const $signInBtn = $('#signInBtn');

    // Sign Up 버튼에 마우스를 올리면 Sign Up 버튼과 Sign In 버튼의 스타일을 변경
    $signUpBtn.hover(
        function() {
            // 마우스가 Sign Up 버튼에 올라왔을 때
            $signUpBtn.css({
                'background-color': '#ffffff',
                'color': '#002C4C',
                'border': '1px solid #002C4C'
            });
            $signInBtn.css({
                'background-color': '#002C4C',
                'color': '#ffffff',
                'border': '1px solid white'
            });
        },
        function() {
            // 마우스가 Sign Up 버튼에서 나왔을 때
            $signUpBtn.css({
                'background-color': '#002C4C',
                'color': '#ffffff',
                'border': '1px solid #ffffff'
            });
            $signInBtn.css({
                'background-color': '#ffffff',
                'color': '#002C4C',
                'border': '1px solid #002C4C'
            });
        }
    );

    // 로그인 폼 제출 시
    $('#join').on('submit', function(event) {
        // auth.js에서 정의된 validateForm 함수 사용
        if (!validateForm($(this))) {
            event.preventDefault(); // 폼 제출 방지
            return; // 함수 종료
        }

        event.preventDefault(); // 기본 폼 제출 동작 방지

        const formData = $(this).serialize(); // 폼 데이터 직렬화

        $.ajax({
            type: 'POST',
            url: '../jsp/signIn.jsp',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    window.location.href = '../html/board.html'; // 성공 시 리다이렉트
                } else {
                    $('.error-container').html(response.message); // 에러 메시지 표시
                    $idInput.val('');
                    $pwInput.val('');
                }
            },
            error: function() {
                $('.error-container').html('서버와의 통신 중 오류가 발생했습니다.');
            }
        });
    });
});
