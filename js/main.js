import User from '/js/module.js'

$(document).ready(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('currentLogin'));
    if (userInfo !== null){
        const user = new User(userInfo);
        user.welcome();
    }
})