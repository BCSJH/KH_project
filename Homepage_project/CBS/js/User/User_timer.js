// const user_use = function(userid, use_date, use_start_time, use_hour, use_pay_sum, use_esc){
//     this.userid = userid;
//     this.use_date = use_date;
//     this.use_start_time = use_start_time;
//     // this.buy_food = buy_food; 
//     this.use_hour = use_hour;
//     this.use_pay_sum = use_pay_sum;
//     this.use_esc = use_esc;
//     // this.pay_chk = pay_chk;
// };
countdown();
//카운트 시간
// function countdown(user_times){
function countdown(){
    console.log("하이");
    const search = parent.location.search;
    const params = new URLSearchParams(search);
    const userid= params.get('userid');
    const chk =get_time(userid); //해당 값이 존재하는지 확인하기 위한 변수
    if(chk !== null){

        let end = new Date(chk);
        // console.log(end);
        console.log(end);
        
        let timer;
        function show(){
            
            let _second = 1000;
            let _minute = _second * 60;
            let _hour = _minute * 60;
            let _day = _hour * 24;
            let now = new Date();
            let distance = end - now;

            // console.log(distance);

            if (distance < 0) {
                clearInterval(timer);

                esc(userid);
                alert("이용시간이 끝났습니다.");
                window.parent.location.assign("../../../index.html");
                
            }else{
                let days = Math.floor(distance / _day);
                let hours = Math.floor((distance % _day) / _hour);
                let minutes = Math.floor((distance % _hour) / _minute);
                let seconds = Math.floor((distance % _minute) / _second);
                
                const a = hours + '시간 ' + minutes + '분 ' + seconds + '초';
                // $(user_times).text(a);
                $('#user_times').text(a);
            }
        }
        timer = setInterval(show, 1000);
        // 참고 https://www.w3schools.com/jsref/met_win_setinterval.asp
    }
}
function get_time(userid){
    const entries = JSON.parse(localStorage.getItem('user_use')) || [];
    const use = entries.find(element => element.userid == userid && element.use_esc !== 1);
    const indexs = entries.indexOf(use);
    // console.log(indexs);
    const count = use == undefined ? 0 : use.length;
    // console.log(count);
    if(count !== 0){
        // console.log("use"+use);
        // console.log(use);
        const use_time = Math.floor(use.use_hour); // 시간
        let use_minutes = (Number(use.use_hour) % 1).toFixed(2) * 60;
        // console.log("use_minutes");
        // console.log(use_minutes);
        // console.log("use_time");
        // console.log(use_time);

        const use_date = use.use_date.split('/');
        const use_start_time = use.use_start_time.split(':');
        // use_start_time : 20:5:27
        
        let m = (Number(use_start_time[1]) + use_minutes);
        let h = (Number(use_start_time[0]) + use_time); // 20
        // console.log("m"+m);
        // console.log("use_time : "+use_time);
        // console.log("use_minutes : "+use_minutes);
        if(m >= 60){ // 3분 단위로 구매시 그냥 더하면 분이 60분을 넘어가는 경우가 발생함 -> 계산하기 전에 분에서 60분을 빼주고 시간에 1시간을 더해준다.
            m = m - 60;
            h = h + 1;
        }
        const pmam = h > 12;
        const start_time = (pmam ? h - 12 : h) 
        + ':' + m + ':' + use_start_time[2] 
        + (pmam ? ' PM' : ' AM') ;
        
        let time = use_date[1]+'/'+use_date[2]+'/'+use_date[0] 
        + ' ' + start_time;
        console.log(time);
        // console.log(time) //use_date: "2021/9/18 ,use_start_time: "13:12:57"
        return time;
    }else{
        return null;
    }
}

function esc(userid){
    const entries = JSON.parse(localStorage.getItem('user_use')) || [];
    // console.log("entries 없애기전");
    // console.log(entries);
    const use = entries.find(element => element.userid == userid && element.use_esc !== 1); //여러개의 값들이 조회.
    // localStorage.removeItem("user_use");
    // console.log("use");
    // console.log(use);
    // console.log("지움 : ");
    const entry = new user_use(userid, use.use_date, use.use_start_time, use.use_hour, use.use_pay_sum, 1);
    
    const indexs = entries.indexOf(use);
    entries.splice(indexs, 1); // 해당 값만 지움
    
    entries.push(entry);
    localStorage.setItem('user_use',JSON.stringify(entries));
}
