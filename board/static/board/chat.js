let post_id_judge = null;

const post_content = new Vue({
    el: '#post_content',
    data: {
        message: null,
        child_message: {},
        thread_id: document.getElementById('thread_num').value,
        post_id: null,
        reply_count: {}
    },
    delimiters: ['[[', ']]'],
    methods: {
        // 親スレを取得する関数
        async fetch_subthreads() {
            let res = await axios.get(
                `/api/get_subthreads?thread_id=${this.thread_id}`
            );
                this.message = res;
        },
        // 子スレを取得する関数
        async child_threads(post_id) {
            let child_res = await axios.get(`/api/get_replies?post_id=${post_id}`);

            this.$set(this.child_message, post_id, child_res.data || []);
        },

        formatTimeString(time) {
            let ts = Date.parse(time);
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
                1: 'badge rounded-pill bg-secondary',
                2: 'badge rounded-pill bg-success',
                3: 'badge rounded-pill bg-primary',
                4: `badge rounded-pill bg-info`,
                5: 'badge rounded-pill bg-dark',
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
        },

        start () {
            const self = this;
            if (self.interval) {
              clearInterval(self.interval);
            }
            self.interval = setInterval(() => {
                this.loop();
            }, 3000)
        },
        async loop () {
            if (document.visibilityState === 'visible') {
                await this.fetch_subthreads();
                for (const i in this.message.data) {
                    const pid = this.message.data[i].post_id;
                    await this.child_threads(pid);
                    let count = 0;
                    if(this.child_message[pid]) count = this.child_message[pid].length;
                    this.$set(this.reply_count, pid, count);
                }
            }
        }
    },
    mounted() {
        this.loop();
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
        selectEmotion: 1,
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
            this.inputText = "";
        },


        judge_thread(judge_post_id = null) {
            post_id_judge = judge_post_id;         
        },
    },
});
