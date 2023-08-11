function createOption(label, index) {
    const optionDOM = document.createElement("li");
    optionDOM.classList.add("option");
    optionDOM.dataset.id = index;
    optionDOM.innerHTML = `<div class="option-label">${label}</div>
  <div class="option-delete">x</div>`;

    return optionDOM;
}

function deleteOptions() {
    const options = document.querySelector(".options");
    options.innerHTML = "";
}

export default function createOptions(options) {
    const optionsDOM = document.querySelector(".options");
    options.forEach((optionLabel, index) => {
        const optionDOM = createOption(optionLabel, index);
        optionsDOM.appendChild(optionDOM);
    });
}

export { deleteOptions };
