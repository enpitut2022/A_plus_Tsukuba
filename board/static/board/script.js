window.addEventListener("load",init);

function init(){
    const button = document.getElementById("submit_message");
    let emotion = document.getElementsByClassName("emotion_class");
    const emotion_length = emotion.length;
    const array = new Array(emotion_length) /*array is emotion array*/ 
    for (let i = 0; i < emotion_length; i++) {
        array[i] = emotion[i];
    }
    
    for (let i = 0; i < emotion_length; i++){
        let emotion_str = array[i].textContent;       
        /*
        <select name="emotion_type">
                    <option value="0">非常事態(´•_•; )</option>
                    <option value="1">じっくり(-ω-;)ｳｰﾝ</option>
                    <option value="2">助かった(*´▽`人)</option>
                    <option value="3">提案(^^)/~~~</option>
                    <option value="4">よしよし('ω')</option>
                    <option value="5">大丈夫？( *´艸｀)</option>
                </select>
                */
        
        if(emotion_str == "非常事態(´•_•; )"){
            array[i].className = "emergency"
        }else if(emotion_str == "じっくり(-ω-;)ｳｰﾝ"){
            array[i].className = "zikkuri"
        }else if(emotion_str == "助かった(*´▽`人)"){
            array[i].className = "tasukatta"
        }else if(emotion_str == "提案(^^)/~~~"){
            array[i].className = "teian"
        }else if(emotion_str == "よしよし('ω')"){
            array[i].className = "yoshiyoshi"
        }else{
            array[i].className = "daijoubu"
        }
    }

    const thread_value = document.getElementById("threadID").value;
    const all_thread = document.getElementsByClassName("side_url"); /*all_thread is array*/

    for(let i = 0; i < all_thread.length; i++){
        console.log(all_thread[i].dataset.id);
        
        if(all_thread[i].dataset.id === thread_value){
            all_thread[i].classList.add("now_url");
        }
    }

    
    
    // button.addEventListener("click",function(){
    //     const message = document.getElementById("message").value;
    
    // //送信ボタンに対してクリックイベントを登録
    // button.addEventListener("click", makeMessage);

    // const list_message = document.getElementById("list_message");

    // let id = 1;
    // function makeMessage(){
    //     //フォーム内のメッセージを取得
    //     let message = document.getElementById("input_message").value;
    //     let name = document.getElementById("input_name").value;

    //     let p_message1 = document.createElement("p");
    //     let p_message2 = document.createElement("p");
    //     // let span = document.createElement("span");
    //     // span.textContent = message;
    //     // span.classList.add("message_str");
    //     p_message1.classList.add("username");
    //     p_messafe2.classList.add("content");
    //     p_message1.textContent = "名前:"+ name;
    //     p_message2.textContent = message;
    //     p_message1.appendChild(span);

    //     id++;

    //     //list_messageの最後尾にメッセージを追加する
    //     //list_message.insertAdjacentElement('beforeend',p_element);
    //     // list_message.insertAdjacentElement('beforeend',h2_element);
    //     // list_message.insertAdjacentElement('beforeend',p_element_day);
    //     list_message.insertAdjacentElement('beforeend',p_message1);
    //     list_message.insertAdjacentElement('beforeend',p_message2);
    // }
}