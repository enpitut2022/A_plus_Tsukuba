function isITF() {
    try {
        const ITFValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('ITF'))
        .split('=')[1];
        if (ITFValue) return;
    } catch {}

    const ans = window.prompt("このサービスは筑波大生専用のサービスです。\n" +
    "筑波大生は以下のクイズに解答して先に進んでくさい。\n" +
    "\n" + 
    "筑波大学でアルファベット3文字といえば何でしょう？\n" +
    "（半角英字大文字で入力してください。）");
    if (ans == null) {
        ITFmove();
    }else if (ans != "ITF") {
        if (confirm("答えが間違っています。もう一度挑戦しますか？")) {
            isITF();
            return;
        }
        ITFmove();
    }else{
        document.cookie = "ITF=true";
    }
}

function ITFmove() {
    alert("筑波大のWebサイトに遷移します。");
    location.href = "https://www.tsukuba.ac.jp/";
}