// editProfile
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

	// 폼 제출 시 유효성 검사
	$('#edit-profile-form').on('submit', function(event) {
	    const currentPassword = $('#user-pw-cur').val();
	    
	    if (currentPassword.trim() === '') {
	        // 현재 비밀번호가 입력되지 않은 경우
	        $('.message-container').html('<p style="color: red; text-align: center; font-size: 18px;">현재 비밀번호를 입력해 주세요.</p>');
	        event.preventDefault(); // 폼 제출 방지
	        return;
	    }
	    

	});		
	
});

