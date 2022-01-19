export default function User(userInfo) {
    this.name = userInfo.name;
    this.userId = userInfo.userId;
    this.email = userInfo.email;
    this.welcome = function(){
        if(sessionStorage.getItem('currentLogin') != null){
            $('nav').find('#login').css('display', 'none').end().find('#logout').css('display','flex').end().find('#user_id').text(userInfo.userId + "님 반갑습니다.");
            $('#logout_link').click((event) => {
                event.preventDefault();
                sessionStorage.removeItem('currentLogin');
                location.href = 'login.html';
            })
        }
    }
}