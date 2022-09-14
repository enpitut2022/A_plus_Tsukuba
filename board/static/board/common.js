Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            bookmark_data: [],
        }
    },
    methods: {
        loadbookmark() {
            const bookmark_json = BOOK_MARK.getCookies();
            this.bookmark_data = Object.entries(bookmark_json);  
        }
    }
}).mount('#bookmark_dropdown');