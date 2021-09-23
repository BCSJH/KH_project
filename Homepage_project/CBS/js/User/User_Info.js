window.onload = function(){
    //로딩될때
    info_check(uerid_fnc());
};
function uerid_fnc(){
    const search = parent.location.search
    const params = new URLSearchParams(search);
    const userid_href= params.get('userid');
    return userid_href;
}
const info_check = (userid) => {
    const entries = JSON.parse(localStorage.getItem('info_user')) || [];
    const info = entries.find(element => element.userid == userid);
    // console.log(info);
    info_print(info);
};

const info_print = (info) => {
    $('tr#userid').append(`<td>: ${info.userid}</td>`); 
    // console.log(info.password1.length);
    $('tr#password1 td#two').after(`<td>: ${'•'.repeat(info.password1.length)}</td>`); 
    $('tr#username').append(`<td>: ${info.username}</td>`); 
    $('tr#phone').append(`<td>: ${info.phone}</td>`); 
    $('tr#reg_Date').append(`<td>: ${info.reg_Date}</td>`); 
    $('tr#email').append(`<td>: ${info.email}</td>`); 
};

function pwd_change(){
    $('#password1').children()[1].remove();
    $('#pwd').css('visibility','hidden');
    $('tr#password1 td#two').after(`<td>: <input type="password" id ="password_ch1"></td>`);
    $('tr#password1').after(`<tr><td></td><td>: <input type="password" id ="password_ch2"></td><td><input type="button" id ="password_ch_btn" value = "변경" onclick="password_ch_fnc();"></td></tr>`);
}

function password_ch_fnc(){
    let pwdReg = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/g;
    const pwd1 = $('#password_ch1');
    const pwd2 = $('#password_ch2');
    if(!pwdReg.test(pwd1.val())){
        alert('숫자/문자/특수문자가 포함된 8-15자리 이내의 암호로 구성되어야 합니다.');
    }else if(pwd1.val() !== pwd2.val()){
        alert('비밀번호가 일치하지 않습니다.');
    }else{
        const entries = JSON.parse(localStorage.getItem('info_user')) || [];
        const entry = entries.find(element => element.userid == uerid_fnc());
        const indexs = entries.indexOf(entry);
        entry.password1 = pwd1.val();
        entries.splice(indexs, 1); // 해당 값만 지움
        entries.push(entry);
        localStorage.setItem('info_user',JSON.stringify(entries));
        alert('변경되었습니다.');
        location.reload();
    }
}