const { createApp } = Vue;

createApp({
data() {
return {
    sentences: [],
    currentSentence: "",
    positions: [],
    intervalId: null,
    userInput: "",
    startTime: null,
    isStarted: false,
    isFinished: false,
};
},
methods: {
async fetchSentences() {
    try {
    const response = await axios.get("http://localhost/server.php");
    console.log("DATA DARI SERVER:", response.data)

    this.sentences = response.data;
    this.getRandomSentence();
    } catch (error) {
    console.error("Gagal ambil data:", error);
    }
},
getRandomSentence() {
    if (this.sentences.length) {
    const randomIndex = Math.floor(Math.random() * this.sentences.length);
    this.currentSentence = this.sentences[randomIndex];
    }
},
moveScooters() {
    const scooters = document.querySelectorAll(".track img");
    let finishedCount = 0;

    scooters.forEach((scooter, index) => {
    if (this.positions[index] >= 1400) {
        finishedCount++;
        return;
    }

    this.positions[index] += Math.random() * 10 + 5;
    scooter.style.transform = `translateX(${this.positions[index]}px)`;
    });

    if (finishedCount === scooters.length) {
    clearInterval(this.intervalId);
    this.intervalId = null;
    }
},
startScooterMovement() {
    const scooters = document.querySelectorAll(".track img");
    if (scooters.length === 0) return;

    this.positions = Array.from(scooters).map(() => 0);
    scooters.forEach((scooter) => {
    scooter.style.transform = `translateX(0px)`;
    });

    this.intervalId = setInterval(() => {
    this.moveScooters();
    }, 100);
},
handleInput() {
    const target = this.currentSentence;
    const typed = this.userInput;

    let correct = true;
    for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== target[i]) {
        correct = false;
        break;
    }
    }

    // Cegah lanjut jika salah
    if (!correct) {
    this.userInput = typed.slice(0, -1);
    return;
    }

    // Selesai mengetik
    if (typed === target) {
    this.isFinished = true;
    const endTime = new Date();
    const timeInMinutes = (endTime - this.startTime) / 60000;

    const wordsTyped = target.trim().split(/\s+/).length;
    const totalChars = target.length;
    const correctChars = typed.length;
    const accuracy = Math.round((correctChars / totalChars) * 100);

    const wpm = Math.round(wordsTyped / timeInMinutes);

    document.getElementById("wpm-score").textContent = wpm;
    document.getElementById("acc-score").textContent = `${accuracy}%`;
    }
},
startGame() {
    if (this.intervalId || this.isStarted || !this.currentSentence) return;

    this.getRandomSentence();
    this.userInput = "";
    this.isFinished = false;
    this.isStarted = true;
    this.startTime = new Date();

    this.startScooterMovement();
}
},
mounted() {
this.fetchSentences();

const startBtn = document.querySelector(".start1");
startBtn.addEventListener("click", () => {
    this.startGame();
});
}
}).mount("#app");
