// auth.js
$(document).ready(function() {
    $('input').each(function() {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).data('placeholderColor', $(this).css('color'));

        // 입력창에 포커스가 생기면 플레이스홀더 지우기
        $(this).focus(function() {
            $(this).attr('placeholder', ''); 
            $(this).css('color', '');
        });

        // 입력창에서 문자를 지우거나 입력하지 않으면 원래 플레이스홀더 복원
        $(this).on('input', function() {
            if ($(this).val().trim() === '') {
                $(this).attr('placeholder', $(this).data('placeholder')); 
                $(this).addClass('error-placeholder'); 
            } else {
                $(this).removeClass('error-placeholder'); 
            }
        });

        // 포커스가 벗어났을 때 입력값이 없다면 플레이스홀더 복원
        $(this).blur(function() {
            if ($(this).val().trim() === '') {
                $(this).attr('placeholder', $(this).data('placeholder')); 
                $(this).addClass('error-placeholder'); 
            }
        });
    });

    // validateForm 함수 정의 (전체 폼 유효성 검사, 이 함수는 submit 시에만 호출됨)
    window.validateForm = function($form) {
        let valid = true;
        let errorMessage = "";

        $form.find('input').each(function() {
            const value = $(this).val().trim();
            const placeholder = $(this).data('placeholder');
            let isValid = true;

            if (value === '') {
                isValid = false;
                $(this).attr('placeholder', placeholder); 
                $(this).addClass('error-placeholder'); 
            } else {
                $(this).removeClass('error-placeholder'); 
            }

            if (!isValid) {
                valid = false;
            }
        });

        if (!valid) {
            errorMessage = "모든 필드를 정확히 입력해 주세요.";
            $('.error-container').html(errorMessage); // 에러 메시지 표시
        }
        
        return valid;
    };
});
