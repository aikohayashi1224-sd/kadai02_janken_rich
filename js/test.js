// --- 1. グローバル変数の準備（ここに宣言を追加！） ---
let timerId = null;
let ikasamaFlashTimer = null; // ★フラッシュ用のタイマーを入れる箱

function rsp(playerSelect) {
    if (timerId) clearTimeout(timerId);

    const handImgs = ['img/guu.png', 'img/choki.png', 'img/pa.png'];
    const randomNum = Math.floor(Math.random() * 100);
    let pcSelect;

    // ブラック仕様の確率操作（勝ち5%, あいこ10%, 負け85%）
    if (randomNum < 5) {
        pcSelect = (playerSelect + 1) % 3; // プレイヤー勝利
    } else if (randomNum < 15) {
        pcSelect = playerSelect;           // あいこ
    } else {
        pcSelect = (playerSelect + 2) % 3; // 飴屋さん勝利
    }

    // 要素取得
    const pImg = document.getElementById('player-hand-img');
    const cImg = document.getElementById('pc-hand-img');
    const resContent = document.getElementById('result-content');
    const controls = document.getElementById('controls');
    const pcInitial = document.getElementById('pc-initial-view');
    const judgment = document.getElementById('judgment');
    const resPic = document.getElementById('result-pic');
    const initGroup = document.getElementById('initial-view-group');
    
    // 【イカサマ用要素】
    const ikasamaMsg = document.getElementById('ikasama-message');

    // --- フラッシュの初期化 ---
    if (ikasamaMsg) {
        ikasamaMsg.innerText = ""; 
        ikasamaMsg.style.color = "#ff6600"; // 文字色を「黄色」に
        ikasamaMsg.style.visibility = "visible";
    }
    if (ikasamaFlashTimer) { clearInterval(ikasamaFlashTimer); } // 動いていたら止める

    // --- 表示の切り替え ---
    controls.style.display = "none";
    pcInitial.style.display = "none";
    if (initGroup) initGroup.style.display = "none";

    resContent.style.display = "flex";    // 結果を表示（縦並び）
    
    pImg.src = handImgs[playerSelect]; 
    cImg.src = handImgs[pcSelect]; 
    pImg.style.display = "block";
    cImg.style.display = "block";

    // 判定結果
    if (playerSelect === pcSelect) {
        judgment.innerText = "あいこ...もう1回！";
        judgment.style.color = "#ff7700";
        resPic.src = "img/draw.png";
    } else if ((playerSelect === 0 && pcSelect === 1) || (playerSelect === 1 && pcSelect === 2) || (playerSelect === 2 && pcSelect === 0)) {
        judgment.innerText = "なかなかやりますねw";
        judgment.style.color = "#000000";
        resPic.src = "img/win.png";
    } else {
        judgment.innerText = "残念...再挑戦しよう！";
        judgment.style.color = "#ff0000";
        resPic.src = "img/loose.png";

        // 【イカサマ演出：確率操作で負けた時だけ実行】
        // 確率の15以上の枠（＝85%の強制負け枠）に入っていたら暴く
        if (randomNum >= 15 && ikasamaMsg) {
            ikasamaMsg.innerText = "ここで引いてはもったいない👿";

            // 0.3秒（300ミリ秒）ごとに点滅させる
            let isVisible = true;
            ikasamaFlashTimer = setInterval(function() {
                ikasamaMsg.style.visibility = isVisible ? "visible" : "hidden";
                isVisible = !isVisible;
            }, 300);
        }
    }

    // --- 3秒後にリセット ---
    timerId = setTimeout(function() {
        pImg.style.display = "none";
        cImg.style.display = "none";
        resContent.style.display = "none"; 
        
        // 【イカサマの文字とフラッシュタイマーをきれいに消す】
        if (ikasamaMsg) {
            ikasamaMsg.innerText = "";
            if (ikasamaFlashTimer) { clearInterval(ikasamaFlashTimer); }
        }

        if (initGroup) initGroup.style.display = "flex";
        controls.style.display = "block"; 
        pcInitial.style.display = "block";
        timerId = null;

    }, 3000); 
}