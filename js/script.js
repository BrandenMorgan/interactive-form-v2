// Set focus on the first text field
document.getElementById("name").focus();

// Hide "Other" text field on ”Job Role” section
const otherJobRole = document.getElementById("other-title");
otherJobRole.style.display = "none";

const otherTitle = document.getElementById("title");
// Reveal text field when "Other" field is clicked
otherTitle.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

const designSelection = document.getElementById("design");
const designs = designSelection.children;
const colorSelection = document.getElementById("color");
const colors = colorSelection.children;

const pleaseSelect = document.createElement("option");
pleaseSelect.value = "Please select a T-shirt theme";
pleaseSelect.text = "Please select a T-shirt theme";
colorSelection.prepend(pleaseSelect);
colors[0].selected = true;

if (designs[0].textContent === "Select Theme") {
  for (let i = 0; i < colors.length; i++) {
    colors[i].hidden = true;
  }
}

designSelection.addEventListener("change", (e) => {
  const selection = e.target.value;
  console.log(selection);
  if (selection !== "Select Theme") {
    designSelection.removeChild(designs[0]);
    // colorSelection.removeChild(colors[0]);
    for (let i = 0; i < colors.length; i++) {
      colors[i].hidden = false;
    }
  }
  if (selection === "js puns") {
    colors[0].hidden = true;
    colors[4].hidden = true;
    colors[5].hidden = true;
    colors[6].hidden = true;
  } else if (selection === "heart js") {
    colors[0].hidden = true;
    colors[1].hidden = true;
    colors[2].hidden = true;
    colors[3].hidden = true;
  }
});
