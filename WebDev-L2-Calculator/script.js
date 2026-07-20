const historyDisplay = document.getElementById("historyDisplay");
const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const equalsBtn = document.getElementById("equals");


let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = null;

// Number buttons
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (operator === "") {
            firstNumber += button.innerText;
            display.value = firstNumber;
        } else {
            secondNumber += button.innerText;
            display.value = firstNumber + " " + operator + " " + secondNumber;
        }

    });
});


// Operator buttons
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {


        if (firstNumber === "" && button.innerText === "-") {
            firstNumber = "-";
            display.value = firstNumber;
            return;
        }
        
        if (firstNumber === "") return;

        // Operator chaining
        if (secondNumber !== "") {
            calculate();
            updateHistory(firstNumber + " " + operator + " " + secondNumber, result);
            firstNumber = result.toString();
            secondNumber = "";
        }

        operator = button.innerText;
        display.value = firstNumber + " " + operator;
    });
});

// Equals button
equalsBtn.addEventListener("click", () => {

    if (firstNumber === "" || secondNumber === "" || operator === "")
        return;

    calculate();

    if (result === "Error") {
        display.value = "Error";
    } else {
        display.value = result;
        updateHistory(firstNumber + " " + operator + " " + secondNumber, result);

        firstNumber = result.toString();
    }

    secondNumber = "";
    operator = "";
});

// Clear button
clearBtn.addEventListener("click", () => {

    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = null;

    display.value = "";
    historyDisplay.value = "";

});

// Backspace button
backspaceBtn.addEventListener("click", () => {

    if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        display.value = firstNumber;
    }
    else if (secondNumber === "") {
        operator = "";
        display.value = firstNumber;
    }
    else {
        secondNumber = secondNumber.slice(0, -1);
        display.value = firstNumber + " " + operator + " " + secondNumber;
    }

});


//keyboard support
document.addEventListener("keydown", (event) => {
    const key= event.key;

    if(key>="0" && key<="9"){
        if(operator===""){
            firstNumber += key;
            display.value = firstNumber;
        }
        else{
            secondNumber += key;
            display.value = firstNumber + " " + operator + " " + secondNumber;
        }
    }

    else if (key === "."){
        if(operator===""){
            if(!firstNumber.includes(".")){
                firstNumber +=".";
            }
            display.value = firstNumber;
        }
        else{
            if(!secondNumber.includes(".")){
                secondNumber +=".";
            }
            display.value = firstNumber + " " + operator + " " + secondNumber;
        }
    }

    else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%"){

        if (firstNumber === "" && key === "-") {
        firstNumber = "-";
        display.value = firstNumber;
        return;
        }

        if(firstNumber === "") return;

        if(secondNumber !== ""){
            calculate();
            firstNumber = result.toString();
            secondNumber = "";
        }

        operator = key;
        display.value = firstNumber + " " + operator; 
    }

    else if (key === "Enter" || key === "="){
        event.preventDefault();
        equalsBtn.click();
    }

    else if (key === "Backspace"){
        backspaceBtn.click();
    }

    else if (key === "Escape"){
        clearBtn.click();
    }
        
});


// Function to update history
function updateHistory(expression,result) {
    historyDisplay.value = expression + " = " + result + "\n" + historyDisplay.value;
}


// Function to perform calculation
function calculate() {

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                result = "Error";
            } else {
                result = num1 / num2;
            }
            break;

        case "%":
            result = (num1 * num2)/100;
            break;

        default:
            result = 0;

    }

}
