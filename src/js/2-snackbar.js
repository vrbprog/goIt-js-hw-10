
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

  iziToast.settings({
      timeout: 3000, // default timeout
      resetOnHover: true,
      // icon: 'fa fa-user', // icon class
      transitionIn: 'bounceInDown',
      transitionOut: 'flipOutX',
      position: 'topRight'
  });

const createButton = document.querySelector("form button");
const promiseForm = document.querySelector("form");

createButton.addEventListener('click', (event) => {
  event.preventDefault();
  validateForm(promiseForm);
  promiseForm.reset();
});

function validateForm(promiseForm)
{
  const state = promiseForm.elements.state.value;
  const delay = promiseForm.elements.delay.value;
  if (delay === '' || state === '')
  {
    iziToast.error({ position: 'topCenter', title: 'Error', message: 'Input parameters of Promise' });
  }
  else {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise.then((delay) => {
      iziToast.success({ position: 'topRight', message: `✅ Fulfilled promise in ${delay} ms` });
    })
      .catch(delay => {
        iziToast.error({ position: 'topRight', message: `❌ Rejected promise in ${delay} ms` });
      });
  }
}



