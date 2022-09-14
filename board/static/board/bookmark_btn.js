Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            bookmarkBtn_checked: false,
            thread_id: document.getElementById('thread_id').value,
            thread_title: document.getElementById('thread_title').value,
        }
    },
    methods: {
        loadbookmark() {
            const bookmark_json = BOOK_MARK.getCookies();

            if (this.thread_id in bookmark_json) {
                this.bookmarkBtn_checked = true;
            }
        },
        onBookmarkBtnChange() {
            this.bookmarkBtn_checked = !this.bookmarkBtn_checked;
            if (this.bookmarkBtn_checked) {
                BOOK_MARK.setBookmark(this.thread_id, this.thread_title);
            } else {
                BOOK_MARK.deleteBookmark(this.thread_id);
            }
        }
    },
    mounted() {
        this.loadbookmark();
    }

}).mount('#bookmark_toggle');
