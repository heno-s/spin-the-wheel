import createWheel, { calibrateWheel } from "./wheel.js";
import createOptions, { deleteOptions } from "./options.js";

const addOptionButton = document.querySelector(".add-option-button");
const addOptionForm = document.querySelector(".add-option-form");
const spinButton = document.querySelector(".spin-button");
const wheel = document.querySelector(".wheel");
const optionsDOM = document.querySelector(".options");

const options = ["50", "100", "100", "100", "100", "100"];

wheel.appendChild(createWheel(options));
calibrateWheel(360 / options.length / 2);
createOptions(options);

addOptionButton.addEventListener("click", (evt) => {
    addOptionForm.classList.remove("hide");
    addOptionButton.classList.add("hide");
});

addOptionForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const optionLabel = addOptionForm.optionLabel.value;

    options.push(optionLabel);

    deleteOptions();
    createOptions(options);

    addOptionForm.classList.add("hide");
    addOptionButton.classList.remove("hide");
});
