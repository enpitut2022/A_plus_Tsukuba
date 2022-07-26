window.addEventListener("DOMContentLoaded",init);

function init(){
    const button = document.getElementById("submit_message");
    //送信ボタンに対してクリックイベントを登録
    button.addEventListener("click", makeMessage);

    const list_message = document.getElementById("list_message");

    let id = 1;
    function makeMessage(){
        //フォーム内のメッセージを取得
        let message = document.getElementById("input_message").value;

        // let h2_element = document.createElement("h2");
        // h2_element.textContent = "表題:" + message;
        // let p_element_day = document.createElement("p");
        // p_element_day.textContent = "発行日:" + "aaa";
        let p_message = document.createElement("p");
        let span = document.createElement("span");
        span.textContent = message;
        span.classList.add("message_str");
        p_message.textContent = "id:"+ id;
        p_message.appendChild(span);

        id++;

        //list_messageの最後尾にメッセージを追加する
        //list_message.insertAdjacentElement('beforeend',p_element);
        // list_message.insertAdjacentElement('beforeend',h2_element);
        // list_message.insertAdjacentElement('beforeend',p_element_day);
        list_message.insertAdjacentElement('beforeend',p_message);
    }
}