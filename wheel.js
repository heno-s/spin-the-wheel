const wheelOptionsDOM = document.querySelector(".wheel-options");
const WHEEL_WIDTH = 300;
const MAX_DEGREE = 360;

function calibrateWheel(by) {
    const wheelOptionsDOM = document.querySelector(".wheel-options");
    wheelOptionsDOM.style.transform = `rotate(${by}deg)`;
}

function deleteWheel() {
    const wheelOptionsDOM = document.querySelector(".wheel-options");
    wheelOptionsDOM.innerHTML = "";
}

function createOptionDOM(label) {
    const optionDOM = document.createElement("div");
    optionDOM.classList.add("wheel-option");
    const labelDOM = document.createElement("span");
    labelDOM.textContent = label;

    optionDOM.appendChild(labelDOM);
    return optionDOM;
}

export default function createWheel(options) {
    options.forEach((option, index) => {
        let optionWidth = (Math.PI * WHEEL_WIDTH) / options.length;
        const optionDOM = createOptionDOM(option);
        optionDOM.style.transform = `rotate(calc(${
            MAX_DEGREE / options.length
        }deg * ${index}))`;
        if (options.length === 2) {
            optionDOM.style.clipPath =
                "polygon(0 0, 100% 0, 100% 50%, 0 50%)";
        } else if (options.length === 3) {
            optionDOM.style.clipPath = `polygon(100% 0, 100% 20%, 50% 50%, 0 20%, 0 0)`;
        } else {
            optionDOM.style.clipPath = `polygon(100% 0, 100% ${
                100 / (options.length + 2) / Math.log(options.length)
            }%, 50% 50%, 0 ${
                100 / (options.length + 2) / Math.log(options.length)
            }%, 0 0)`;
        }
        optionDOM.style.width = `${optionWidth}px`;

        wheelOptionsDOM.appendChild(optionDOM);
    });
}

export { calibrateWheel, deleteWheel };
