        class CountdownTimer {
    constructor(targetDate, elements) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = elements;
        this.interval = null;
    }

    calculateTimeLeft() {
        const now = new Date().getTime();
        const difference = this.targetDate - now;
        
        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isComplete: true
            };
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return {
            days,
            hours,
            minutes,
            seconds,
            isComplete: false
        };
    }

    formatTimeUnit(value) {
        return value < 10 ? `0${value}` : `${value}`;
    }

    updateDisplay() {
        const timeLeft = this.calculateTimeLeft();
        
        this.elements.days.textContent = this.formatTimeUnit(timeLeft.days);
        this.elements.hours.textContent = this.formatTimeUnit(timeLeft.hours);
        this.elements.minutes.textContent = this.formatTimeUnit(timeLeft.minutes);
        this.elements.seconds.textContent = this.formatTimeUnit(timeLeft.seconds);
        
        if (timeLeft.isComplete && this.interval) {
            clearInterval(this.interval);
            document.dispatchEvent(new CustomEvent('countdownComplete'));
        }
    }

    start() {
        this.updateDisplay();
        this.interval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize the countdown timer
const targetDate = new Date("2025-07-05T00:00:00"); // تاریخ پایان: 5 جولای 2025
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

const countdown = new CountdownTimer(targetDate, countdownElements);
countdown.start();
document.addEventListener('countdownComplete', () => {
    console.log('Countdown complete!');
});
