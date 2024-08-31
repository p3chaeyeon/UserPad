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

            // 현재 페이지 클래스에 맞는 링크 스타일 변경
            if ($('body').hasClass('board-post')) {
                $('a[href="boardPost.html"]').find('p').css({
                    'color': '#F1AF23',
                    'font-weight': 'bold'
                });
            } else if ($('body').hasClass('edit-profile')) {
                $('a[href="editProfile.html"]').find('p').css({
                    'color': '#F1AF23',
                    'font-weight': 'bold'
                });
            } else if ($('body').hasClass('withdraw')) {
                $('a[href="withdraw.html"]').find('p').css({
                    'color': '#F1AF23',
                    'font-weight': 'bold'
                });
            } else {
                $('a[href="board.html"]').find('p').css({
                    'color': '#F1AF23',
                    'font-weight': 'bold'
                });
            }
        }
    );
	
	// 쿠키에서 사용자 이름 읽기
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

	// 로그인한 사용자의 이름을 span 요소에 표시
	let userName = getCookie("userName");
	if (userName) {
	    $('#user-name').text(userName);
	} else {
	    $('#user-name').text("사용자"); // 이름이 없을 때 기본 텍스트
	}
	
	// 로그아웃 버튼 클릭 시 쿠키 삭제 및 페이지 이동
	$('.logOutBtn').on('click', function() {
	    // 쿠키 삭제
		document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	    
	    // 로그아웃 후 페이지 이동
	    window.location.href = '../index.html'; // 로그아웃 후 이동할 페이지
	});
});