let buttons = document.querySelectorAll(".button");
let previous = document.querySelector(".previous");
let current = document.querySelector(".current");

let numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let operatorArray = ["/", "*", "-", "+"];
current.innerHTML = "0";
let equalOperationIsOn = false; // check if the last clicked caused an equal operation to reset the total if a number button is clicked
let lastClick = "";

// Mouse or touch

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let buttonClicked = event.target.innerHTML;

    let classList = event.target.classList;

    switch (true) {

      case classList.contains("number"):
        // if the button is a number
        handleNumberClick(operatorArray, previous, current, buttonClicked);
        break;

      case classList.contains("operator"):
        // if the clicked button is an Operator
        handleOperatorClick(lastClick, buttonClicked, current, previous);
        break;

      case classList.contains("restart"):
        {
          // if the button is AC
          lastClick = buttonClicked;
          current.innerHTML = "0";
          previous.innerHTML = "";
        }
        break;

      case classList.contains("equal"):
        {
          // if the button is Equal
          if (lastClick == buttonClicked) {
            // if we click equal two times in a row
            // or if the last character of previous is an operator
            //ignore the click
          } else {
            lastClick = buttonClicked;
            if (current.innerHTML == "") {
              current.innerHTML = "0";
            }
            previous.innerHTML += current.innerHTML;
            current.innerHTML = eval(previous.innerHTML);
          }
        }
        break;

      case classList.contains("decimal"):
        {
          if (!containsADecimal(current.innerHTML)) {
            //if it doesn't contain a decimal point

            lastClick = buttonClicked;
            current.innerHTML += buttonClicked;
          }
          //ignore the click if it contains a decimal
        }
        break;

      case classList.contains("delete"):
        {
          // if the button clicked is DEL

          if (current.innerHTML.length == 1) {
            //if the current contains only one number
            current.innerHTML = "0";
          } else {
            current.innerHTML = current.innerHTML.slice(0, -1);
          }
          lastClick = buttonClicked;
        }
        break;

      case classList.contains("negotation"):
        {
          lastClick = buttonClicked;
          if (current.innerHTML != "0") {
            //if the current isn't a ZERO
            if (current.innerHTML.charAt(0) != "-") {
              //if the current is not negative we add the minus operator
              current.innerHTML = "-" + current.innerHTML;
            } else {
              // if the current is negative we delete the minus operator
              current.innerHTML = current.innerHTML.slice(1);
            }
          }
        }
        break;
    }

  });
});

// Functions

function isAnOperator(value) {
  array = ["+", "-", "*", "/"];
  if (array.includes(value)) {
    return true;
  }
  return false;
}

function lastCharacterIsAnOperator(value) {
  arrayOfValue = value.toString().split("");

  if (isAnOperator(arrayOfValue[arrayOfValue.length - 1])) {
    return true;
  }
  return false;
}

function containsAnOperator(value) {
  arrayOfValue = value.toString().split("");
  if (
    arrayOfValue.includes("-") ||
    arrayOfValue.includes("+") ||
    arrayOfValue.includes("*") ||
    arrayOfValue.includes("/")
  ) {
    return true;
  }
  return false;
}

function getLastCharacter(value) {
  arrayOfValue = value.toString().split("");
  let lastValue = arrayOfValue[arrayOfValue.length - 1];
  return lastValue;
}

function containsADecimal(value) {
  arrayOfValue = value.toString().split("");
  if (arrayOfValue.includes(".")) {
    return true;
  } else {
    return false;
  }
}

function handleNumberClick(operatorArray, previous, current, buttonClicked) {
  if (operatorArray.includes(getLastCharacter(previous.innerHTML))) {
    // if the last char of previous is an operator
    if (isAnOperator(current.innerHTML)) {
      lastClick = buttonClicked;
      current.innerHTML += buttonClicked;
    } else {
      lastClick = buttonClicked;
      current.innerHTML += buttonClicked;
    }
  } else {
    if (current.innerHTML == "0") {
      current.innerHTML = buttonClicked;
    } else {
      current.innerHTML += buttonClicked;
    }
  }
}

function handleOperatorClick(lastClick, buttonClicked, current, previous) {
  if (isAnOperator(lastClick)) {
    if (lastClick == buttonClicked) {
      // if we click the same operator two times in a row
      //ignore the click
    } else if (lastClick == "-") {
      // if the last click "-"
      //ignore the click
    } else if (lastClick == "+") {
      if (buttonClicked == "-") {
        lastClick = current.innerHTML = buttonClicked;
      }
      // ignore the click for the operators + , /  and *
    } else if (lastClick == "*") {
      // if the last char in previous is "*"
      if (
        buttonClicked == "/" ||
        buttonClicked == "*" ||
        buttonClicked == "+"
      ) {
        //ignore the click
      } else if (buttonClicked == "-") {
        console.log("fklg");
      }
    } else {
      //if the last click is not an operator
      lastClick = buttonClicked;
      previous.innerHTML = current.innerHTML + buttonClicked;
      current.innerHTML = "";
    }
  } else {
    if (isAnOperator(getLastCharacter(previous.innerHTML))) {
      // if the last char of the previous is an operator
      previous.innerHTML = evaluateExpression(previous.innerHTML);
      previous.innerHTML += buttonClicked;
      current.innerHTML = "";
      lastClick = buttonClicked;
    } else {
      lastClick = buttonClicked;
      previous.innerHTML = current.innerHTML + buttonClicked;
      current.innerHTML = "";
    }
  }
}

function evaluateExpression(expression) {
  try {
    return new Function('return (' + expression + ')')();
  } catch (error) {
    return expression; // Return the original expression on error
  }
}

