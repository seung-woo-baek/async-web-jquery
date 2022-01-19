import User from '/js/module.js';

$(document).ready(() => {
    const user = getUserObj();
    $('.user-name').text(user.name);
    $('.user-id').text(user.userId);
    $('.user-email').text(user.email);

    $("#modal_btn").click(() => $('#modal').css('display', 'flex'));
    $(".modal-close").click(() => $('#modal').css('display', 'none'));
})

function getUserObj(){
    const userInfo = JSON.parse(sessionStorage.getItem('currentLogin'));
    if(checkLoggedIn(userInfo)){
        const user = new User(userInfo);
        return user;
    }
}

function checkNewPwdValid(id, pwd, newPwd){
    const re = /(\d)\1\1/g;
    if(newPwd.indexOf(id) !== -1){
        alert("비밀번호에 아이디가 포함될 수 없습니다.");
        return false;
    }
    if(re.test(newPwd)){
        alert("동일한 숫자를 3번 연속 사용할 수 없습니다.");
        return false;
    }
    if(pwd === newPwd){
        alert("사용하던 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.");
        return false;
    }

    return true;
}


function checkLoggedIn(userInfo){
    if(userInfo === null){
        alert("잘못된 경로입니다. 로그인을 해주세요.");
        location.href = "login.html";
        return false;
    }

    return true;
}

$("#withdraw_btn").click((user) => {
    const url = '';
    const data = {user : user.userId}
    $.post(url, JSON.stringify(data), () => {
        console.log('success');
    })
})

$('#change_password_btn').click(() => {
    const form = document.change_form;
    const user = getUserObj();
    console.log(form.newPassword.value);
    if(checkNewPwdValid(user.userId, form.currentPassword.value, form.newPassword.value)){
        alert("비밀번호 변경이 완료되었습니다.")
    }
    // const data = { 
    //     "userId" : user.userId,
    //     "password" : user.password,
    //     "newPassword" : form.newPassword.value
    // }
    // const url = '';
    // $.post(url, JSON.stringify(data), () => {
    //     console.log('success');
    // })
})