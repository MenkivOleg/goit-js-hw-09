const startButton = document.querySelector('[data-start]');  // Визначаємо кнопку старт
const stopButton = document.querySelector('[data-stop]');  // Визначаємо кнопку стоп

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;  // Функція рандомних кольорів
}

function changeColor() {
  const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor; // Функція зміни кольорів
}

function startColorSwitching() {
    startButton.disabled = true; 
    stopButton.disabled = false;
  intervalId = setInterval(changeColor, 1000); // функція зміни кольору кожну секунду
}


function stopColorSwitching() {
    startButton.disabled = false;
    stopButton.disabled = true;
  clearInterval(intervalId); // Зупиняємо зміну кольору
}

startButton.addEventListener('click', startColorSwitching);

stopButton.addEventListener('click', stopColorSwitching);