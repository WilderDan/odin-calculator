(function calculator() {
  let firstOperand = null;
  let secondOperand = null;
  let operation = null;
  let shouldDigitAppend = false;

  const display = (() => {
    let onDisplay = "0";

    return (value = "0", shouldAppend = false) => {
      onDisplay = shouldAppend ? onDisplay + value : value;
      document.getElementById("display").innerText = onDisplay;
      return onDisplay;
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
  })();

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
    operation = getOperationFromString(e.target.id);
    firstOperand = currentNumber;
    shouldDigitAppend = false;
  }

  function handleDigitClick(e) {
    currentNumber = +display(e.target.innerText, shouldDigitAppend);
    shouldDigitAppend = true;
  }

  function handleClearClick(e) {
    resetOperation();
    currentNumber = +display();
  }

  function handleEqualClick() {
    secondOperand = currentNumber;
    let solution = operate(operation, firstOperand, secondOperand);
    if (solution !== null) currentNumber = display(solution);
    resetOperation();
  }

  function resetOperation() {
    firstOperand = null;
    secondOperand = null;
    operation = null;
    shouldDigitAppend = false;
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
