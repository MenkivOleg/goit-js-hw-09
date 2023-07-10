import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Report.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

startButton.disabled = true;

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = new Date(datePicker.value);
  const currentDate = new Date();

  const timeRemaining = selectedDate - currentDate;

  if (timeRemaining <= 0) {
    return;
  }

  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);

  updateCountdown();
  startButton.disabled = true;
  datePicker.disabled = true; 
}

function updateCountdown() {
  const selectedDate = new Date(datePicker.value);
  const currentDate = new Date();
  const timeRemaining = selectedDate - currentDate;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    resetCountdown();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function resetCountdown() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  startButton.disabled = false;
  datePicker.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}