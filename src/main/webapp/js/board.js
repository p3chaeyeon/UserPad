$(function() {
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
