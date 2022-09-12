Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            api_check : navigator.share,
            now_url: location.href,
        };
    },
    methods: {
        async share_thread() {
            try {
              await navigator.share({ title: document.title, url: "" });
            } catch (error) {
              console.error(error);
            }
        },
        tweet() {
            const url = "http://twitter.com/share?url=" + this.now_url + "&hashtags=Aplusつくば";
            window.open(url, '_blank')
        },
        Line(){
            const url = "https://social-plugins.line.me/lineit/share?url=" + this.now_url;
            window.open(url, '_blank')
        },
        Discord(){
            const url = "https://social-plugins.line.me/lineit/share?url=" + this.now_url;
            window.open(url, '_blank')
        },
    },
    mounted() {
        console.log(this.api_check);
        console.log(this.now_url);
    },
}).mount('#col5_app')