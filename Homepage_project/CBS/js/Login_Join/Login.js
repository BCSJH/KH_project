//로그인 체그
function login(){
    const l = loginData($('#userId'), $('#password'));
    return l;
}

//local에서 데이터 가져와서 아이디 비밀번호 비교
function loginData($id, $pwd){
    const entries = JSON.parse(localStorage.getItem('info_user')) || [];

    for(let a = 0; a < entries.length; a++){
        const userid = entries[a].userid;
        const userpwd = entries[a].password1;

        if((userid == $id.val()) && (userpwd == $pwd.val())){
            // console.log("도착");
            if(entries[a].mu == "user"){
                parent.document.location.href= "../Use/User/Frame/User.html?userid="+userid;
                // $("input[name=login]").attr("action", "../Use/User/Frame/User.html");
            }
            else{
                
                parent.location.href= "../../CBS/Use/Manager/Frame/Manager.html?userid="+userid
                // $("input[name=login]").attr("action", "../Use/Manager/Frame/Manager.html");
            }
            return true;
        }
    }
    alert("존재하지 않는 아이디거나 비밀번호가 일치하지 않습니다.");
    return false;
}
