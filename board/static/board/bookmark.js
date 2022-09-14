const BOOK_MARK = {}
BOOK_MARK.EXPIRES = 2190; //6 years

// BOOK_MARK.getCookies = function(){
//     let load_json = Cookies.get('bookmark');

//     let bookmark_json = {};
//     if(load_json){
//             bookmark_json = JSON.parse(load_json); 
//     }
//     return bookmark_json;
// }

BOOK_MARK.setCookie = function(name, json){
    console.log(json);
    Cookies.set(name, json, { expires: BOOK_MARK.EXPIRES });
};

BOOK_MARK.setBookmark = function(thread_id, thread_title) {
    //load bookmark
    const bookmark_key = "bookmark";
    let load_json = Cookies.get('bookmark');
    console.log(load_json);

    let bookmark_json = {};
    if(load_json){
            bookmark_json = JSON.parse(load_json); //bookmark_valueをJSONに変換して取得
            console.log(bookmark_json);
    }
    // add bookmark
    bookmark_json[thread_id] = thread_title;
    console.log(bookmark_json);
    console.log(JSON.stringify(bookmark_json));
    BOOK_MARK.setCookie(bookmark_key, JSON.stringify(bookmark_json)); 
    // setCookie(bookmark_key, bookmark_json);

}

BOOK_MARK.deleteBookmark = function(thread_id){
    // delete bookmark
    const bookmark_key = "bookmark";
    let load_json = Cookies.get('bookmark');
    console.log(load_json);
    let bookmark_json = {};
    if(load_json){
            bookmark_json = JSON.parse(load_json); //bookmark_valueをJSONに変換して取得
            console.log(bookmark_json);
    }

    delete bookmark_json[thread_id]
    BOOK_MARK.setCookie(bookmark_key, JSON.stringify(bookmark_json));
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
            let load_json = Cookies.get('bookmark');
            console.log(load_json);
            // const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す        
            let bookmark_json = {};
            if(load_json){
                    bookmark_json = JSON.parse(load_json); //bookmark_valueをJSONに変換して取得
                    console.log(bookmark_json);
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
