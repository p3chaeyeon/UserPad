// signUp.js
$(document).ready(function() {
    const $idInput = $('.id_input');
    const $idCheck = $('#id-check');
    const $form = $('#join');
    const $errorContainer = $('.error-container');
    const $signUpBtn = $('#signUpBtn');
    const $signInBtn = $('#signInBtn');
    const $inputBox = $idInput.closest('.input-box'); // id_input 요소의 부모 요소인 .input-box를 선택

    let isIdAvailable = false;
    let typingTimer;                
    const typingInterval = 300;     

    // Sign In 버튼에 마우스를 올리면 Sign Up 버튼과 Sign In 버튼의 스타일을 변경
    $signInBtn.hover(
        function() {
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
        },
        function() {
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
        }
    );

    // 아이디 입력 내용이 변경될 때 실시간으로 중복 체크
    $idInput.on('input', function() {
        clearTimeout(typingTimer);  
        const userId = $(this).val().trim();

        if (userId === '') {
            $idCheck.text(''); 
            isIdAvailable = false;
            $inputBox.css('margin-bottom', ''); 
            return;
        }

        // 타이머 설정하여 사용자가 입력을 멈춘 후 AJAX 요청 실행
        typingTimer = setTimeout(function() {
            $.ajax({
                type: 'POST',
                url: '../jsp/signUp.jsp',
                data: { user_id: userId, action: 'checkId' },
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'available') {
                        $idCheck.text(response.message).css('color', 'green');
                        isIdAvailable = true;
                    } else {
                        $idCheck.text(response.message).css('color', 'red');
                        isIdAvailable = false;
                    }
                    $inputBox.css('margin-bottom', '30px'); // 중복 체크 메시지가 있을 때 간격 증가
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error:", status, error); 
                    $idCheck.text('서버와의 통신 중 오류가 발생했습니다.').css('color', 'red');
                    isIdAvailable = false;
                    $inputBox.css('margin-bottom', '30px'); // 중복 체크 메시지가 있을 때 간격 증가
                }
            });
        }, typingInterval);
    });

    // 회원가입 폼 제출 처리
    $form.submit(function(event) {
        event.preventDefault(); 

        // 제출 시에만 전체 폼 유효성 검사 및 에러 메시지 표시
        if (validateForm($form) && isIdAvailable) {
            const formData = $(this).serialize() + '&action=signUp'; 

            $.ajax({
                type: 'POST',
                url: '../jsp/signUp.jsp',
                data: formData,
                dataType: 'json',
                success: function(response) {
                    if (response.status === 'success') {
                        window.location.href = '../html/signIn.html'; 
                    } else {
                        $errorContainer.html(response.message).addClass('error-container'); 
                    }
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error:", status, error); 
                    $errorContainer.html('서버와의 통신 중 오류가 발생했습니다.').addClass('error-container'); 
                }
            });
        } else {
            $errorContainer.html('모든 필드를 정확히 입력해 주세요.').addClass('error-container'); 
        }
    });

	// 초기화 버튼 클릭 시 동작 처리
	$('input[type="reset"]').on('click', function() {
	    // 각 입력창의 placeholder 복원 및 텍스트 색상 복원
	    $('input').each(function() {
	        $(this).attr('placeholder', $(this).data('placeholder'));
	        $(this).css('color', $(this).data('placeholderColor'));
	        $(this).removeClass('error-placeholder'); // 에러 스타일 제거
	    });

	    // 아이디 체크 메시지 제거
	    $idCheck.text('');
	});
});
