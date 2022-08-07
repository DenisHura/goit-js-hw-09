import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dataInputEl = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysEl = document.querySelector(".value[data-days]")
const hoursEl = document.querySelector(".value[data-hours]")
const minutesEl = document.querySelector(".value[data-minutes]")
const secondsEl = document.querySelector(".value[data-seconds]")

startBtn.disabled = true

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
    
        const selectedDate = selectedDates[0].getTime();

        if (selectedDate < Date.now()) {
            startBtn.setAttribute("disabled", true);
            window.alert("Please choose a date in the future");
            return;
        }
      
        startBtn.disabled = false;
     
        function timer() {
            const intervalId = setInterval(() => {
                const currentDate = Date.now();
                const deadline = selectedDates[0];
                const delta = deadline - currentDate;
               
                if (delta <= 0) {
                    clearInterval(intervalId);
                    return;
                }
                convertMs(delta);
                
            }, 1000);
        }
    
startBtn.addEventListener("click", timer);
    }

}
flatpickr("#datetime-picker", options);


function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    
    
    return { days, hours, minutes, seconds };
    
    }

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}