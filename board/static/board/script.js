window.addEventListener("DOMContentLoaded",init);

// function init(){
//     const button = document.getElementById("submit_message");
//     //送信ボタンに対してクリックイベントを登録
//     button.addEventListener("click", makeMessage);

//     const list_message = document.getElementById("list_message");

//     let id = 1;
//     function makeMessage(){
//         //フォーム内のメッセージを取得
//         let message = document.getElementById("input_message").value;
//         let name = document.getElementById("input_name").value;

//         let p_message1 = document.createElement("p");
//         let p_message2 = document.createElement("p");
//         // let span = document.createElement("span");
//         // span.textContent = message;
//         // span.classList.add("message_str");
//         p_message1.classList.add("username");
//         p_messafe2.classList.add("content");
//         p_message1.textContent = "名前:"+ name;
//         p_message2.textContent = message;
//         p_message1.appendChild(span);

//         id++;

//         //list_messageの最後尾にメッセージを追加する
//         //list_message.insertAdjacentElement('beforeend',p_element);
//         // list_message.insertAdjacentElement('beforeend',h2_element);
//         // list_message.insertAdjacentElement('beforeend',p_element_day);
//         list_message.insertAdjacentElement('beforeend',p_message1);
//         list_message.insertAdjacentElement('beforeend',p_message2);
//     }
// }