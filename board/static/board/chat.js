let post_id_judge = null;

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
            console.log('called child_threads desu');
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
                0: 'badge rounded-pill bg-danger',
                1: 'badge rounded-pill bg-warning',
                2: 'badge rounded-pill bg-success',
                3: 'badge rounded-pill bg-primary',
                4: `badge rounded-pill bg-info`,
                5: 'badge rounded-pill bg-Light',
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

        judge_thread(judge_post_id = null) {
            post_id_judge = judge_post_id;
            console.log(post_id_judge);
        },
    },
    mounted() {
        this.fetch_subthreads();
    },
});


const send_api = new Vue({
    el: '#send_message',
    data: {
        message: null,
        child_message: {},
        thread_id: null,
        post_id: null,
    },
    delimiters: ['[[', ']]'],
    methods: {
        // メッセージを送信する関数(親スレ作成)
        async send_message() {
            console.log("send:ex");
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"; 

            console.log(this.message);
            console.log(this.post_id);
            this.post_id = post_id_judge;
            
            
            if (!this.post_id) {
                //post_id 指定なし
                const endpoint = '/api/post_subthreads';
                console.log("sub:ex");
                const res = await axios.post(
                    endpoint,
                    {
                        emotion: 3,
                        thread: 1,
                        sender_name: "名無し",
                        text: "サブスレッド----------------------------------------------------------------------------------------------------------------------",
                    }
                );
                console.log(this.message);
                
            }else{
                const endpoint = '/api/post_replies';
                console.log("child:ex");
                const res = await axios.post(
                    endpoint,
                    {
                        emotion: 2,
                        post_id: this.post_id,
                        sender_name: "名無し",
                        text: "リプライだよ？",
                    }
                );
            }
        },

        // judge_thread(judge_post_id = null) {
        //     this.post_id = judge_post_id;
        // },

        judge_thread(judge_post_id = null) {
            post_id_judge = judge_post_id;
            console.log(post_id_judge);
            
        },
    },
});

// const post_button = new Vue({
//     el: '#post_button',
//     data: {
//         message: null,
//         child_message: {},
//         thread_id: null,
//         post_id: null,
//     },
//     delimiters: ['[[', ']]'],
//     methods: {
//         judge_thread(judge_post_id = null) {
//             post_id_judge = judge_post_id;
//             console.log(post_id_judge);
//         },
//     },
// });