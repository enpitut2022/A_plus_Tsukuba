let post_id_judge = null;

const post_content = new Vue({
    el: '#post_content',
    data: {
        message: null,
        child_message: {},
        thread_id: document.getElementById('thread_num').value,
        post_id: null,
        opened_subthreads : new Set(),
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
            this.opened_subthreads.add(post_id);
            let child_res = await axios.get(`/api/get_replies?post_id=${post_id}`);
            console.log('called child_threads desu');
            console.table(child_res.data);

            this.$set(this.child_message, post_id, child_res.data || []);
        },

        formatTimeString(time) {
            let ts = Date.parse(time);
            // console.log(ts);
            let date = new Date(ts);

            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let day = date.getDate();
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

        start () {
            const self = this;
            if (self.interval) {
              clearInterval(self.interval);
            }
            self.interval = setInterval(() => {
                this.fetch_subthreads();
                for (const post_id of this.opened_subthreads) {
                    this.child_threads(post_id);
                  }
            }, 1000)
        }
    },
    mounted() {
        this.fetch_subthreads();
        this.start();
    },
});


const send_api = new Vue({
    el: '#send_message',
    data: {
        message: null,
        child_message: {},
        thread_id: null,
        post_id: null,
        inputName: "名無し",
        selectEmotion: 0,
        inputText: "",
        thread_id: document.getElementById('thread_num').value,
    },
    delimiters: ['[[', ']]'],
    methods: {
        // メッセージを送信する関数(親スレ作成)
        async send_message() {

            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"; 

            this.post_id = post_id_judge;
            
            
            if (!this.post_id) {
                //post_id 指定なし
                const endpoint = '/api/post_subthreads';
                console.log("sub:ex");
                const res = await axios.post(
                    endpoint, 
                    {
                        emotion: this.selectEmotion,
                        thread: this.thread_id,
                        sender_name: this.inputName,
                        text: this.inputText,
                    }
                );                
            }else{
                const endpoint = '/api/post_replies';
                console.log("child:ex");
                const res = await axios.post(
                    endpoint,
                    {
                        emotion: this.selectEmotion,
                        post_id: this.post_id,
                        sender_name: this.inputName,
                        text: this.inputText,
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