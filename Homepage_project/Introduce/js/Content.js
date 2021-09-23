let Info_SideInfo = parent.document.getElementById("Info_SideInfo");
let Info_Content = parent.document.getElementById("Info_Content");
let Info_Header = parent.document.getElementById("Info_Header");

function changes(name){

    one_color(name);// 메뉴 선택한 값 하얗게 만들기
    if(name == "a_Home"){
        fadeIn(Info_SideInfo);
        original_header(Info_Header, Info_Content);
        console.log(Info_Content);
        $(Info_Content).find('iframe').attr('scrolling', 'yes');
        All_display(name);
        $("#hobby").css('display','none');
        // Info_SideInfo.style.display = "block"; // sns 박스 값들 없애기
    }
    else{
        change_header(Info_Header, Info_Content);
        Element_display_none(name);
        
        fadeOut(Info_SideInfo); // sns 박스 값들 없애기
        
    }
    content_show(Info_Content);
}

function func_reaload(){
    parent.location.reload();
}

//Content 보이기
function content_show(Info_Content){
    let Info_Content_child = Info_Content.childNodes[0];
    var a = $(Info_Content_child).contents().find('#Content');
    // console.log($(Info_Content_child).contents().find('#Content'));
    a.css('display','block');
}


// 이전에 색깔이 변화된 아이들은 원래 색깔로 해당 a 태그 값들 조정
function main_color(){
    let menus = document.getElementsByTagName('a'); 
    for(let i = 0; i < menus.length; i++){
        let menu_one = menus.item(i);
        menu_one.style.color = "black";
        menu_one.style.opacity = "0.5";
    }
}

// iframe에 있는 하위 요소에 javascript로 접근하는 방법을 못찾겠어서 결국 jquery 사용
// iframe 하위 요소 접근 참고 : https://doctorson0309.tistory.com/74
// jquery animate 참고 : https://www.codingfactory.net/11820
function change_header(Info_Header, Info_Content) {
    let Header_child = parent.document.getElementById("Info_Header").childNodes[0];
    let div_box = $(Header_child).contents().find('#box div');
    let Info_img = $(Header_child).contents().find('#Info_img');
    div_box.css("display","inline");

    $(Info_Header).animate({
        height : 105
    },1000);

    Info_img.animate({
        width: 90, 
        height: 90
    },950);
    content_small_size(Info_Content);
}

//헤더 
function original_header(Info_Header, Info_Content) {
    let a = parent.document.getElementById("Info_Header").childNodes[0];
    let div_box = $(a).contents().find('#box div');
    let Info_img = $(a).contents().find('#Info_img');
    div_box.css("display","inline");

    Info_img.animate({
        height : 40, 
        width : 40
    },800);
    // Info_img.height(100); // 애니메이션 없이 크기 조절
    // Info_img.width(100);

    $(Info_Header).animate({
        height : 80
    },750);

    content_big_size(Info_Content);

    div_box.css("display","block");
}

function content_small_size(Info_Content){
    $(Info_Content).animate({
        height : 525
    });
}
function content_big_size(Info_Content){
    $(Info_Content).animate({
        height : 530
    });
}
//선택한 값 하얗게 만들고 나머지 메뉴는 투명하게 만들기
function one_color(name){
    main_color(); // 메뉴 색깔 변화
    let menu = document.getElementById(name);
    menu.style.color = "white";
    menu.style.opacity = "1";
}

//메뉴 누른 항목만 보이게 하기
// querySelectorAll 사용해보기
function All_display(name){
    let name_str = name.split('_')[1]; // 클릭한 값의 아이디 받아오기
    if(name_str == "Home"){
        let tage = document.querySelectorAll(".Content");
        for(let i = 0; i < tage.length; i++){
            tage.item(i).style.display = "block";
        }
    }
}

//Content에서 클릭한 값 이외의 항목은 none 처리
//getElementsByClassName 사용해보기
function Element_display_none(name){
    let tage = document.getElementsByClassName('Content');
    let name_str = name.split('_')[1]; // 클릭한 값의 아이디 받아오기
    for(let i = 0; i < tage.length; i++){
        let tage_one = tage.item(i);
        if(tage_one.id == name_str){
            tage_one.style.display = "block";
        }else{
            tage_one.style.display = "none";
        }
    }
}

//서서히 보여주기
function fadeIn(Info_SideInfo){
    $(Info_SideInfo).fadeIn('slow');
    $(Info_SideInfo).animate({
        opacity : "1",
        height : 40
    });
}

function fadeOut(Info_SideInfo){
    $(Info_SideInfo).animate({
        opacity : "0",
        height : 0
    },500);
    Info_SideInfo.style.display = "none";
}
