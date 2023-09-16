(function calculator() {
  let firstOperand = null;
  let secondOperand = null;
  let operation = null;
  let shouldDigitAppend = false;

  const display = (() => {
    let displayStr = "0";

    return (value = "0", shouldAppend = false) => {
      displayStr = shouldAppend ? displayStr + value : value;
      document.getElementById("display").innerText = displayStr;
      return displayStr;
    };
  })();

  let currentNumber = +display();

  (function setUpEventHandlers() {
    Array.from(document.getElementsByClassName("digit")).forEach((digitBtn) =>
      digitBtn.addEventListener("click", handleDigitClick)
    );

    Array.from(document.getElementsByClassName("operation")).forEach(
      (operationBtn) => operationBtn.addEventListener("click", handleOperation)
    );

    document
      .getElementById("clear")
      .addEventListener("click", handleClearClick);

    document
      .getElementById("equal")
      .addEventListener("click", handleEqualClick);

    window.addEventListener("keydown", handleKeyDown);
  })();

  function handleKeyDown(e) {
    let button = document.querySelector(`button[data-key="${e.key}"]`);
    if (button) button.click();
  }

  function handleOperation(e) {
    function getOperationFromString(str) {
      switch (str) {
        case "add":
          return add;
        case "subtract":
          return subtract;
        case "multiply":
          return multiply;
        case "divide":
          return divide;
        default:
          return null;
      }
    }

    if (firstOperand === null) firstOperand = currentNumber;
    else {
      secondOperand = currentNumber;
      calculate();
    }

    // Needs to be set after to handle operation chaining
    operation = getOperationFromString(e.target.id);
    shouldDigitAppend = false;
  }

  function handleDigitClick(e) {
    currentNumber = +display(e.target.innerText, shouldDigitAppend);
    shouldDigitAppend = true;
  }

  function handleClearClick(e) {
    firstOperand = null;
    secondOperand = null;
    operation = null;
    shouldDigitAppend = false;
    currentNumber = +display();
  }

  function handleEqualClick() {
    secondOperand = currentNumber;
    calculate();
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  function calculate() {
    let solution = round(operate(operation, firstOperand, secondOperand), 8);

    if (solution !== null) {
      display(solution);
      currentNumber = null;
      firstOperand = solution;
      secondOperand = null;
      shouldDigitAppend = false;
    }
  }

  function operate(operation, a, b) {
    if (operation === null || a === null || b === null) return null;
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
})();
