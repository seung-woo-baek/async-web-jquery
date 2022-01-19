function getPostData() {
    const form = document.notice_form;
    let contentValue = form.notice_write_content.value;
    contentValue = contentValue.replace(/(\n|\r\n)/g, '<br/>')
    const post = `title=${form.notice_title.value}&cont123=${contentValue}`
    
    return post;
}

function checkEmpty(){
    const form = document.notice_form;
    if(form.notice_title.value == '' || form.notice_write_content.value == ''){
        alert("제목과 내용은 필수 입력 사항입니다.");
        return false;
    }

    return true;
}

$('#write_btn').click(() => {
    const data = getPostData();
    const url = `http://172.16.11.230/data/?ct=Data&at=insertbbs`;
    if(checkEmpty()){
        $.ajax({
            type: 'POST',
            url : url,
            async: false,
            data : data,
            dataType : 'text',
            complete: res => console.log(res),
            success: res => console.log(res),
            error: err => console.log(err)
        })
        .done(res => {
            if(res === "True"){
                alert("등록되었습니다.")
                location.href = "notice.html";
            }
        })
        .fail(err => {
            console.log(err);
            alert('등록에 실패했습니다.');
        });
    }
})