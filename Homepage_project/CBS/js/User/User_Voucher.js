//아이디, 이용날짜, 이용시작시간(이용권구매시간), 음식구매금액, 지불금액, 이용종료(0/1)
const user_use = function(userid, use_date, use_start_time, use_hour, use_pay_sum, use_esc){
    this.userid = userid;
    this.use_date = use_date;
    this.use_start_time = use_start_time;
    this.use_hour = use_hour;
    this.use_pay_sum = use_pay_sum;
    this.use_esc = use_esc;
};

const pm = (id) => {
    const ids = `#${id.split('_')[0]}_v`;
    if(id.split('_')[1] == 'p'){
        $(ids).text(Number($(ids).text()) + 1);
        pay_sum(id.split('_')[0], 'p');
    }
    else{
        if(!Number($(ids).text()) == 0){
            $(ids).text(Number($(ids).text()) -1);
            pay_sum(id.split('_')[0], 'm')
        }
    };
};

//총 금액, 시간 계산
const pay_sum = (hour, pm) => {
    let hour_pay = 0;
    if(pm == 'p'){
        hour_pay = (hour == 'one'? 3000: (hour == 'two'? 5500: (hour == 'three' ? 8000 : 500)));
        $(`#sum_h`).text((Number($(`#sum_h`).text()) + (hour == 'one'? 1 : (hour == 'two'? 2: (hour == 'three' ? 3 : 0.05)))).toFixed(2));
    }else{
        hour_pay = (hour == 'one'? -3000: (hour == 'two'? -5500: (hour == 'three' ? -8000 : -500)));
        $(`#sum_h`).text((Number($(`#sum_h`).text()) + (hour == 'one'? -1 : (hour == 'two'? -2: (hour == 'three' ? -3 : -0.05)))).toFixed(2));
    }
    $(`#sum_s`).text(Number($(`#sum_s`).text()) + (hour_pay));
} ;

//이용권 구매시 save
const save_check = () => {
    //이용권을 선택하지 않았을 때
    if($(`#sum_s`).text() == 0){
        alert("구매할 이용권을 선택해주세요.");
    }
    else{
        const search = parent.location.search;
        const params = new URLSearchParams(search);
        const userid_href= params.get('userid');

        save_sum_voucher(userid_href, $(`#sum_h`).text(), $(`#sum_s`).text());
        alert("구매가 완료되었습니다.");
        // countdown($("[name = User_Header]", parent.document).contents().find('#user_times'));
        
        // console.log($("[name = User_Header]", parent.document).contents().find('#user_times'));
        parent.location.reload();
    }
}

const save_sum_voucher = (userid, use_hour, use_pay_sum) => {
    const entries = JSON.parse(localStorage.getItem('user_use')) || [];
    const use = entries.find(element => element.userid == userid && element.use_esc !== 1); //여러개의 값들이 조회.

    if(use == null){
        console.log(use);
        let currentTime = new Date();
        let year = currentTime.getFullYear(); // 년도
        let month = currentTime.getMonth() + 1;  // 월
        let date = currentTime.getDate();  // 날짜

        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();
        let second = currentTime.getSeconds();
        
        let use_date = year+"/"+month +"/"+date;
        let use_start_time = hour+":"+minute+":"+second;

        const entry = new user_use(userid, use_date, use_start_time, Number(use_hour).toFixed(2), Number(use_pay_sum), 0);
        entries.push(entry);

    }else{ 
        // 결제가 된 요소들이 존재하면 기존 정보 없앤 후, 해당 요소를 삭제하고 다시 넣기
        // localStorage.removeItem("user_use");
        const indexs = entries.indexOf(use);

        entries.splice(indexs, 1); // 해당 값만 지움
        const entry = new user_use(userid, use.use_date, use.use_start_time, (Number(use.use_hour) + Number(use_hour)).toFixed(2), (Number(use.use_pay_sum) + Number(use_pay_sum)), 0);
        entries.push(entry);
    }
    
    localStorage.setItem('user_use',JSON.stringify(entries));
    

};
