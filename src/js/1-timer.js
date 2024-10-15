
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_blue.css"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let  deadLine = null;

  iziToast.settings({
      timeout: 3000, // default timeout
      resetOnHover: true,
      // icon: 'fa fa-user', // icon class
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      position: 'topCenter'
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadLine = selectedDates[0];
    validateSelectDate(selectedDates[0]);
  },
};

flatpickr("input#datetime-picker", options);

const startButton = document.querySelector("button[data-start]");
const selectDate = document.querySelector("input#datetime-picker");

function validateSelectDate(date) {
  if (date.getTime() < Date.now()) {
    iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
    startButton.disabled = true;
  }
  else {
    //iziToast.info({ position: "center", title: 'Hello', message: 'iziToast.info()' });
    startButton.disabled = false;
  }
  console.log(date);
}

const timerWidget = {};
timerWidget.days = document.querySelector(".value[data-days]");
timerWidget.hours = document.querySelector(".value[data-hours]");
timerWidget.minutes = document.querySelector(".value[data-minutes]");
timerWidget.seconds = document.querySelector(".value[data-seconds]");

startButton.disabled = true;
startButton.addEventListener('click', () => {
  if (deadLine.getTime() > Date.now()) {
    selectDate.disabled = true;
    startButton.disabled = true;
    let counter = deadLine.getTime() - Date.now();
    const delay = counter % 1000;
    counter -= delay;
    updateTimerValues(timerWidget, counter);
    setTimeout(() => {
      if (counter > 0) {
        const timeinterval = setInterval(() => {
          if ((counter - 1000) == 0) {
            clearInterval(timeinterval);
            iziToast.info({ position: "center", title: 'Finished', message: 'Event happened' });
            updateTimerValues(timerWidget, 0);
            selectDate.disabled = false;
          } else {
            counter -= 1000;
            updateTimerValues(timerWidget, counter);
          }
        }, 1000);
      } else {
        iziToast.info({ position: "center", title: 'Finished', message: 'Event happened' });
        startButton.disabled = false;
      }
    }, delay);
  } else {
    iziToast.info({ position: "center", title: 'Finished', message: 'Event happened' });
    startButton.disabled = false;
  }
});

function updateTimerValues(timerWidget, counter)
{
    const { days, hours, minutes, seconds } = timerWidget;
    seconds.textContent = addLeadingZero(convertMs(counter).seconds);
    minutes.textContent = addLeadingZero(convertMs(counter).minutes);
    hours.textContent = addLeadingZero(convertMs(counter).hours);
    days.textContent = addLeadingZero(convertMs(counter).days);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value > 9) return value;
  return value.toString().padStart(2, '0');
}


