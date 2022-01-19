$(document).ready(() => {
    const url = `http://172.16.11.230/data/?ct=Data&at=listbbs&per=0&on1=10`;
    
    $.get(url, 'json')
        .done(res => {
            res.forEach(item => {
                try{
                    const idx =res.indexOf(item);
                    if(res.length > 0){
                        addBoardList(item, idx);
                    } else {
                        addEmptyBoardList();
                    }
                    $(`#no${item.boardseq}`).click(() => {
                        location.href = `notice_view.html?id=${item.boardseq}`;
                    });
                } catch(error) {
                    console.log(error);
                }
                
            })
        })
});

(function checkLoggedIn(){
    const userInfo = JSON.parse(sessionStorage.getItem('currentLogin'));
    if(userInfo === null){
        $('.to_write_notice').click(event => {
            event.preventDefault();
            alert("로그인 후 이용해주세요.");
        })
    }
})();

function addBoardList(item, idx){
    $(`.board-item:nth-child(${idx + 2})`).attr('id', `no${item.boardseq}`);
    $(`.board-item:nth-child(${idx + 2}) .notice-idx`).html(item.boardseq);
    $(`.board-item:nth-child(${idx + 2}) .notice-title`).html(item.subject);
    $(`.board-item:nth-child(${idx + 2}) .notice-reg`).html(item.regday);
    $(`.board-item:nth-child(${idx + 2}) .notice-readcnt`).html(item.readcnt);
}

function addEmptyBoardList(){
    $('.board-items').append(`<li class="board-empty">
        <p>등록된 공지사항이 없습니다.</p>
    </li>`);
}