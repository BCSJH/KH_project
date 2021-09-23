
window.onload=function(){
    //실행할 내용
    user_today_prints();
    user_today_food_prints();
}

function user_today_food_prints(){
    const entries = JSON.parse(localStorage.getItem('food_order')) || [];
    // food: [{food_id: "콜라", food_num: "1", food_price: "1500"},…]
    //         0: {food_id: "콜라", food_num: "1", food_price: "1500"}
    //         1: {food_id: "아이스티", food_num: "1", food_price: "2500"}
    //         2: {food_id: "아메리카노", food_num: "1", food_price: "2000"}
    //         3: {food_id: "피자", food_num: "1", food_price: "3500"}
    //         4: {food_id: "떡볶이", food_num: "1", food_price: "2500"}
    //         5: {food_id: "라면", food_num: "2", food_price: "6000"}
    // use_date: "2021/9/20"
    // use_time: "16:11:14"
    let food_indexs = [0,0,0,0,0,0];
    let sum = 0;
    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    const today_ = year + "/" +month + "/" + date;// 2021/9/18
    
    const use = entries.filter(element => element.use_date == today_);

    $(use).each(function(index, item){
        console.log(item);
        $(item.food).each(function(food_index, food_item){
            if(food_item.food_id == "라면"){
                food_indexs[0] += Number(food_item.food_num);
            }else if(food_item.food_id == "떡볶이"){
                food_indexs[1] += Number(food_item.food_num);
            }else if(food_item.food_id == "피자"){
                food_indexs[2] += Number(food_item.food_num);
            }else if(food_item.food_id == "아메리카노"){
                food_indexs[3] += Number(food_item.food_num);
            }else if(food_item.food_id == "아이스티"){
                food_indexs[4] += Number(food_item.food_num);
            }else if(food_item.food_id == "콜라"){
                food_indexs[5] += Number(food_item.food_num);
            }
            sum += Number(food_item.food_price );
        });
    });
    $("#user_today_food_print tfoot").append(`<tr><td>${food_indexs[0]}개</td><td>${food_indexs[1]}개</td><td>${food_indexs[2]}개</td><td>${food_indexs[3]}개</td><td>${food_indexs[4]}개</td><td>${food_indexs[5]}개</td><td>${sum}원</td></tr>`);

}

function user_today_prints(){
    const entries = JSON.parse(localStorage.getItem('user_use')) || [];
    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    const today_ = year + "/" +month + "/" + date;// 2021/9/18
    const use = entries.filter(element => element.use_date == today_);
    let sum_price = 0;
    let sum_hour = 0;
    
    $(use).each((index, entry) => {
        const use_hour = entry.use_hour * 60;
        sum_price += Number(entry.use_pay_sum);
        sum_hour += Math.round(use_hour,2);
        const sum_o = `<tr><td></td><td>${entry.userid}</td><td>${sum_hour}분</td><td>${entry.use_pay_sum}원</td></tr>`
        $('#user_today_print tfoot').append(sum_o);
    });
    const sum_o = `<tr><td>${today_}</td><td></td><td>${sum_hour}분</td><td>${sum_price}원</td></tr>`
    $('#user_today_print tfoot').prepend(sum_o);
}