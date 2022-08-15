const test_api = new Vue({
    el: '#post_content',
    data: {
        message: null,
        child_message: {},
        thread_id: document.getElementById('thread_num').value,
        post_id: null,
    },
    delimiters: ['[[', ']]'],
    methods: {
        // 親スレを取得する関数
        async fetch_subthreads() {
            let res = await axios.get(
                `/api/get_subthreads?thread_id=${this.thread_id}`
            );
            console.table(res.data);
            this.message = res;
        },
        // 子スレを取得する関数
        async child_threads(post_id) {
            this.$set(this.child_message, post_id, []);
            let child_res = await axios.get(`/api/get_replies?post_id=${post_id}`);
            console.log('called child_threads');
            console.table(child_res.data);

            this.$set(this.child_message, post_id, child_res.data || []);
        },

        formatTimeString(time) {
            let ts = Date.parse(time);
            let date = new Date(ts);

            let month = date.getMonth();
            let year = date.getFullYear();
            let day = date.getDay();
            let hour = date.getHours().toString().padStart(2, '0');
            let min = date.getMinutes().toString().padStart(2, '0');

            return `${year}/${month}/${day} ${hour}:${min}`;
        },

        getCSS(id) {
            const dict = {
                0: 'badge badge-pill badge-danger',
                1: 'badge badge-pill badge-warning',
                2: 'badge badge-pill badge-success',
                3: 'badge badge-pill badge-primary',
                4: `badge badge-pill badge-info`,
                5: 'badge badge-pill badge-Light',
            };

            return dict[id];

        },

        getText(id) {
            const dict = {
                0: '非常事態(´•_•; )',
                1: 'じっくり(-ω-;)ｳｰﾝ',
                2: '助かった(*´▽`人)',
                3: '提案(^^)/~~~',
                4: `よしよし('ω')`,
                5: '大丈夫？( *´艸｀)',
            };

            return dict[id];

        },
    },
    mounted() {
        this.fetch_subthreads();
    },
});
