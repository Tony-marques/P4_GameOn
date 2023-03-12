// Regex
const standardRegex = new RegExp(/^[a-zA-Z-]{2,}/);
const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector(".modal-body");
const modalContent = document.querySelector(".content");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
const inputs = document.querySelectorAll(".text-control");
const inputsRadio = document.querySelectorAll("input[type='radio']");
const cgv = document.querySelector("#checkbox1");
const navBtn = document.querySelector(".icon");
const menu = document.querySelector(".topnav .main-navbar");
let hidden = true;

// LISTENER
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Toggle for menu
navBtn.addEventListener("click", () => {
   if (!hidden) {
      menu.style.display = "none";
      hidden = true;
   } else {
      menu.style.display = "flex";
      hidden = false;
   }
});

// Close modal
closeBtn.addEventListener("click", (e) => {
   modalbg.style.display = "none";
   errorMsgReset();
});

// Submit form
form.addEventListener("submit", (e) => {
   e.preventDefault();
   errorMsgReset();
   checkForm();
});

// FUNCTIONS
// launch modal form
function launchModal() {
   modalbg.style.display = "block";
}

function checkForm() {
   let isCheckedForm = true;

   for (let input of inputs) {
      if (!checkInput(input)) {
         errorMsgInput(input);
         isCheckedForm = false;
      }
   }

   if (!checkRadio()) {
      errorMsgCity();
      isCheckedForm = false;
   }

   if (!cgv.checked) {
      cgv.parentElement.dataset.error = "Veuillez accepter les conditions";
      cgv.parentElement.setAttribute("data-error-visible", "true");
      isCheckedForm = false;
   }

   if (isCheckedForm) {
      pageValidation();
   }
}

function checkInput(input) {
   switch (input.id) {
      case "firstname":
         return standardRegex.test(input.value);
         break;
      case "lastname":
         return standardRegex.test(input.value);
         break;
      case "email":
         return emailRegex.test(input.value);
         break;
      case "birthdate":
         return input.value != "" ? true : false;
         break;
      case "quantity":
         return parseInt(input.value);
         break;
      default:
         return false;
   }
}

// Check the city input
function checkRadio() {
   for (let input of inputsRadio) {
      if (input.checked) {
         return true;
      }
   }
   return false;
}

// Display error message for first 5 input
function errorMsgInput(input) {
   input.closest(".formData").setAttribute("data-error-visible", true);
   switch (input.id) {
      case "firstname":
         input.closest(".formData").dataset.error =
            "Merci de renseigner votre prénom";
         break;
      case "lastname":
         input.closest(".formData").dataset.error =
            "Merci de renseigner votre nom";
         break;
      case "email":
         input.closest(".formData").dataset.error =
            "Merci de renseigner votre émail";
         break;
      case "birthdate":
         input.closest(".formData").dataset.error =
            "Merci de renseigner une date";
         break;
      case "quantity":
         input.closest(".formData").dataset.error =
            "Merci de renseigner une quantité";
         break;
      default:
         return "";
   }
}

// Display error message for city input
function errorMsgCity() {
   const radioContainer =
      document.querySelector("input[type=radio]").parentElement;
   radioContainer.dataset.error = "Veuillez selectionner une ville";
   radioContainer.setAttribute("data-error-visible", "true");
}

// reset all error message input
function errorMsgReset() {
   const inputs = document.querySelectorAll("input");
   inputs.forEach((input) => {
      const inputContainer = input.parentElement;
      inputContainer.dataset.error = "";
      inputContainer.setAttribute("data-error-visible", "false");
   });
}

// page confirmation
function pageValidation() {
   modalBody.style.display = "none";
   const div = document.createElement("div");
   div.classList.add("validation");
   div.innerHTML = `
      <p>Merci ! Votre réservation a été reçue !</p>
      <button id="return">Revenir à l'accueil</button>
  `;
   modalContent.appendChild(div);
   document.querySelector("#return").addEventListener("click", () => {
      modalBody.style.display = "block";
      div.style.display = "none";
      modalbg.style.display = "none";
      form.reset();
   });
}
