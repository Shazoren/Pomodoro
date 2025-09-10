const { createApp } = Vue;

createApp({
  data() {
    return {
      modes: { focus: 25*60, short: 5*60, long: 15*60 },
      currentMode: 'focus',
      timeLeft: 25*60,
      running: false,
      timer: null
    }
  },
  computed: {
    minutes() { return String(Math.floor(this.timeLeft / 60)).padStart(2, '0'); },
    seconds() { return String(this.timeLeft % 60).padStart(2, '0'); }
  },
  methods: {
    setMode(mode) {
      this.currentMode = mode;
      this.resetTimer();
    },
    toggleTimer() {
      if (this.running) {
        clearInterval(this.timer);
        this.running = false;
      } else {
        this.running = true;
        this.timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            clearInterval(this.timer);
            this.running = false;
            alert("Temps écoulé !");
          }
        }, 1000);
      }
    },
    resetTimer() {
      clearInterval(this.timer);
      this.running = false;
      this.timeLeft = this.modes[this.currentMode];
    }
  }
}).mount('#app');
