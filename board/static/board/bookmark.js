const button = document.getElementById('bookmark');
const button_delete = document.getElementById('bookmark_delete')
button.addEventListener('click', setBookmark);
button_delete.addEventListener('click', deleteBookmark);


function setBookmark() {
        const thread_value = button.getAttribute('value').split(' '); //thread_id と thread_title が設定されたvalue属性取得
        const thread_id = thread_value[0];
        const thread_title = thread_value[1];
        const bookmark = [];


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

function deleteBookmark(){
        const thread_value = button_delete.getAttribute('value').split(' '); //thread_id と thread_title が設定されたvalue属性取得
        const thread_id = thread_value[0];
        // const thread_title = thread_value[1];

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


    let cookie = '';
    let expire = '';
    let period = '';

    //Cookieの保存名と値を指定
    cookies = name + '=' + JSON.stringify(json) + ';';

    //Cookieを保存するパスを指定
    cookies += 'path=/ ;';

    //Cookieを保存する期間を指定
    period = 30; //保存日数
    expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
    expire.toUTCString();
    cookies += 'expires=' + expire + ';';

    //Cookieを保存する
    document.cookie = cookies;
};

