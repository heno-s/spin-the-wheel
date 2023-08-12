import createWheel, { calibrateWheel, deleteWheel } from "./wheel.js";
import createOptions, { deleteOptions } from "./options.js";

const addOptionButton = document.querySelector(".add-option-button");
const addOptionForm = document.querySelector(".add-option-form");
const cancelAddOption = addOptionForm.querySelector(
    ".add-option-cancel"
);
const addOptionInput = addOptionForm.optionLabel;
const spinButton = document.querySelector(".spin-button");
const wheel = document.querySelector(".wheel");
const optionsDOM = document.querySelector(".options");

let options = ["50", "100", "100", "100", "100", "100"];

createWheel(options);
calibrateWheel(360 / options.length / 2);
createOptions(options);

const optionsChange = new Event("optionsChange");
document.addEventListener("optionsChange", (evt) => {
    deleteOptions();
    deleteWheel();
    createOptions(options);
    createWheel(options);
    calibrateWheel(360 / options.length / 2);
});

optionsDOM.addEventListener("click", (evt) => {
    const t = evt.target;
    if (t.classList.contains("option-delete") && options.length > 2) {
        const optionDOM = t.closest(".option");

        const indexToDelete = +optionDOM.dataset.id;
        options = options.filter(
            (option, index) => index !== indexToDelete
        );
        document.dispatchEvent(optionsChange);
    }
});

addOptionButton.addEventListener("click", (evt) => {
    addOptionForm.classList.remove("hide");
    addOptionButton.classList.add("hide");
    addOptionInput.focus();
});

addOptionForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const optionLabel = addOptionForm.optionLabel.value;

    options.push(optionLabel);
    document.dispatchEvent(optionsChange);

    addOptionForm.classList.add("hide");
    addOptionButton.classList.remove("hide");
    addOptionInput.value = "";
});

cancelAddOption.addEventListener("click", (evt) => {
    addOptionForm.classList.add("hide");
    addOptionButton.classList.remove("hide");
    addOptionInput.value = "";
});
