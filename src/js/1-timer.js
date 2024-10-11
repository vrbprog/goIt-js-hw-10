
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

function validateSelectDate(date) {

  if (date.getTime() < Date.now()) {
    iziToast.error({ title: 'Error', message: 'Illegal date' });
  }
  else {
    iziToast.info({ position: "center", title: 'Hello', message: 'iziToast.info()' });
    startButton.disabled = false;
  }
  console.log(date);
}

const timerDays = document.querySelector(".value[data-days]");
const timerHours = document.querySelector(".value[data-hours]");
const timerSeconds = document.querySelector(".value[data-seconds]");

const startButton = document.querySelector("button[data-start]");
startButton.disabled = true;
startButton.addEventListener('click', () => {
  
  if (deadLine.getTime() > Date.now()) {
    let counter = 19;
    timerSeconds.textContent = counter;
    startButton.disabled = true;

    const timeinterval = setInterval(() => {
      if (counter <= 0) {
        clearInterval(timeinterval);
        iziToast.info({ position: "center", title: 'Hello', message: 'iziToast.info()' });
      } else {
        counter--;
        timerSeconds.textContent = counter;
      }
    }, 1000);
  } else {
    iziToast.info({ position: "center", title: 'Hello', message: 'iziToast.info()' });
  }
  
});



