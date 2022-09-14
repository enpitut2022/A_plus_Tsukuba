// const bookmark_dropdown = new Vue({
//     el: '#bookmark_dropdown',
//     data: {
//             bookmark_data: [],
//     },
//     delimiters: ['[[', ']]'],
//     methods: {
//         loadbookmark() {
//             const bookmark_key = "bookmark";
//             const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す                
//             let bookmark_json = {};
//             if(bookmark_value){
//                     bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
//             }
//             this.bookmark_data = Object.entries(bookmark_json);  
//         },
//     }
// });

Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            bookmark_data: [],
        }
    },
    methods: {
        loadbookmark() {
            const bookmark_key = "bookmark";
            const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す                
            let bookmark_json = {};
            if(bookmark_value){
                    bookmark_json = JSON.parse(bookmark_value.split('=')[1]); //bookmark_valueをJSONに変換して取得
            }
            this.bookmark_data = Object.entries(bookmark_json);  
        }
    }
}).mount('#bookmark_dropdown');