Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            results: {},
            query: "",
            latest_request_time : Date.now()
        };
    },
    methods: {
        inputEvent(event) {
            //検索ボックスの内容が変更されるたびに呼ばれる
            const input_value = event.target.value.trim();
            this.searchAndDataUpdate(input_value);
        },
        async searchAndDataUpdate(input_value) {
            if (!input_value) {
                this.results = {};
                this.query = "";
            }else{    
                //APIリクエストは非同期のため、重いリクエストの後に軽いリクエストを送ると
                //軽い＝＞重いの順に到着してしまい、結果がおかしくなります。
                //そのため、時刻を使って最新のリクエストのみデータを更新するようにしています。
                const called_time = Date.now();
                this.latest_request_time = called_time;

                const ret = await axios.get(
                    `/api/search_subjects?q=${input_value}`
                );
                
                if (this.latest_request_time == called_time) {
                    this.results = ret.data;
                    this.query = input_value;
                }                
            }
        },
        readmoreFilter(text, max_length, suffix) {
            //長いテキストを省略表記にする
            //readmoreFilter("ABC", 4, "...") => "ABC"
            //readmoreFilter("ABCD", 2, "...") => "AB..."
            if (text.length < max_length) return text;
            return text.substring(0, max_length) + suffix;
        }
    }
}).mount('#search_app')
