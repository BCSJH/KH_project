const user = function(userid, password1, username, phone, email, reg_Date, mu){
    this.userid = userid;
    this.password1 = password1;
    this.username = username;
    this.phone = phone; 
    this.email = email;
    this.reg_Date = reg_Date;
    this.mu = mu;
};


//새로고침
function func_reaload(){
    parent.location.reload();
}


//비밀번호 일치 체크
const pwdck = (password1, password2) => {
    let pwd_msg =password2.id + '_msg';
    if((password1.value != password2.value)){
        document.getElementById(pwd_msg).innerHTML = "비밀번호가 일치하지 않습니다.";
    }
};

//이메일 주소 체크
const email_check = (email) => {
    let a = email.id + "_msg";
    if((email.value).includes('@') && (email.value).includes('.')){
        document.getElementById(a).innerHTML = "";
    }
    else{
        document.getElementById(a).innerHTML = "이메일 주소를 다시 확인해주세요.";
    }
}

//입력 태그 체크
const info_space_check = (joinform) => {
    let check =  joinform.getElementsByTagName("input");
    for(let info = 0; info < 6; info++){
        join_info_check(check[info]);
    }
}

//입력 체크
const join_info_check = (info) => {
    const idReg = /[a-zA-Z0-9]{5,19}/g;
    const phoneReg = /[0][1][(0-9)]{8,9}$/;
    const pwdReg = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/g;
    const infomsg = info.id + '_msg';

    let password1 = document.getElementById("password1");
    if(info.value == ""){
        if(info.id !== "email"){
            document.getElementById(infomsg).innerHTML = "필수 정보입니다.";
        }else{ // email
            document.getElementById(infomsg).innerHTML = "";
        }
    }else{// 뭔가 입력이 되어있다면.
        if(info.id == "userid"){
            if(!idReg.test(info.value))
                document.getElementById(infomsg).innerHTML = "5~20자의 영문, 숫자만 사용 가능합니다.";
            else if(!id_check(info.value)){
                document.getElementById(infomsg).innerHTML = "이미 존재하는 아이디입니다.";
            }else{
                document.getElementById(infomsg).innerHTML = "";
            }    
        }else if(info.id == "password1" && !pwdReg.test(info.value)){
            document.getElementById(infomsg).innerHTML = "숫자/문자/특수문자가 포함된 8-15자리 이내의 암호로 구성되어야 합니다.";
        }else if(info.id == "password2" && password1.value != info.value){
            document.getElementById(infomsg).innerHTML = "비밀번호가 일치하지 않습니다.";
        }else if(info.id == "phone" && !phoneReg.test(info.value)){
            document.getElementById(infomsg).innerHTML = "전화번호를 확인해주세요.";
        }else if(info.id == "email"){
            if(!((email.value).includes('@') && (email.value).includes('.'))){
                document.getElementById(infomsg).innerHTML = "이메일 주소를 다시 확인해주세요.";
            }else{
                document.getElementById(infomsg).innerHTML = "";
            }
        }else if(info.id != "email"){
            document.getElementById(infomsg).innerHTML = "";
        }
    }
}

function id_check(chk_id){
    //값 불러오기
    const entries = JSON.parse(localStorage.getItem('info_user')) || [];
    for(let i = 0; i < entries.length; i++){
        const userid = $(entries)[i].userid;
        if(chk_id == userid){
            return false;
        }
    }
    return true;
};

const info_save = (joinform) => {
    //1. localStorage에 저장
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    const entry = new user(joinform.userid.value, joinform.password1.value, joinform.username.value, joinform.phone.value, joinform.email.value, year+"/"+month +"/"+date ,'user');


    const entries = JSON.parse(localStorage.getItem('info_user')) || [];
    entries.push(entry);

    localStorage.setItem('info_user',JSON.stringify(entries));

};



function join(joinform){
    // console.log("도착");
    // console.log(joinform);
    // console.log(joinform.new_userId.value);
    // console.log(joinform);

    // pwdck(joinform.password1, joinform.password2); // 비밀번호 확인
    info_space_check(joinform); // 입력 공백 체크
    // info_join_success(joinform);
}