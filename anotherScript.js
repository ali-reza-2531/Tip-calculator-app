const elements = {
    tipAmount: document.getElementById("tip-amount"),
    totalAmount: document.getElementById("total-amount"),
    bill: document.getElementById("bill"),
    people: document.getElementById("number-of-people"),
    reset: document.querySelector(".reset"),
    tipButtons: document.querySelectorAll(".tip"),
    customTip: document.getElementById("custom-tip"),
    errorMessage: document.querySelector(".error-message")
};
const calculations = {
    tipAmount: (bill, tip, people) => {
        const result = (bill * tip) / 100 / people;
        return !isNaN(result) && isFinite(result) ? result.toFixed(2) : "0.00";
    },
    totalAmount: (bill, tip, people) => {
        const result = (bill / people) + calculations.tipAmount(bill, tip, people);
        return !isNaN(result) && isFinite(result) ? result.toFixed(2) : "0.00";
    }
};
const isValid = (key, value) => value >= (key === "people" ? 1 : 0) && value <= (key === "tip" ? 100 : Infinity);
const reset = () => {
    elements.tipAmount.innerHTML = "$0.00";
    elements.totalAmount.innerHTML = "$0.00";
    elements.bill.value = "";
    elements.people.value = "";
    elements.tipButtons.forEach(button => button.classList.remove("active"));
    elements.customTip.value = "";
    elements.reset.classList.add("disabled");
    elements.errorMessage.classList.add("hidden");
    elements.bill.classList.remove("error");
    elements.people.classList.remove("error");
};
const handleInput = (element, key) => {
    if (isValid(key, +element.value)) {
        element.classList.remove("error");
        elements.errorMessage.classList.add("hidden");
        calculate();
        return;
    }
    element.classList.add("error");
    elements.errorMessage.classList.remove("hidden");
};
const calculate = () => {
    const bill = +elements.bill.value;
    const tip = +elements.customTip.value || elements.tipButtons.find(button => button.classList.contains("active")).dataset.tip;
    const people = +elements.people.value;
    if (isNaN(bill) || isNaN(tip) || isNaN(people)) {
        elements.tipAmount.innerHTML = "$0.00";
        elements.totalAmount.innerHTML = "$0.00";
        return;
    }
    elements.tipAmount.innerHTML = `$${calculations.tipAmount(bill, tip, people)}`;
    elements.totalAmount.innerHTML = `$${calculations.totalAmount(bill, tip, people)}`;
};
elements.bill.addEventListener("input", () => handleInput(elements.bill, "bill"));
elements.people.addEventListener("input", () => handleInput(elements.people, "people"));
elements.customTip.addEventListener("input", () => handleInput(elements.customTip, "tip"));
elements.tipButtons.forEach(button => button.addEventListener("click", () => {
    elements.tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    calculate();
}));
elements.reset.addEventListener("click", reset);
