const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const bill = document.getElementById("bill");
const people = document.getElementById("number-of-people");
const reset = document.querySelector(".reset");
const tipButtons = document.querySelectorAll(".tip");
const customTip = document.getElementById("custom-tip");
const errorMessage = document.querySelector(".error-message");
let tip = 0;


bill.addEventListener("input", () => {
    enableReset();
    if(isValid("bill", bill.value)) {
        bill.classList.remove("error");
        calculateBill();
        return;
    }
    bill.classList.add("error");
    return;
});

people.addEventListener("input", () => {
    enableReset();
    if(isValid("people", people.value)) {
        people.classList.remove("error");
        errorMessage.classList.add("hidden");
        calculateBill();
        return;
    }
    people.classList.add("error");
    errorMessage.classList.remove("hidden");
});

customTip.addEventListener("input", () => {
    enableReset();
    if(isValid("tip", customTip.value)) {
        customTip.classList.remove("error");
        tip = customTip.value;
        calculateBill();
        return;
    }
    customTip.classList.add("error");
});

tipButtons.forEach(button => {
    button.addEventListener("click", () => {
        enableReset();
        tipButtons.forEach(btn => resetButton(btn));
        button.classList.add("active");
        tip = button.dataset.tip;
        calculateBill();
    });
});


reset.addEventListener("click", () => { 
    bill.value = "";
    people.value = "";
    tipButtons.forEach(button => resetButton(button));
    reset.classList.add("disabled");
    customTip.value = "";
    tipAmount.innerHTML = "$0.00";
    totalAmount.innerHTML = "$0.00";
    bill.classList.remove("error");
    people.classList.remove("error");
    errorMessage.classList.add("hidden");
});

const calculateBill = () => {
    const tipAmountResult = ((bill.value * tip) / 100) / people.value;
    const totalAmountResult = (bill.value / people.value) + tipAmountResult;
    if(isNaN(tipAmountResult)|| isNaN(totalAmountResult) || isFinite(tipAmountResult) === false || isFinite(totalAmountResult) === false) {
        tipAmount.innerHTML = "$0.00";
        totalAmount.innerHTML = "$0.00";
        return;
    }
    tipAmount.innerHTML = `$${tipAmountResult.toFixed(2)}`;
    totalAmount.innerHTML = `$${totalAmountResult.toFixed(2)}`;

};
const enableReset = () => {
    reset.classList.remove("disabled");
    reset.classList.add("enabled");
}
const resetButton = (button) => {
    if(button.classList.contains("active")) {
        button.classList.remove("active");
    }
    button.classList.remove("error");
}
const validations = {
    bill: (value) => !(value < 0),
    tip: (value) => !(value < 0 || value > 100),
    people: (value) => !(value < 1)
}
const isValid = (key, value) => validations[key](value);