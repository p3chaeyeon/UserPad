// widhdraw.js


// 탈퇴 버튼 클릭 시 쿠키 삭제 및 페이지 이동
$('.withdrawBtn').on('click', function() {
    // 쿠키 삭제
	document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 탈퇴 후 페이지 이동
    window.location.href = '../index.html';
});