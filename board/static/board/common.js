Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            bookmark_data: [],
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
            this.bookmark_data = Object.entries(bookmark_json);  
        }
    }
}).mount('#bookmark_dropdown');