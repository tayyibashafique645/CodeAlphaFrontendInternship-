// ==============================
// Select Elements
// ==============================

const display = document.getElementById("display");

const expressionDisplay =
    document.getElementById("expression");

const buttons =
    document.querySelectorAll(".buttons button");

const historyList =
    document.getElementById("historyList");

const clearHistoryButton =
    document.getElementById("clearHistory");


// ==============================
// Variables
// ==============================

let currentExpression = "";

let justCalculated = false;


// ==============================
// Display Update
// ==============================

function updateDisplay() {

    display.value =
        currentExpression || "0";

}


// ==============================
// Add Value
// ==============================

function addValue(value) {

    if (justCalculated) {

        if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/" ||
            value === "%"
        ) {
            currentExpression += value;
        }

        else {
            currentExpression = value;
        }

        justCalculated = false;
    }

    else {
        currentExpression += value;
    }

    updateDisplay();
}


// ==============================
// Clear Calculator
// ==============================

function clearCalculator() {

    currentExpression = "";

    expressionDisplay.textContent = "";

    justCalculated = false;

    updateDisplay();
}


// ==============================
// Delete Last Character
// ==============================

function deleteLast() {

    if (justCalculated) {

        currentExpression = "";

        justCalculated = false;
    }

    else {

        currentExpression =
            currentExpression.slice(0, -1);
    }

    updateDisplay();
}


// ==============================
// Convert Percentage
// ==============================

function prepareExpression(expression) {

    return expression.replace(
        /(\d+(\.\d+)?)%/g,
        "($1/100)"
    );
}


// ==============================
// Calculate Basic Expression
// ==============================

function calculateExpression(expression) {

    let prepared =
        prepareExpression(expression);


    // Only allow calculator characters

    if (!/^[0-9+\-*/().\s]+$/.test(prepared)) {

        throw new Error("Invalid expression");
    }


    // Evaluate expression

    const result =
        Function(
            `"use strict"; return (${prepared})`
        )();


    if (
        typeof result !== "number" ||
        !Number.isFinite(result)
    ) {

        throw new Error("Invalid result");
    }


    return Number(
        result.toFixed(12)
    );
}


// ==============================
// Main Calculate Function
// ==============================

function calculate() {

    if (!currentExpression) {
        return;
    }


    try {

        const originalExpression =
            currentExpression;


        const result =
            calculateExpression(
                currentExpression
            );


        expressionDisplay.textContent =
            originalExpression + " =";


        currentExpression =
            String(result);


        updateDisplay();


        justCalculated = true;


        addHistory(
            originalExpression,
            result
        );


    }

    catch (error) {

        expressionDisplay.textContent =
            "Invalid calculation";

        currentExpression = "";

        display.value = "Error";

        justCalculated = true;

    }

}


// ==============================
// Scientific Functions
// ==============================

function useScientificFunction(functionName) {

    if (!currentExpression) {
        return;
    }


    try {

        let value =
            calculateExpression(
                currentExpression
            );

        let result;


        // Trigonometric functions use degrees

        if (functionName === "sin") {

            result =
                Math.sin(
                    value * Math.PI / 180
                );

        }

        else if (functionName === "cos") {

            result =
                Math.cos(
                    value * Math.PI / 180
                );

        }

        else if (functionName === "tan") {

            result =
                Math.tan(
                    value * Math.PI / 180
                );

        }

        else if (functionName === "sqrt") {

            if (value < 0) {
                throw new Error("Invalid");
            }

            result =
                Math.sqrt(value);

        }

        else if (functionName === "square") {

            result =
                value * value;

        }

        else if (functionName === "log") {

            if (value <= 0) {
                throw new Error("Invalid");
            }

            result =
                Math.log10(value);

        }

        else if (functionName === "reciprocal") {

            if (value === 0) {
                throw new Error("Invalid");
            }

            result =
                1 / value;

        }

        else {
            return;
        }


        result =
            Number(
                result.toFixed(12)
            );


        expressionDisplay.textContent =
            `${functionName}(${value}) =`;


        addHistory(
            `${functionName}(${value})`,
            result
        );


        currentExpression =
            String(result);


        updateDisplay();


        justCalculated = true;

    }

    catch (error) {

        expressionDisplay.textContent =
            "Invalid calculation";

        display.value =
            "Error";

        currentExpression = "";

        justCalculated = true;

    }

}


// ==============================
// Constants
// ==============================

function useConstant(value) {

    if (justCalculated) {

        currentExpression = "";

        justCalculated = false;
    }

    currentExpression += value;

    updateDisplay();

}


// ==============================
// History
// ==============================

function addHistory(
    expression,
    result
) {

    const emptyMessage =
        historyList.querySelector(
            ".empty-history"
        );


    if (emptyMessage) {
        emptyMessage.remove();
    }


    const historyItem =
        document.createElement("div");


    historyItem.className =
        "history-item";


    historyItem.innerHTML = `

        <div class="history-expression">
            ${escapeHtml(expression)}
        </div>

        <div class="history-result">
            = ${escapeHtml(String(result))}
        </div>

    `;


    historyList.prepend(historyItem);

}


// ==============================
// Escape History Text
// ==============================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==============================
// Clear History
// ==============================

clearHistoryButton.addEventListener(
    "click",
    function () {

        historyList.innerHTML = `

            <p class="empty-history">
                No calculations yet.
            </p>

        `;

    }
);


// ==============================
// Button Events
// ==============================

buttons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const value =
                button.dataset.value;

            const action =
                button.dataset.action;


            // Normal numbers/operators

            if (value !== undefined) {

                addValue(value);

                return;
            }


            // Actions

            if (action === "clear") {

                clearCalculator();

            }

            else if (action === "delete") {

                deleteLast();

            }

            else if (action === "calculate") {

                calculate();

            }

            else if (
                action === "sin" ||
                action === "cos" ||
                action === "tan" ||
                action === "sqrt" ||
                action === "square" ||
                action === "log" ||
                action === "reciprocal"
            ) {

                useScientificFunction(action);

            }

            else if (action === "pi") {

                useConstant(
                    String(Math.PI)
                );

            }

            else if (action === "e") {

                useConstant(
                    String(Math.E)
                );

            }

        }

    );

});


// ==============================
// Keyboard Support
// ==============================

document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key;


        // Numbers

        if (
            (key >= "0" && key <= "9") ||
            key === "." ||
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%" ||
            key === "(" ||
            key === ")"
        ) {

            event.preventDefault();

            addValue(key);

            return;
        }


        // Enter

        if (key === "Enter" || key === "=") {

            event.preventDefault();

            calculate();

            return;
        }


        // Backspace

        if (key === "Backspace") {

            event.preventDefault();

            deleteLast();

            return;
        }


        // Escape

        if (key === "Escape") {

            event.preventDefault();

            clearCalculator();

        }

    }
);


// ==============================
// Initial Display
// ==============================

updateDisplay();