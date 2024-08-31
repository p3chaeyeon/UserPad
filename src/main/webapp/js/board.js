$(function() {
    // AJAX 요청을 통해 데이터 로드 및 테이블 업데이트
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
                        <td class="check"><input class="board-list-check" type="checkbox"/></td>
                        <td class="no">${item.no}</td>
                        <td class="subject">
                            <a href="boardDetail.html?no=${item.no}">${item.subject}</a>
                        </td>
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

    // 전체 선택 / 전체 해제 이벤트를 동적으로 바인딩
    $(document).on('change', '#all_check', function() {
        let isChk = $(this).is(':checked');
        console.log(isChk);
        
        // 전체 선택 체크박스 상태에 따라 모든 체크박스 상태 변경
        $('.board-list-check').prop('checked', isChk);
    });

    // 개별 체크박스 상태에 따른 전체 선택 체크박스 상태 업데이트
    $(document).on('change', '.board-list-check', function() {
        let total = $('.board-list-check').length; // 전체 체크박스 수
        let checked = $('.board-list-check:checked').length; // 체크된 체크박스 수

        // 체크된 체크박스 수가 전체 체크박스 수와 같으면 전체 선택 체크박스 체크
        $('#all_check').prop('checked', total === checked);
    });
});
