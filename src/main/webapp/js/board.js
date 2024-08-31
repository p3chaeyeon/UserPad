// board.js
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

	        // 항상 "글 목록" 항목은 강조 스타일로 유지
	        $('a[href="board.html"]').find('p').css({
	            'color': '#F1AF23',
	            'font-weight': 'bold'
	        });
	    }
	);
		
    $.ajax({
        type: 'GET',
        url: '../jsp/board.jsp', // board.jsp를 호출하여 데이터를 가져옴
        dataType: 'json',
        success: function(data) {
            console.log(JSON.stringify(data));

            // 데이터 배열을 반복하면서 테이블에 행을 추가
            $.each(data.items, function(index, item) {
                let tr = `
                    <tr>
                        <td class="check"><input class="check-size" type="checkbox"/></td>
                        <td class="no">${item.no}</td>
                        <td class="subject">${item.subject}</td>
                        <td class="id">${item.userId}</td>
                        <td class="date">${item.logDate}</td>
                    </tr>`;
                $('tbody').append(tr);
            });
        },
        error: function(e) {
            console.log(e);
        }
    });
});
