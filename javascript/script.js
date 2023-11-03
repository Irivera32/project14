
const images = document.querySelectorAll('#slider img');
console.log(images)
const previousImage = document.getElementById("prev");
const nextImage = document.getElementById("next");

let currentIndex = 0;

function reset() {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove('active');
  }
}

function initializeSlider() {
  reset();
  images[currentIndex].classList.add('active');
}

function slideLeft() {

  reset();
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  images[currentIndex].classList.add('active');
}

function slideRight() {
  reset();
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  images[currentIndex].classList.add('active');
}

initializeSlider();

previousImage.addEventListener('click', function() {
  slideLeft();
});

nextImage.addEventListener('click', function() {
  slideRight();
});

//fade in and out event 

const items = document.querySelectorAll('.item')


const options = {
  threshold: 0.5
}

function addSlideIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in');
    }
  });
}

const observer = new IntersectionObserver(addSlideIn, options)

items.forEach(item => {
  observer.observe(item);
})




//form validity

const form = document.getElementById('exampleForm')
const submitButton = document.querySelector('.submit')
const successMessage = document.getElementById('form-submitted-msg')


const formElements = [ ...form.elements ]

//check if all form elements are valid
const allInputsValid = () => {
  const valid = formElements.every((element) => {
    if (element.nodeName === 'SELECT') {
      return element.value !== 'Please select an option'
    } else {
      return element.checkValidity()
    }
  })


  return valid
}

// Handle changes to form element
const handleChange = () => {
  
  formElements.forEach((element) => {
    
    if (!element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.nodeName !== 'SELECT'  
          && element.type !== 'checkbox'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }

    // If the element is valid, reset style to the original colors
   
    if (element.checkValidity()
          && element.nodeName !== 'BUTTON'
          && element.nodeName !== 'SELECT'
          && element.type !== 'checkbox'
          && element.type !== 'radio'
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#CED4DA'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = '#212529'
    }

    // If the element is a checkbox or a radio button and is invalid, style it with a red border and red text
    if (!element.checkValidity()
          && (element.type === 'checkbox'
              || element.type === 'radio')
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
    }

    // If the checkbox or radio button is valid, reset its style to the original colors
    if (element.checkValidity()
          && (element.type === 'checkbox'
              || element.type === 'radio')
    ) {
      element.style.borderColor = '#CED4DA'
      element.nextElementSibling.style.color = '#212529'
    }

    // If the element is a select dropdown and the default option is selected, style it with a red border and red text
    if (element.nodeName === 'SELECT'
          && element.value === 'Please select an option'
    ) {
      element.style.borderColor = 'red'
      element.nextElementSibling.style.color = 'red'
      element.nextElementSibling.style.display = 'block'
      element.previousElementSibling.style.color = 'red'
    }

    // If an option other than the default is selected in the dropdown, reset its style to the original colors
    if (element.nodeName === 'SELECT'
          && element.value !== 'Please select an option'
    ) {
      element.style.borderColor = '#008080'
      element.nextElementSibling.style.color = '#008080'
      element.nextElementSibling.style.display = 'none'
      element.previousElementSibling.style.color = '#212529'
    }
  })

  // If all form elements are valid, enable the submit button; otherwise, disable it
  if (allInputsValid()) {
    submitButton.removeAttribute('disabled', '')
  } else {
    submitButton.setAttribute('disabled', '')
  }
}

// handle form submission
const handleSubmit = (e) => {
  // Prevent the default form submission behavior
  e.preventDefault()

//Success message, reset form, and disable the submit button
  if (allInputsValid()) {
    successMessage.style.display = 'block'
    form.reset()
    submitButton.setAttribute('disabled', '')

    // Hide the success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = 'none'
    }, 3000)
  }
}

//event listener
formElements.forEach((element) => {
  element.addEventListener('change', handleChange)
})

//submit listener
form.addEventListener('submit', (e) => handleSubmit(e))


//map at end of website
const map = L.map('map').setView([33.932449, //latitude
-116.981361], //longitude
            13);    //zoom

        const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);//attribution - google can be used too

        //radius circle
        var circle = L.circle([33.934920, -116.976750], {radius: 1000}).addTo(map);
