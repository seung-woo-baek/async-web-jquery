(function checkLoggedIn(){
    const userInfo = JSON.parse(sessionStorage.getItem('currentLogin'));
    if(userInfo !== null){
        location.href = "index.html";
    }
})();

function checkName(form) {
    if (form.name.value == "") {
        $('#warnning_name').text("필수 입력사항입니다.");
        return false;
    }

    return true;
}

function checkId(form) {
    if (form.id.value == "") {
        $('#warnning_id').text("필수 입력사항입니다.");
        return false;
    }

    return true;
}

function checkPassword(form) {
    if (form.pwd.value == "") {
        $('#warnning_pwd').text("필수 입력사항입니다.");
        return false;
    }

    const password = form.pwd.value;

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(password)) {
        $('#warnning_pwd').text("영문, 숫자, 특수문자(@, $, !, %, *, #, ?, &)를 최소 1자 이상, 최소 8자 이상 사용해주세요.");
        return false;
    } else if (password.search(/\s/) > -1) {
        $('#warnning_pwd').text("공백이 포함될 수 없습니다.");
        return false;
    }

    return true;
}

function checkPasswordConfirm(form) {
    if (form.pwd_conf.value == "") {
        $('#warnning_pwd_conf').text("필수 입력사항입니다.");
        return false;
    }

    if (form.pwd.value !== form.pwd_conf.value) {
        $('#warnning_pwd_conf').text("패스워드가 일치하지 않습니다.");
        return false;
    }

    return true;
}

function checkEmail(form) {
    if (form.email.value == "") {
        $('#warnning_email').text("필수 입력사항입니다.");
        return false;
    }

    const emailForm = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (emailForm.test(form.email.value) === false){
        $('#warnning_email').text("이메일 형식이 잘못되었습니다.");
        return false;
    }

    return true;
}

function checkDuplication() {
    const form = document.signup_form;
    const existUsers = Object.keys(localStorage);
    let cntDuplication = 0;

    for(let i = 0; i < existUsers.length; i++){
        const key = existUsers[i];
        const userInfo = JSON.parse(localStorage[key]);
        if(userInfo.userId == form.id.value){
            $('#warnning_id').text("중복된 아이디가 있습니다.").css("color", "red");
            cntDuplication = 0;
            return cntDuplication;
        } else if(form.id.value == "") {
            $('#warnning_id').text("아이디를 입력해주세요.");
        }else {
            $('#warnning_id').text("사용 가능한 아이디입니다.").css("color", "#1a73e8");
            cntDuplication++;
        }
    }

    return cntDuplication;
}
let clickCnt = 0;
$('.duplication-btn').click(checkDuplication).click(() => {
    clickCnt++;
});

function checkAllValue(form){
    let cntCheckedValue = 0;

    if (checkName(form)){
        $('#warnning_name').text("");
        cntCheckedValue++;
    }
    if (checkId(form)){
        $('#warnning_id').text("");
        cntCheckedValue++;
    }
    if (checkPassword(form)){
        $('#warnning_pwd').text("");
        cntCheckedValue++;
    }
    if (checkPasswordConfirm(form)){
        $('#warnning_pwd_conf').text("");
        cntCheckedValue++;
    }
    if (checkEmail(form)){
        $('#warnning_email').text("");
        cntCheckedValue++;
    }

    return cntCheckedValue;
}

function makeUserData(form){
    param = {
        "idx" : localStorage.length+1,
        "name" : form.name.value,
        "userId" : form.id.value,
        "password" : form.pwd.value,
        "email" : form.email.value
    }

    return param;
}

$('#submit_btn').click(() => {
    const form = document.signup_form;
    const obj = makeUserData(form);
    const cntDuplication = checkDuplication();
    const cntCheckedValue = checkAllValue(form);
    if (clickCnt === 0 && form.id.value !== "") {
        $('#warnning_id').text("중복 검사를 해주세요.").css("color", "red");
    }
    if (cntCheckedValue === 5 && cntDuplication > 0) {
        $('.main-container').css("display", "none");
        $('.signup-complete-box').css("display", "flex");
        localStorage.setItem(obj.idx, JSON.stringify(obj));
    }
})