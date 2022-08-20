const button = document.getElementById('bookmark');
button.addEventListener('click', setBookmark);


function setBookmark() {
        const thread_id = button.getAttribute('value');
        const bookmark = [];


        const dateObject = new Date();
        dateObject.setTime( dateObject.getTime() + ( 5*365*24*60*60*1000 ) );
        const expires = "expires=" + dateObject.toGMTString();
        const path = "path=/";
        // document.cookie = "bookmark1=" + thread_id + "; " + expires + "; " + path;
        document.cookie = "bookmark1=" + "1" + "; " + expires + "; " + path;
        document.cookie = "bookmark2=" + "2" + "; " + expires + "; " + path;
        
        console.log(prototype());
}

function prototype(){
        let bookmark = [];
        const bookmark_key = "bookmark";
        const bookmark_value = document.cookie.split('; ').filter(row => row.startsWith(bookmark_key)); //bookmarkが含まれる要素の配列を返す
        console.log("cookieの配列: " + bookmark_value); //[bookmark1=1, bookmark2=2]
        const bookmark_length = bookmark_value.length; //ブックマークの長さ取得
        console.log("配列の長さ: " + bookmark_length);
        for(let i = 0; i < bookmark_length; i++){
            bookmark.push(bookmark_value[i].split('=')[1])
        }
        console.log("cookieのvalue: " + bookmark); //["1", "2"]
        return bookmark;
    }
    
// function getBookmark(){
//         let bookmark = [];
//         // start with bookmark
//         let i = 1;
//         for (i=1; i<4 ; i++) { // 2 is val
//                 const bookmark_key = "bookmark" + i;
//                 const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_key));
//                 console.log(bookmark_value); //bookmark1=1 and bookmark2=2 and bookmark3=undefined
//                 if (typeof bookmark_value === "undefined") {
//                         break;
//                 }
//                 else {   
//                         bookmark.push(bookmark_value.split('=')[1]);
//                 }
//                 // if (bookmark_value) {
//                 //         bookmark.push(bookmark_value.split('=')[1]);
//                 // }
//         }
        
//         console.log(bookmark); //["1", "2"]
//         return bookmark;
// }

// function getBookmark_of_length(){
//         let bookmark = [];
//         // start with bookmark
//         let bookmark_length = 0;
//         let i = 1;
//         while (true) {
//                 const bookmark_str = "bookmark" + i;
//                 const bookmark_value = document.cookie.split('; ').find(row => row.startsWith(bookmark_str));
//                 console.log(bookmark_value);
//                 if (bookmark_value) {
//                         // bookmark.push(bookmark_value.split('=')[1]);
//                         bookmark_length += 1;
//                         i += 1;
//                 }
//                 else{
//                         break;
//                 }
//         }
        
//         console.log(bookmark_length);
//         return bookmark_length;
// }



// const bookmark = document.cookie.split('; ').find(row => row.startsWith('bookmark')).split('=')[1];

// const dateObject = new Date();
// dateObject.setTime( dateObject.getTime() + ( 30*24*60*60*1000 ) );
// const expires = "expires=" + dateObject.toGMTString();
// const path = "path=/";
// document.cookie = "ITF=true" + "; " + expires + "; " + path;



// get bookmark from cookie
//         const cookie = document.cookie;
//         const cookie_array = cookie.split('; ');
//         for (const row of cookie_array) {
//                 const row_array = row.split('=');
//                 if (row_array[0] === 'bookmark') {
//                 }
//         }


