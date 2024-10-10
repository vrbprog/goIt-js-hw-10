// Описаний в документації
//import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
//import "simplelightbox/dist/simple-lightbox.min.css";


//const sgallery = new SimpleLightbox('.gallery-item a');
//sgallery.on('show.simplelightbox');

import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_blue.css"

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr("input#datetime-picker", options);