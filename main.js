// HTML要素の取得
const time = document.getElementById('time-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const result = document.getElementById('result');
const yourRank = document.getElementById('yourrank');
const blueButton = document.getElementById('blueButton');
const greenButton = document.getElementById('greenButton');
const redButton = document.getElementById('redButton');
const timeBackGround = document.getElementById('time');

/*===============================
【レベル選択時のスタイル・秒数変更】
===============================*/

let second = 7000;

blueButton.addEventListener('click', () => {
    timeBackGround.style.backgroundColor = '#6495ED';
    second = 7000;
});

greenButton.addEventListener('click', () => {
    timeBackGround.style.backgroundColor = '#0eec93';
    second = 5000;
});

redButton.addEventListener('click', () => {
    timeBackGround.style.backgroundColor = '#f30f3d';
    second = 3000;
});


/*===================
【ストップウォッチ機能】
====================*/

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;
// 秒数非表示を無効にするための変数
let hiddenID;

// 時間を表示する関数
function displayTime () {
    const currentTime = new Date(Date.now() - startTime + stopTime);
    const s = String(currentTime.getSeconds()).padStart(2, '0');
    const ms = String(currentTime.getMilliseconds()).padStart(2, '0').slice(-2);

    time.textContent = `${s}.${ms}`;
    timeoutID = setTimeout(displayTime, 10);
};

// ランク表示の関数
const rankDisplay = () => {
    // 10秒との誤差の計算
    const timeDiff = Math.abs(10.00 - parseFloat(time.textContent));
    // ランク指定
    if(timeDiff === 0.00){
        yourRank.textContent = "SSSランク";
    }else if (0.01 <= timeDiff && timeDiff <= 0.05){
        yourRank.textContent = "SSランク";
    }else if (0.06 <= timeDiff && timeDiff <= 0.1){
        yourRank.textContent = "Sランク";
    }else if (0.11 <= timeDiff && timeDiff <= 0.5){
        yourRank.textContent = "Aランク";
    }else if (0.51 <= timeDiff && timeDiff <= 1.0){
        yourRank.textContent = "Bランク";
    }else{
        yourRank.textContent = "Cランク";
    }
}


// スタートボタン押下の処理
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    blueButton.disabled = true;
    greenButton.disabled = true;
    redButton.disabled = true;
    startTime = Date.now();
    displayTime();
    hiddenID = setTimeout(() => {
        document.getElementById('time-display').classList.add('hidden');
    },second);
});

// ストップボタン押下時
stopButton.addEventListener('click', function(){
    startButton.disabled = true;
    stopButton.disabled = true;
    resetButton.disabled = false;
    blueButton.disabled = true;
    greenButton.disabled = true;
    redButton.disabled = true;
    clearTimeout(timeoutID);
    clearTimeout(hiddenID);
    stopTime += (Date.now() - startTime);
    document.getElementById('time-display').classList.remove('hidden');

    // リザルト表記設定
    result.style.display = 'block';
    rankDisplay();
    
});

// リプレイボタン押下時
resetButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    blueButton.disabled = false;
    greenButton.disabled = false;
    redButton.disabled = false;
    time.textContent = '00.00';
    stopTime = 0;
    result.style.display = 'none';
});

