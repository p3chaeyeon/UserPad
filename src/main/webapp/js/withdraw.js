$(document).ready(function() {
    // 쿠키에서 값을 가져오는 함수
    function getCookie(name) {
        let cookieName = name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    }

    // 페이지가 로드될 때 실행되는 함수
    let userId = getCookie("userId"); // 쿠키에서 사용자 ID 가져오기
    if (userId) {
        document.getElementById("user-id").value = userId; // 가져온 사용자 ID를 input 필드에 넣기
    }

    // 탈퇴 버튼 클릭 시 처리
    $('.withdrawBtn').on('click', function(event) {
        event.preventDefault(); // 기본 폼 제출을 막음

        const password = $('#password').val();
        const confirmChecked = $('#confirm').is(':checked');

        // 유효성 검사
        if (password === '' || !confirmChecked) {
            $('.message-container').html('<p style="color: red; text-align: center; font-size: 18px;">비밀번호를 입력하고, 동의 체크박스를 체크해주세요.</p>');
            return; // 유효성 검사를 통과하지 못하면 요청을 보내지 않음
        }

        // AJAX 요청을 통한 서버 검증 및 탈퇴 처리
        $.ajax({
            url: '../jsp/withdraw.jsp',
            type: 'POST',
            data: {
                userId: userId,
                password: password
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // 쿠키 삭제
                    document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					alert('회원 탈퇴가 완료되었습니다.');
					
                    // 탈퇴 성공 시 페이지 이동
                    window.location.href = '../index.html';
                } else {
                    $('.message-container').html('<p style="color: red; text-align: center; font-size: 18px;">비밀번호가 일치하지 않습니다.</p>');
                }
            },
            error: function() {
                $('.message-container').html('<p style="color: red; text-align: center; font-size: 18px;">탈퇴 처리 중 오류가 발생했습니다.</p>');
            }
        });
    });
});
