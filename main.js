import createWheel, { calibrateWheel, deleteWheel } from "./wheel.js";
import createOptions, { deleteOptions } from "./options.js";

const addOptionButton = document.querySelector(".add-option-button");
const addOptionForm = document.querySelector(".add-option-form");
const cancelAddOption = addOptionForm.querySelector(
    ".add-option-cancel"
);
const addOptionInput = addOptionForm.optionLabel;
const spinButton = document.querySelector(".spin-button");
const wheelOptions = document.querySelector(".wheel-options");
const optionsDOM = document.querySelector(".options");
const previousPrizeDOM = document.querySelector(
    "#previous-prize-value"
);
let isSpinning = false;
let previousPrize = "0$";

previousPrizeDOM.textContent = previousPrize;

let options = ["50", "100", "10", "present", "1000", "25", "100"];
let rotateDeg = 0;

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
document.addEventListener("spinEnd", (evt) => {
    previousPrize = evt.detail.previousPrize;
    console.log(previousPrize);
    const previousPrizeText = isNaN(+previousPrize)
        ? previousPrize
        : previousPrize + " $";
    previousPrizeDOM.textContent = previousPrizeText;
});

spinButton.addEventListener("click", (evt) => {
    if (isSpinning) {
        return;
    }
    isSpinning = true;
    const winnerIndex = Math.floor(Math.random() * options.length);
    const winnerOptionDOM = wheelOptions.querySelector(
        `[data-id="${winnerIndex}"]`
    );
    const winnerOptionRotateDeg = Math.round(
        // if there was floating number, computation of when to stop would never evaluate to true
        Number(
            winnerOptionDOM.style.transform.match(
                /\d+\.?\d*(?=deg)/
            )[0]
        ) || 1
    ); // if it is 0deg, computations will break, it needs to be more than 0

    console.log(winnerOptionDOM);
    console.log(winnerOptionRotateDeg);

    const rotateInterval = setInterval(() => {
        rotate(++rotateDeg);
    }, 0);

    setTimeout(() => {
        const checkInterval = setInterval(() => {
            if ((rotateDeg % 360) / winnerOptionRotateDeg === 1) {
                clearInterval(rotateInterval);
                clearInterval(checkInterval);
                isSpinning = false;
                document.dispatchEvent(
                    new CustomEvent("spinEnd", {
                        detail: {
                            previousPrize: options[winnerIndex],
                        },
                    })
                );
            }
        }, 0);
    }, 1000 + Math.random() * 1500);

    function rotate(deg) {
        wheelOptions.style.transform = `rotate(-${deg}deg)`;
    }
});

optionsDOM.addEventListener("click", (evt) => {
    if (isSpinning) {
        return;
    }
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
    if (isSpinning) {
        return;
    }

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
