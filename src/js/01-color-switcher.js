const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor;
}

function startColorSwitching() {
    startButton.disabled = true; 
    stopButton.disabled = false;
  intervalId = setInterval(changeColor, 1000); // Запускаємо зміну кольору кожну секунду
}


function stopColorSwitching() {
    startButton.disabled = false;
    stopButton.disabled = true;
  clearInterval(intervalId); // Зупиняємо зміну кольору
}

startButton.addEventListener('click', startColorSwitching);

stopButton.addEventListener('click', stopColorSwitching);