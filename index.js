let firstOperand, secondOperand, operation;
let display = "0";

init();

function init() {
  Array.from(document.getElementsByClassName("digit")).forEach((digitBtn) =>
    digitBtn.addEventListener("click", handleDigitClick)
  );

  document.getElementById("clear").addEventListener("click", handleClearClick);
}

function handleDigitClick(e) {
  let digit = e.target.innerText;
  // string concat
  updateDisplay(display === "0" ? digit : display + digit);
}

function handleClearClick(e) {
  updateDisplay(0);
}

function updateDisplay(value) {
  display = value.toString();
  document.getElementById("display").innerText = display;
}

function operate(operation, a, b) {
  return operation(a, b);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
