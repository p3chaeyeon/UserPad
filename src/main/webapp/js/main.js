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
});