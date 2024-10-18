
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
    startButton.disabled = false;
  }
}

const timerWidget = {};
timerWidget.days = document.querySelector(".value[data-days]");
timerWidget.hours = document.querySelector(".value[data-hours]");
timerWidget.minutes = document.querySelector(".value[data-minutes]");
timerWidget.seconds = document.querySelector(".value[data-seconds]");

startButton.disabled = true;
startButton.addEventListener('click', () => {
  const startTime = Date.now();
  if (deadLine.getTime() > startTime) {
    selectDate.disabled = true;
    startButton.disabled = true;
    let counter = deadLine.getTime() - startTime;
    updateTimerValues(timerWidget, counter);
      const timeInterval = setInterval(() => {
        counter -= 1000;
        if (counter <= 0) {
          clearInterval(timeInterval);
          selectDate.disabled = false;
          iziToast.success({ position: "center", title: 'Finished', message: 'Event happened' });
        } 
        updateTimerValues(timerWidget, counter);
      }, 1000);
  } else {
    iziToast.info({ position: "center", title: 'Passed', message: 'The event has passed' });
    startButton.disabled = true;
  }
});

function updateTimerValues(timerWidget, counter)
{
  const { days, hours, minutes, seconds } = timerWidget;

    const remainingTime = convertMs(counter > 0 ? counter : 0);
    seconds.textContent = addLeadingZero(remainingTime.seconds);
    minutes.textContent = addLeadingZero(remainingTime.minutes);
    hours.textContent = addLeadingZero(remainingTime.hours);
    days.textContent = addLeadingZero(remainingTime.days);
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


