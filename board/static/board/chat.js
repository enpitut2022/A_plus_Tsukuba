const vue_msg = new Vue({
    delimiters: ['[[', ']]'],   //必ず必要
    el: '#vue_msg',
    data: {
        message: 'Hello Vue!'
    }
});

const test_api = new Vue({
    el: "#api_test",
    data: {
        message: null,
        child_message: {},
        thread_id: document.getElementById('thread_num').value,
        post_id: null
    },
    delimiters: ['[[', ']]'],
    methods: {
        // 親スレを取得する関数
        async fetch_subthreads() {
            let res = await axios.get(`/api/get_subthreads?thread_id=${this.thread_id}`)
            console.table(res.data);
            this.message = res;
        },
        // 子スレを取得する関数
        async child_threads(post_id) {
            this.$set(this.child_message, post_id, []);
            let child_res = await axios.get(`/api/get_replies?post_id=${post_id}`)
            console.log('called child_threads');
            console.table(child_res.data);

            this.$set(this.child_message, post_id, child_res.data || []);
        }
    },
    mounted () {
        this.fetch_subthreads();
    }
})

// http://127.0.0.1:8000/api/get_replies?post_id=4bff7065-6a7e-4dca-a18d-2d8fb430ac61

// const less = `<div class="row">
// <div class="col">
//   <div id="vue_msg" class="lead">
//     [[ message ]]
//   </div>
//   <div id="api_test" class="content">
//     <div v-for="msg in message.data" :key="msg.post_id">
//       <div>[[ msg.sender_name ]]</div>
//       <div>[[ msg.text ]]</div>
//     </div>
//   </div>
// </div>
// </div>`