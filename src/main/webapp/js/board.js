// Userpad/src/main/webapp/js/board.js
const cache = {}; // 페이지별 캐시

function loadBoardData(page) {
    if (cache[page]) {
        updateBoardTable(cache[page]);
        return;
    }
    $.ajax({
        type: 'GET',
        url: '../jsp/board.jsp',
		data: { pg: page }, // 페이지 번호를 쿼리 파라미터로 전달
        dataType: 'json',
        success: function(data) {
            console.log("AJAX 요청 성공:", data); // 데이터 출력 확인
			cache[page] = data; // 페이지 데이터를 캐시에 저장
			updateBoardTable(data);
		},	
		error: function(xhr, status, error) {
		    console.log("AJAX 요청 오류:", status, error);
		    console.log("응답 텍스트:", xhr.responseText);
		}
	});	
}

function updateBoardTable(data) {
	$('#boardTableBody').empty(); // 기존 테이블 내용 삭제

    if (data.items && data.items.length > 0) {
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
            $('#boardTableBody').append(tr);
        });
    } else {
        console.log("No items found in response.");
    }
	
	$('#page-block').html(data.pagingHtml);
}


// 페이지 초기 로드
$(document).ready(function() {
    let urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get('pg');
    if (!page) {
        page = 1; // 기본 페이지 번호
    }
    loadBoardData(page);
});
	
// 전체 선택 / 전체 해제 이벤트를 동적으로 바인딩
$(document).on('change', '#all_check', function() {
    let isChk = $(this).is(':checked');
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

// 페이지 버튼 클릭 시 페이지 변경
$(document).on('click', '.page-button', function() {
    let page = $(this).data('page'); // 버튼의 data-page 속성 값으로 페이지 번호를 가져옴
    loadBoardData(page);
});

function boardPaging(pg){
    location.href = "board.html?pg=" + pg;
}
