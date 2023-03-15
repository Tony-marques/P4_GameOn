// Message error
export const firstNameErrorMessage = "Merci de renseigner votre prénom";
export const lastNameErrorMessage = "Merci de renseigner votre nom";
export const emailErrorMessage = "Merci de renseigner votre émail";
export const dateErrorMessage = "Merci de renseigner une date";
export const quantityErrorMessage = "Merci de renseigner une quantité (1-99)";
export const cityErrorMessage = "Veuillez selectionner une ville";
export const cgvErrorMessage = "Veuillez accepter les conditions";

// Message validation
export const pageValidationMessage = `
  <p>Merci ! Votre réservation a été reçue !</p>
  <button id="return">Revenir à l'accueil</button>
`;

// Regex
export const standardRegex = new RegExp(/^[a-zA-Z-]{2,}/);
export const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);