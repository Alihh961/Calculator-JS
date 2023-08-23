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

    if (numberArray.includes(buttonClicked)) {
      // if the button is a number
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
    } else if (isAnOperator(buttonClicked)) {
      // if the clicked button is an Operator
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
          previous.innerHTML += current.innerHTML;
          previous.innerHTML = eval(previous.innerHTML);
          previous.innerHTML += buttonClicked;
          current.innerHTML = "";
          lastClick = buttonClicked;
        } else {
          lastClick = buttonClicked;
          previous.innerHTML = current.innerHTML + buttonClicked;
          current.innerHTML = "";
        }
      }
    } else if (buttonClicked == "AC") {
      // if the button is AC
      lastClick = buttonClicked;
      current.innerHTML = "0";
      previous.innerHTML = "";
    } else if (buttonClicked == "=") {
      // if the button is Equal
      if (lastClick == buttonClicked) {
        // if we click equal two times in a row
        //ignore the click
      } else {
        lastClick = buttonClicked;
        previous.innerHTML += current.innerHTML;
        current.innerHTML = eval(previous.innerHTML);
      }
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
