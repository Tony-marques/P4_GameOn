import * as utils from "./utils.js";

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

/**
 * @description launch modal form
 */
function launchModal() {
   modalbg.style.display = "block";
}

/**
 * @description check if form is correctly completed
 */
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
      cgv.parentElement.dataset.error = utils.cgvErrorMessage;
      cgv.parentElement.setAttribute("data-error-visible", "true");
      isCheckedForm = false;
   }

   if (isCheckedForm) {
      pageValidation();
   }
}

/**
 *
 * @param {*} input
 * @description check if input field is correctly completed
 * @returns {boolean}
 */
function checkInput(input) {
   switch (input.id) {
      case "firstname":
         return utils.standardRegex.test(input.value);
      case "lastname":
         return utils.standardRegex.test(input.value);
      case "email":
         return utils.emailRegex.test(input.value);
      case "birthdate":
         return !!input.value;
      case "quantity":
         return parseInt(input.value);
      default:
         return false;
   }
}

/**
 *
 * @description check city input
 * @returns {boolean}
 */
function checkRadio() {
   for (let input of inputsRadio) {
      if (input.checked) {
         return true;
      }
   }
   return false;
}

/**
 *
 * @param {*} input
 * @description Display error message for first 5 input
 * @returns {HTMLElement}
 */
function errorMsgInput(input) {
   input.closest(".formData").setAttribute("data-error-visible", true);
   switch (input.id) {
      case "firstname":
         input.closest(".formData").dataset.error = utils.firstNameErrorMessage;
         break;
      case "lastname":
         input.closest(".formData").dataset.error = utils.lastNameErrorMessage;
         break;
      case "email":
         input.closest(".formData").dataset.error = utils.emailErrorMessage;
         break;
      case "birthdate":
         input.closest(".formData").dataset.error = utils.dateErrorMessage;
         break;
      case "quantity":
         input.closest(".formData").dataset.error = utils.quantityErrorMessage;
         break;
      default:
         return "";
   }
}

/**
 * @description Display error message for city input
 */
function errorMsgCity() {
   const radioContainer =
      document.querySelector("input[type=radio]").parentElement;
   radioContainer.dataset.error = utils.cityErrorMessage;
   radioContainer.setAttribute("data-error-visible", "true");
}

/**
 * @description reset all error message input
 */
function errorMsgReset() {
   const inputs = document.querySelectorAll("input");
   inputs.forEach((input) => {
      const inputContainer = input.parentElement;
      inputContainer.dataset.error = "";
      inputContainer.setAttribute("data-error-visible", "false");
   });
}

/**
 * @description if form is correctly completed, display page validation
 */
function pageValidation() {
   modalBody.style.display = "none";
   const div = document.createElement("div");
   div.classList.add("validation");
   div.innerHTML = utils.pageValidationMessage;
   modalContent.appendChild(div);
   document.querySelector("#return").addEventListener("click", () => {
      modalBody.style.display = "block";
      div.style.display = "none";
      modalbg.style.display = "none";
      form.reset();
   });
}
