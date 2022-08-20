const button = document.getElementById('bookmark');
const button_delete = document.getElementById('bookmark_delete')
button.addEventListener('click', setBookmark);
button_delete.addEventListener('click', deleteBookmark);

const checkbox = document.getElementById('flexSwitchCheckDefault');
checkbox.addEventListener('change', tmp_func);

function tmp_func(){
        if(checkbox.checked){
                setBookmark();
        }else{
                deleteBookmark();
        }
}

const bookmark_toggle = new Vue({
        el: '#bookmark_toggle',
        data: {
                checked: false,
                thread_id: document.getElementById('thread_num').value,
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
                    setBookmark();
                }
                else{
                    deleteBookmark();
                }
            }

        },
        mounted() {
        
            this.loadbookmark();
            
        
            console.log("test");
        },
});



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

const bookmark_dropdown = new Vue({
        el: '#bookmark_dropdown',
        data: {
                bookmark_data: [],
                thread_title: [],
                thread_id: [],
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
                this.bookmark_data = Object.entries(bookmark_json);
                // console.log(this.bookmark_data[0][1]); //First
                // console.log(this.bookmark_data[1][1]); //情報リテラシー
                let title_array = [];
                let id_array = [];
                for(let i = 0; i < this.bookmark_data.length; i++){
                //     console.log(this.bookmark_data[i][1]);
                    title_array.push(this.bookmark_data[i][1]);
                    id_array.push(this.bookmark_data[i][0]);
                //     console.log(id_array);
                }
                // insert tmparray to bookmark_data
                this.thread_title = title_array;
                this.thread_id = id_array;
                // this.bookmark_data = tmparray;
                // this.thread_title = title_array;
                console.log(this.thread_title);
                console.log(this.thread_id);
                
            },
            

        },
        mounted() {
        
            this.loadbookmark();
            
        
            console.log("testdaaaaaaa");
        },
});