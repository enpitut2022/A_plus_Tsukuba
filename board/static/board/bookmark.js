const BOOK_MARK = {}
BOOK_MARK.EXPIRES = 365; //DAYS

BOOK_MARK.getCookies = function(){ // return (JSON)object not (JSON)string
    let load_json_string = Cookies.get('bookmark');

    let bookmark_json_object = {};
    if(load_json_string){
            bookmark_json_object = JSON.parse(load_json_string); 
    }
    return bookmark_json_object;
}

BOOK_MARK.setCookie = function(name, json_object){ // receive (JSON)object not (JSON)string
    Cookies.set(name, JSON.stringify(json_object), { expires: BOOK_MARK.EXPIRES });
};

BOOK_MARK.setBookmark = function(thread_id, thread_title) {
    let bookmark_json = BOOK_MARK.getCookies();

    bookmark_json[thread_id] = thread_title;
    BOOK_MARK.setCookie("bookmark", bookmark_json);
}

BOOK_MARK.deleteBookmark = function(thread_id){
    let bookmark_json = BOOK_MARK.getCookies();

    delete bookmark_json[thread_id]
    BOOK_MARK.setCookie("bookmark", bookmark_json);
}



Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            j_checked: false,
            thread_id: document.getElementById('thread_id').value,
            thread_title: document.getElementById('thread_title').value,
        }
    },
    methods: {
        loadbookmark() {
            let bookmark_json = BOOK_MARK.getCookies();
            
            if(this.thread_id in bookmark_json){
                this.j_checked = true;
            }
        },
        judge_checked(){
            this.j_checked = !this.j_checked;       
            if(this.j_checked == true){
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
