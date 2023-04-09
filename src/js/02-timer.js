import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const TIME_DELAY = 1000;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    if (selectedDate[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr(datePicker, options);

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  const timerId = setInterval(() => {
    let difference = new Date(datePicker.value) - new Date();

    if (difference <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.success(
        'Сongratulations, you have reached the finish line!'
      );
    } else {
      days.textContent = convertMs(difference).days;
      hours.textContent = convertMs(difference).hours;
      minutes.textContent = convertMs(difference).minutes;
      seconds.textContent = convertMs(difference).seconds;
    }
  }, TIME_DELAY);
});
