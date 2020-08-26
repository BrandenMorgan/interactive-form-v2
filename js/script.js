//  add DOMContentLoaded listener
const form = document.querySelector("form");
// Name, Email and Job role fields
const basicInfoContainer = document.querySelector("fieldset");
const name = document.getElementById("name");
// Set focus on the name text field to make cursor appear on load
name.focus();
const nameErrorMessage = document.createElement("h6");
nameErrorMessage.textContent = "*Name field required";
const email = document.getElementById("mail");
const emailErrorMessage = document.createElement("h6");
emailErrorMessage.textContent = "*Email required";

//  Hide "Other" text field on ”Job Role” section
const otherTitle = document.getElementById("title");
const otherJobRole = document.getElementById("other-title");
otherJobRole.hidden = true;
const otherJobRoleErrorMessage = document.createElement("h6");
otherJobRoleErrorMessage.textContent = "*Field required";

// Get design and color options
const designSelection = document.getElementById("design");
const designs = designSelection.children;
const colorSelection = document.getElementById("color");
const colors = colorSelection.children;

// Append new option element to tshirt color before design selection is made
const pleaseSelect = document.createElement("option");
const shirtColorContainer = document.getElementById("shirt-colors");
shirtColorContainer.hidden = true;
pleaseSelect.value = "Please select a T-shirt theme";
pleaseSelect.text = "Please select a T-shirt theme";
colorSelection.prepend(pleaseSelect);
colors[0].selected = true;

// Activities check boxes
// Store checkboxes to use in event listener and for loop
const checkboxes = document.querySelectorAll(".activities input");
const activities = document.querySelectorAll(".activities input");
const activitiesContainer = document.querySelector(".activities legend");
const activitiesErrorMessage = document.createElement("h6");
activitiesErrorMessage.textContent = "*You must select at least one activity";
// Create and append Total dollar amount display to checkboxes
const totalDisplay = document.createElement("p");
document.querySelector(".activities").appendChild(totalDisplay);

// Select payment option elements. Show credit card by default
const creditCard = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
payPal.hidden = true;
const bitCoin = document.getElementById("bitcoin");
bitCoin.hidden = true;

// Credit Card billing info fields
const credit = document.getElementById("cc-num");
const creditInfoContainer = document.querySelector("#credit-card .col-6");
const creditErrorMessage = document.createElement("h6");
creditErrorMessage.textContent = "*Please enter a credit card number";

const zipCode = document.getElementById("zip");
const zipCodeInfoContainer = document.querySelector("#credit-card .col-3");
const zipCodeErrorMessage = document.createElement("h6");
zipCodeErrorMessage.textContent = "*Zip code required";

const cvv = document.getElementById("cvv");
const cvvInfoContainer = zipCodeInfoContainer.nextElementSibling;
const cvvErrorMessage = document.createElement("h6");
cvvErrorMessage.textContent = "*Cvv required";

/*
 Append an error message to an input fields parent container element.
 Show if bad input is entered
*/
function appendErrorMessage(field, errorMessage, container) {
  field.style.border = "thin solid red";
  errorMessage.style.color = "red";
  if (field === activities[0]) {
    errorMessage.style.marginBottom = "0px";
    container.insertBefore(errorMessage, field.previousElementSibling);
  } else {
    errorMessage.style.cssFloat = "right";
    errorMessage.style.margin = "0px";
    errorMessage.hidden = false;
    container.insertBefore(errorMessage, field);
  }
}

// Reveal text field when "Other" field is clicked
otherTitle.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRole.hidden = false;
  } else {
    // Hide it if any other role is selected
    otherJobRole.hidden = true;
    otherJobRoleErrorMessage.hidden = true;
    otherJobRole.style.border = "thin solid white";
  }
});

