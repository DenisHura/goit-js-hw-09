function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const bodyEl = document.querySelector('body');
let timerId = null;


startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", true)
    timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
  
  
} )

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.removeAttribute("disabled")
});