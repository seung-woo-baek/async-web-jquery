$(document).ready(() => {
    const search = location.search;
    const param = new URLSearchParams(search);
    const getId = param.get('id');

    let url = `http://172.16.11.230/data/?ct=Data&at=viewbbs&id=${getId}`
    $.get(url)
        .done(res => $('.notice-contents')
            .find('#post_title').text(res.Subject).end()
            .find('#post_content').html(res.Contents).end()
            .find('#post_reg').text(res.RegDay).end()
            .find('#post_readcnt').text(res.ReadCnt))
        .fail(error => {
            alert("통신에 오류가 발생했습니다.")
            console.log(error);
        })
})