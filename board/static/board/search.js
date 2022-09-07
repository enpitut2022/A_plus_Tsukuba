Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            results: {},
            query: "",
            request_time : Date.now()
        };
    },
    methods: {
        inputEvent(event) {
            //検索ボックスの内容が変更されるたびに呼ばれる
            const value = event.target.value.trim();
            this.searchAndDataUpdate(value);
        },
        async searchAndDataUpdate(query) {
            if (!query) {
                this.results = {};
                this.query = "";
            }else{    
                //APIリクエストは非同期のため、重いリクエストの後に軽いリクエストを送ると
                //軽い＝＞重いの順に到着してしまい、結果がおかしくなります。
                //そのため、時刻を使って最新のリクエストのみデータを更新するようにしています。
                const called_now = Date.now();
                this.request_time = called_now;

                const ret = await axios.get(
                    `/api/search_subjects?q=${query}`
                );
                
                if (this.request_time == called_now) {
                    this.results = ret.data;
                    this.query = query;
                }                
            }
        },
        readmoreFilter(text, length, suffix) {
            //長いテキストを省略表記にする
            //readmoreFilter("ABC", 4, "...") => "ABC"
            //readmoreFilter("ABCD", 2, "...") => "AB..."
            if (text.length < length) return text;
            return text.substring(0, length) + suffix;
        }
    }
}).mount('#search_app')
