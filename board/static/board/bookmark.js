// Vue.createApp({
//     delimiters: ['[[', ']]'],
//     data() {
//         return {
//             agree: true
//         };
//     }
// }).mount('#app');

// const bookmark_toggle = new Vue({
//         el: '#bookmark_toggle',
//         data: {
//                 checked: false,
//                 thread_id: document.getElementById('thread_num').value,
//                 thread_title: document.getElementById('thread_title').value,
//         },
//         delimiters: ['[[', ']]'],
//         methods: {
//             loadbookmark() {
//                 const bookmark_key = "bookmark";
//                 const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す                
//                 let bookmark_json = {};
//                 if(bookmark_value){
//                         bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
//                 }
//                 if(this.thread_id in bookmark_json){
//                     this.checked = true;
//                 }
//             },
//             judge_checked(){              
//                 if(this.checked == true){
//                     setBookmark(this.thread_id, this.thread_title);
//                 }
//                 else{
//                     deleteBookmark(this.thread_id);
//                 }
//             }
//         },
//         mounted() {        
//             this.loadbookmark();
//         },
// });



// change to vue3

const BOOK_MARK = {}
BOOK_MARK.EXPIRES = 365 * 6; //6 years

BOOK_MARK.setCookie = function(name, json){
    Cookies.set(name, json, { expires: BOOK_MARK.EXPIRES, path: '' });
};

BOOK_MARK.setBookmark = function(thread_id, thread_title) {
    // // load cookie
    const bookmark_key = "bookmark";
    const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す        
    let bookmark_json = {};
    if(bookmark_value){
            bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
    }
    // add bookmark
    bookmark_json[thread_id] = encodeURI(thread_title);
    bookmark_json[thread_id] = thread_title;
    console.log(bookmark_json);
    // BOOK_MARK.setCookie(bookmark_key, bookmark_json); 
    setCookie(bookmark_key, bookmark_json);

}
// {10: 'ファーストイヤーセミナー(秋山 肇)'}
// { foo: "bar" }


BOOK_MARK.deleteBookmark = function(thread_id){
    // delete bookmark
    const bookmark_key = "bookmark";
    const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す

    let bookmark_json = {};
    if(bookmark_value){
            bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
    }
    delete bookmark_json[thread_id]
    // BOOK_MARK.setCookie(bookmark_key, bookmark_json);
    setCookie(bookmark_key, bookmark_json);
}



Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            checked: false,
            thread_id: document.getElementById('thread_id').value,
            thread_title: document.getElementById('thread_title').value,
        }
    },
    methods: {
        loadbookmark() {
            const bookmark_key = "bookmark";
            const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す                
            let bookmark_json = {};
            if(bookmark_value){
                    bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
            }
            if(this.thread_id in bookmark_json){
                this.checked = true;
            }
        },
        judge_checked(){              
            if(this.checked == true){
                BOOK_MARK.setBookmark(this.thread_id, this.thread_title);
            }
            else{
                BOOK_MARK.deleteBookmark(this.thread_id);
            }
        }
    },
    mounted() {
        this.loadbookmark();
    }

}).mount('#bookmark_toggle');



const setCookie = (name, json)=>{


    let cookies = '';
    let expire = '';
    let period = '';

    //Cookieの保存名と値を指定
    cookies = name + '=' + JSON.stringify(json) + ';';

    //Cookieを保存するパスを指定
    cookies += 'path=/ ;';

    //Cookieを保存する期間を指定
    period = 365*10; //保存日数
    expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
    expire.toUTCString();
    cookies += 'expires=' + expire + ';';

    //Cookieを保存する
    document.cookie = cookies;
};

// function setBookmark(thread_id, thread_title) {
//         // load cookie
//         const bookmark_key = "bookmark";
//         const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す        
//         let bookmark_json = {};
//         if(bookmark_value){
//                 bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
//         }
//         // add bookmark
//         bookmark_json[thread_id] = encodeURI(thread_title);
//         setCookie(bookmark_key, bookmark_json);
// }

// function deleteBookmark(thread_id){
//         // delete bookmark
//         const bookmark_key = "bookmark";
//         const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す

//         let bookmark_json = {};
//         if(bookmark_value){
//                 bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
//         }
//         delete bookmark_json[thread_id]
//         setCookie(bookmark_key, bookmark_json);        
// }

