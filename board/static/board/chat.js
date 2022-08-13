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
        message: null
    },
    delimiters: ['[[', ']]'],
    mounted () {
        axios
          .get('/api')
          .then(response => (this.message = response))
      }
})

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