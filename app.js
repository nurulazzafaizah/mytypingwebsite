const { createApp } = Vue;

createApp({
data() {
return {
    sentences: [],
    currentSentence: "",
    positions: [],
    intervalId: null
};
},
methods: {
async fetchSentences() {
    try {
    const response = await axios.get("http://localhost/server.php");
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
    // Jika motor sudah melewati batas finish (misal 700px), tidak bergerak lagi
    if (this.positions[index] >= 1400) {
        finishedCount++;
        return;
    }

    // Tambahkan posisi acak untuk gerakan motor
    this.positions[index] += Math.random() * 10 + 5;
    scooter.style.transform = `translateX(${this.positions[index]}px)`;
    });

    // Semua motor sudah finish, hentikan interval
    if (finishedCount === scooters.length) {
    clearInterval(this.intervalId);
    this.intervalId = null;
    }
},
startScooterMovement() {
    const scooters = document.querySelectorAll(".track img");
    if (scooters.length === 0) return;

    // Reset posisi awal motor
    this.positions = Array.from(scooters).map(() => 0);

    // Reset tampilan motor ke awal
    scooters.forEach((scooter) => {
    scooter.style.transform = `translateX(0px)`;
    });

    // Mulai animasi motor
    this.intervalId = setInterval(() => {
    this.moveScooters();
    }, 100);
}
},
mounted() {
this.fetchSentences();

const startBtn = document.querySelector(".start1");
startBtn.addEventListener("click", () => {
    if (this.intervalId) return; // jangan dobel klik
    this.startScooterMovement();
});
}
}).mount("#app");
