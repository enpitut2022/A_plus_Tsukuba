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
