Vue.component('child-component', {
    template: '<input id="search_input" v-model.trim="query" @input="onInput" type="text" class="form-control" placeholder="科目名を入力してください。">',
    methods: {
        onInput: function() {
            this.$emit('childevent', this.query);
        }
    }
});

new Vue({
    el: '#search_app',
    delimiters: ['[[', ']]'],   //必ず必要
    data: {
        results: {},
        query: "",
        request_time : Date.now()
    },
    methods: {
        async searchMethod (query="") {
            /*
                APIリクエストは非同期のため、
                重いリクエストの後に軽いリクエストを送ると
                軽い＝＞重いの順に到着してしまい、
                結果がおかしくなります。
                そのため、時刻を使って最新のリクエストのみ表示するようにしてます。    
            */
            const now = Date.now();
            this.request_time = now;
            if (query == "") {
                this.results = {};
                this.query = query;
                return;
            }
            const res = await axios.get(
                `/api/search_subjects?q=${query}`
            );
            if (this.request_time == now) {
                this.results = res.data;
                this.query = query;
            }
        },
    }
})