// Hide all color options if no design selection made
if (designs[0].textContent === "Select Theme") {
  for (let i = 0; i < colors.length; i++) {
    colors[i].hidden = true;
  }
}
// Show/hide color options depending on design choice
designSelection.addEventListener("change", (e) => {
  const selection = e.target.value;
  if (
    selection !== "Select Theme" &&
    designs[0].textContent === "Select Theme" &&
    colors[0].textContent === "Please select a T-shirt theme"
  ) {
    designSelection.removeChild(designs[0]);
    colorSelection.removeChild(colors[0]);
  }
  if (selection === "js puns") {
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].textContent.includes("JS Puns")) {
        shirtColorContainer.hidden = false;
        colors[i].hidden = false;
        colors[i].selected = true;
      } else {
        colors[i].hidden = true;
      }
    }
  } else if (selection === "heart js") {
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].textContent.includes("JS shirt only")) {
        shirtColorContainer.hidden = false;
        colors[i].selected = true;
        colors[i].hidden = false;
      } else {
        colors[i].hidden = true;
      }
    }
  }
});

// Keep track of running total
let runningTotal = 0;
// Event listener for checkboxes
document.querySelector(".activities").addEventListener("change", (e) => {
  const clicked = e.target;
  // get attribute value of clicked checkbox
  const clickedDayAndTime = clicked.getAttribute("data-day-and-time");
  for (let i = 0; i < checkboxes.length; i++) {
    // Get attribute value of checkbox in current iteration
    const checkboxDayAndTime = checkboxes[i].getAttribute("data-day-and-time");
    /* Check that the clicked checkbox and the checkbox in the current iteration have the same type
      AND
      Check that the clicked checkbox is not the checkbox in the current iteration
     */
    if (clickedDayAndTime === checkboxDayAndTime && clicked !== checkboxes[i]) {
      if (clicked.checked) {
        // If the checkbox is clicked, disable checkbox[i]
        checkboxes[i].disabled = true;
      } else {
        // else do not disable checkbox[i]
        checkboxes[i].disabled = false;
      }
    }
  }
  // Convert value of data-cost to a number
  let clickedCost = parseInt(clicked.getAttribute("data-cost"));
  if (clicked.checked) {
    // Add value of clickedCost to running total if box is checked
    runningTotal += clickedCost;
  } else {
    // Else subtract if unclicked
    runningTotal -= clickedCost;
  }
  // Display the total
  totalDisplay.textContent = `Total: $${runningTotal}`;
});

// Get payment option elements in collection
const paymentOption = document.querySelectorAll("#payment option");
// remove option "select method" to select credit card by default
if (paymentOption[0].value === "select method") {
  document.getElementById("payment").removeChild(paymentOption[0]);
}
// Set event listener on payment option elements
document.getElementById("payment").addEventListener("change", (e) => {
  const clicked = e.target.value;
  // Hide/Show payment options depending on user click
  if (clicked === "paypal") {
    payPal.hidden = false;
    creditCard.hidden = true;
    bitCoin.hidden = true;
  } else if (clicked === "bitcoin") {
    bitCoin.hidden = false;
    creditCard.hidden = true;
    payPal.hidden = true;
  } else {
    creditCard.hidden = false;
    bitCoin.hidden = true;
    payPal.hidden = true;
  }
});

/****        Field validation        ****/

const nameValidator = () => {
  const userName = name.value;
  // If there is text in name field hide the error message
  if (userName.length > 0) {
    name.style.border = "thin solid white";
    nameErrorMessage.hidden = true;
    return true;
  } else {
    // If no text show the error
    appendErrorMessage(name, nameErrorMessage, basicInfoContainer);
    return false;
  }
};

const emailValidator = () => {
  const userEmail = email.value;
  const atSymbolIndex = userEmail.indexOf("@");
  const lastDotIndex = userEmail.lastIndexOf(".");
  const emailRegex = /^\w+@\w+\.\w{2,3}(\.\w{2,3})?$/;
  // If email does not contain an '@' show an error
  if (userEmail.indexOf("@") === -1 && userEmail.length > 0) {
    emailErrorMessage.textContent = "*Email must contain '@' symbol";
  }
  // If email does contain an '@' but not a domain show an error
  if (
    userEmail.indexOf("@") > -1 &&
    userEmail.length > 0 &&
    lastDotIndex <= atSymbolIndex
  ) {
    emailErrorMessage.textContent =
      "*The domain portion of the email is invalid (everything after the '@')";
  }

  // Check if the format of email is correct
  if (
    atSymbolIndex > 1 &&
    lastDotIndex > atSymbolIndex + 1 &&
    emailRegex.test(userEmail)
  ) {
    email.style.border = "thin solid white";
    emailErrorMessage.hidden = true;
    return true;
  } else {
    // otherwise show error message
    appendErrorMessage(email, emailErrorMessage, basicInfoContainer);
    return false;
  }
};

