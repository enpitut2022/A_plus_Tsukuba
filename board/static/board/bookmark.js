
const bookmark_toggle = new Vue({
        el: '#bookmark_toggle',
        data: {
                checked: false,
                thread_id: document.getElementById('thread_num').value,
                thread_title: document.getElementById('thread_title').value,
        },
        delimiters: ['[[', ']]'],
        methods: {
            loadbookmark() {
                const bookmark_key = "bookmark";
                const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す
                console.log(bookmark_value);
                
                let bookmark_json = {};
                if(bookmark_value){
                        bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
                }
                console.log(bookmark_json);
                if(this.thread_id in bookmark_json){
                    this.checked = true;
                }
            },
            judge_checked(){
                if(this.checked == false){
                    setBookmark(this.thread_id, this.thread_title);
                }
                else{
                    deleteBookmark(this.thread_id);
                }
            }
        },
        mounted() {        
            this.loadbookmark();
        },
});



function setBookmark(thread_id, thread_title) {
        // load cookie
        const bookmark_key = "bookmark";
        const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す
        console.log(bookmark_value);
        
        let bookmark_json = {};
        if(bookmark_value){
                bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
        }
        // add bookmark
        bookmark_json[thread_id] = thread_title;
        setCookie(bookmark_key, bookmark_json);
        console.log(bookmark_json); 
        console.log(document.cookie);        
}

function deleteBookmark(thread_id){
        // delete bookmark
        const bookmark_key = "bookmark";
        const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す

        let bookmark_json = {};
        if(bookmark_value){
                bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
        }
        delete bookmark_json[thread_id]
        setCookie(bookmark_key, bookmark_json);
        console.log(bookmark_json);
        
}

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