// 初期値
let experience = 0;
let level = 1;
let timerInterval;
let timeRemaining = 25 * 60;  // 25分（秒単位）

// DOM要素の取得
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const levelElement = document.getElementById("level");
const experienceElement = document.getElementById("experience");

// タイマーを表示する関数
function updateTimer() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 経験値を加算する関数
function gainExperience() {
    experience += 1;
    experienceElement.textContent = experience;

    // レベルアップチェック
    if (experience >= level * 10) {
        level += 1;
        experience = 0;
        levelElement.textContent = level;
        alert(`おめでとう！レベル ${level} に上がりました！`);
    }
}

// タイマーを開始する関数
function startTimer() {
    startButton.disabled = true;
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimer();
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            startButton.disabled = false;
            gainExperience();  // 経験値を加算
            alert("勉強時間終了！休憩してください。");
            timeRemaining = 25 * 60;  // タイマーリセット
        }
    }, 1000);
}

// リセットボタンの機能
resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    startButton.disabled = false;
    timeRemaining = 25 * 60;  // タイマーリセット
    updateTimer();
});

// 勉強開始ボタンの機能
startButton.addEventListener("click", startTimer);

// 初期のタイマー表示
updateTimer();