const otherJobRoleValidation = () => {
  const userJobRole = otherJobRole.value;
  // Check if field has text
  if (userJobRole.length > 0) {
    otherJobRole.style.border = "thin solid white";
    otherJobRoleErrorMessage.hidden = true;
    return true;
  } else {
    // Show error message
    appendErrorMessage(
      otherJobRole,
      otherJobRoleErrorMessage,
      basicInfoContainer
    );
    return false;
  }
};

const activitiesValidator = () => {
  // Loop over activities checkboxes
  for (let i = 0; i < activities.length; i++) {
    // Check if 1 or more are checked
    if (activities[i].checked) {
      activitiesErrorMessage.hidden = true;
      return true;
    }
  }
  // Show error message
  appendErrorMessage(
    activities[0],
    activitiesErrorMessage,
    activitiesContainer
  );
  return false;
};

const creditCardValidator = () => {
  const userCC = credit.value;
  // Check the format of the userCC
  const creditRegex = /^\s*?\d{4}\s?-?\d{4}\s?-?\d{4}\s?-?\d{1,4}\s*?$/;
  // If shorter than 13 numbers show an error message
  if (userCC.length >= 1 && userCC.length < 13) {
    creditErrorMessage.textContent =
      "*Please enter a number between 13 and 16 digits long";
  }
  // If the pattern is matched allow submission
  if (creditRegex.test(userCC)) {
    credit.style.border = "thin solid white";
    creditErrorMessage.hidden = true;
    return true;
  } else {
    // Show an error
    appendErrorMessage(credit, creditErrorMessage, creditInfoContainer);
    return false;
  }
};

const zipCodeValidator = () => {
  const userZipCode = zipCode.value;
  // Check the format of the userZipCode
  const zipRegex = /^\s*?\d{5}\s*?$/;
  // If less than 5 numbers show an error message
  if (userZipCode.length >= 1 && userZipCode.length < 5) {
    zipCodeErrorMessage.textContent = "*Please enter a valid 5 digit zip code";
  }
  // If pattern is matched allow submission
  if (zipRegex.test(userZipCode)) {
    zipCode.style.border = "thin solid white";
    zipCodeErrorMessage.hidden = true;
    return true;
  } else {
    // Show an error
    appendErrorMessage(zipCode, zipCodeErrorMessage, zipCodeInfoContainer);
    return false;
  }
};

const cvvValidator = () => {
  const userCvv = cvv.value;
  const cvvRegex = /^\s*?\d{3}\s*?$/;
  // If pattern is matched allow submission
  if (cvvRegex.test(userCvv)) {
    cvv.style.border = "thin solid white";
    cvvErrorMessage.hidden = true;
    return true;
  } else {
    // Show an error
    appendErrorMessage(cvv, cvvErrorMessage, cvvInfoContainer);
    return false;
  }
};

/*
  Show error on email, credit card number and zip code fields as soon as user
  begins to type up until all conditions are met. Prevent submission and
  show error message if not
*/
email.addEventListener("keyup", (e) => {
  if (!emailValidator()) {
    e.preventDefault();
  }
});
credit.addEventListener("keyup", (e) => {
  if (!creditCardValidator()) {
    e.preventDefault();
  }
});
zipCode.addEventListener("keyup", (e) => {
  if (!zipCodeValidator()) {
    e.preventDefault();
  }
});
/*
  Listen for submit event to make sure all conditions are met.
  Prevent submission and show error message if not
*/
form.addEventListener("submit", (e) => {
  if (otherJobRole.hidden === false && !otherJobRoleValidation()) {
    e.preventDefault();
  }
  if (!nameValidator()) {
    e.preventDefault();
  }
  if (!emailValidator()) {
    e.preventDefault();
  }
  if (!activitiesValidator()) {
    e.preventDefault();
  }
  // If credit card is the selected payment option. Run validators
  if (!creditCard.hidden) {
    if (!creditCardValidator()) {
      e.preventDefault();
    }
    if (!zipCodeValidator()) {
      e.preventDefault();
    }
    if (!cvvValidator()) {
      e.preventDefault();
    }
  }
});
