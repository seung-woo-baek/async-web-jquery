(function checkLoggedIn(){
    const userInfo = JSON.parse(sessionStorage.getItem('currentLogin'));
    if(userInfo !== null){
        location.href = "index.html";
    }
})();

(function showSavedData(){
    const form = document.login_form;
    const savedInfo = JSON.parse(localStorage.getItem('savedUser'));
    if(savedInfo !== null){
        form.id.value = savedInfo.userId;
        form.pwd.value = savedInfo.password;
    }
})();

function checkId(form) {
    if (form.id.value == "") {
        alert("아이디를 입력해주세요.");
        return false;
    }

    return true;
}

function checkPassword(form) {
    if (form.pwd.value == "") {
        alert("비밀번호를 입력해주세요.");
        return false;
    }

    return true;
}

$('#submit_btn').click(async function login(){
    const form = document.login_form;
    const userData = await $.get('data/user.json');

    if (!(checkId(form) && checkPassword(form))){
        return;
    }
    let loginMatch = '';
    userData.users.forEach(item => {
        console.log(item);
        if(item.userId === form.id.value && item.password === form.pwd.value){
            sessionStorage.setItem('currentLogin', JSON.stringify(item));
            if(form.save.checked){
                localStorage.setItem('savedUser', JSON.stringify(item));
            }
            loginMatch += 'matched';
        } 
    })

    if(loginMatch === "matched"){
        location.href = 'index.html';
    } else {
        alert("아이디와 비밀번호를 확인해주세요.");
    }
})