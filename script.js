console.log("Rook Polynomial Explorer loaded successfully!");


// ======================================================
// ACTIVITY 1
// ======================================================

const activity1Buttons = document.querySelectorAll(
    '[data-activity="activity1"]'
);

activity1Buttons.forEach(button => {

    button.addEventListener("click", () => {

        const result = document.getElementById("activity1-result");

        result.classList.add("show");

        if (button.dataset.answer === "not-attacking") {

            result.innerHTML = `
                <strong>✓ Correct!</strong><br>
                The rooks are not attacking each other.
                They are placed in different rows and different
                columns, so this is a valid non-attacking placement.
            `;

        } else {

            result.innerHTML = `
                <strong>✗ Not quite.</strong><br>
                The rooks are actually non-attacking because
                they are in different rows and different columns.
            `;

        }

    });

});


// ======================================================
// ACTIVITY 2
// ======================================================

const activity2Buttons = document.querySelectorAll(
    '[data-activity="activity2"]'
);

activity2Buttons.forEach(button => {

    button.addEventListener("click", () => {

        const result = document.getElementById("activity2-result");

        result.classList.add("show");

        if (button.dataset.answer === "correct") {

            result.innerHTML = `
                <strong>✓ Correct! Arrangement B is valid.</strong><br>
                The two rooks are in different rows and different
                columns, so they cannot attack each other.
            `;

        } else {

            result.innerHTML = `
                <strong>✗ Not quite.</strong><br>
                In this arrangement, the two rooks share either
                a row or a column. Therefore, they can attack
                each other.
            `;

        }

    });

});


// ======================================================
// ACTIVITY 3
// ======================================================

const activity3Buttons = document.querySelectorAll(
    '[data-activity="activity3"]'
);

activity3Buttons.forEach(button => {

    button.addEventListener("click", () => {

        const result = document.getElementById("activity3-result");

        result.classList.add("show");

        if (button.dataset.answer === "4") {

            result.innerHTML = `
                <strong>✓ Correct!</strong><br>
                A 2 × 2 board has 4 squares, and one rook can
                be placed on any of them. Therefore,
                r₁ = 4.
            `;

        } else {

            result.innerHTML = `
                <strong>✗ Not quite.</strong><br>
                A 2 × 2 board contains 4 squares, so one rook
                can be placed in 4 different positions.
            `;

        }

    });

});


// ======================================================
// ACTIVITY 4
// ======================================================

const activity4Buttons = document.querySelectorAll(
    '[data-activity="activity4"]'
);

activity4Buttons.forEach(button => {

    button.addEventListener("click", () => {

        const result = document.getElementById("activity4-result");

        result.classList.add("show");

        if (button.dataset.answer === "6") {

            result.innerHTML = `
                <strong>✓ Correct!</strong><br>
                A 3 × 3 board has 9 squares. Three squares are
                restricted, leaving 6 available squares.
                Therefore, r₁ = 6.
            `;

        } else {

            result.innerHTML = `
                <strong>✗ Not quite.</strong><br>
                There are 9 squares in total and 3 restricted
                squares. Therefore, 9 − 3 = 6 squares are
                available.
            `;

        }

    });

});


// ======================================================
// INTERACTIVE TOOL
// ======================================================

const createBoardButton =
    document.getElementById("create-board");

const boardSizeSelect =
    document.getElementById("board-size");

const interactiveBoard =
    document.getElementById("interactive-board");

const rookModeButton =
    document.getElementById("rook-mode");

const restrictModeButton =
    document.getElementById("restrict-mode");

const modeInstruction =
    document.getElementById("mode-instruction");

const checkRooksButton =
    document.getElementById("check-rooks");

const resetBoardButton =
    document.getElementById("reset-board");

const rookResult =
    document.getElementById("rook-result");

const calculateRookNumbersButton =
    document.getElementById("calculate-rook-numbers");

const polynomialResult =
    document.getElementById("polynomial-result");


// ======================================================
// CURRENT MODE
// ======================================================

let currentMode = "rook";


// ======================================================
// ROOK MODE
// ======================================================

rookModeButton.addEventListener("click", () => {

    currentMode = "rook";

    modeInstruction.textContent =
        "Current mode: Place Rook";

});


// ======================================================
// RESTRICT MODE
// ======================================================

restrictModeButton.addEventListener("click", () => {

    currentMode = "restrict";

    modeInstruction.textContent =
        "Current mode: Restrict Square";

});


// ======================================================
// CREATE BOARD
// ======================================================

function createBoard() {

    const size = Number(boardSizeSelect.value);

    // Clear the old board
    interactiveBoard.innerHTML = "";


    // Create rows
    for (let row = 0; row < size; row++) {

        const boardRow =
            document.createElement("div");

        boardRow.classList.add("interactive-row");


        // Create cells
        for (let col = 0; col < size; col++) {

            const cell =
                document.createElement("div");

            cell.classList.add("interactive-cell");


            // ------------------------------------------
            // CELL CLICK
            // ------------------------------------------

            cell.addEventListener("click", () => {


                // PLACE ROOK MODE
                if (currentMode === "rook") {

                    // Cannot place rook on restricted square
                    if (
                        cell.classList.contains(
                            "restricted-cell"
                        )
                    ) {
                        return;
                    }


                    // Place or remove rook
                    if (cell.textContent === "♜") {

                        cell.textContent = "";

                    } else {

                        cell.textContent = "♜";

                    }

                }


                // RESTRICT SQUARE MODE
                else if (currentMode === "restrict") {

                    // Remove rook if one exists
                    if (cell.textContent === "♜") {

                        cell.textContent = "";

                    }


                    // Toggle restriction
                    cell.classList.toggle(
                        "restricted-cell"
                    );


                    if (
                        cell.classList.contains(
                            "restricted-cell"
                        )
                    ) {

                        cell.textContent = "✕";

                    } else {

                        cell.textContent = "";

                    }

                }

            });


            boardRow.appendChild(cell);

        }

        interactiveBoard.appendChild(boardRow);

    }


    // Clear previous results when a new board is created

    if (rookResult) {

        rookResult.innerHTML = "";
        rookResult.classList.remove("show");

    }

    if (polynomialResult) {

        polynomialResult.innerHTML =
            "No calculation yet.";

        polynomialResult.classList.remove("show");

    }

}


// ======================================================
// CREATE BOARD BUTTON
// ======================================================

createBoardButton.addEventListener(
    "click",
    createBoard
);

// ======================================================
// RESET BOARD BUTTON
// ======================================================

resetBoardButton.addEventListener(
    "click",
    createBoard
);


// ======================================================
// CHECK ROOK PLACEMENT
// ======================================================

checkRooksButton.addEventListener("click", () => {

    const size =
        Number(boardSizeSelect.value);

    const cells =
        interactiveBoard.querySelectorAll(
            ".interactive-cell"
        );


    const rookPositions = [];


    // Find all rooks
    cells.forEach((cell, index) => {

        if (cell.textContent === "♜") {

            const row =
                Math.floor(index / size);

            const col =
                index % size;


            rookPositions.push({
                row: row,
                col: col
            });

        }

    });


    rookResult.classList.add("show");


    // No rooks
    if (rookPositions.length === 0) {

        rookResult.innerHTML = `
            <strong>No rooks placed.</strong><br>
            Please place at least one rook on the board.
        `;

        return;

    }


    // Check every pair of rooks
    for (
        let i = 0;
        i < rookPositions.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < rookPositions.length;
            j++
        ) {

            // Same row OR same column
            if (
                rookPositions[i].row === rookPositions[j].row ||
                rookPositions[i].col === rookPositions[j].col
            ) {

                rookResult.innerHTML = `
                    <strong>
                        ✗ The rooks are attacking each other.
                    </strong><br>
                    Two rooks are in the same row or column.
                    This is not a valid non-attacking placement.
                `;

                return;

            }

        }

    }


    // No conflicts found
    rookResult.innerHTML = `
        <strong>✓ Valid placement!</strong><br>
        All ${rookPositions.length} rook(s) are in different
        rows and different columns. Therefore, the rooks
        are non-attacking.
    `;

});


// ======================================================
// CALCULATE ROOK NUMBERS
// ======================================================

calculateRookNumbersButton.addEventListener(
    "click",
    () => {

        const size =
            Number(boardSizeSelect.value);


        const cells =
            interactiveBoard.querySelectorAll(
                ".interactive-cell"
            );


        const availableSquares = [];


        // ------------------------------------------
        // FIND AVAILABLE SQUARES
        // ------------------------------------------

        cells.forEach((cell, index) => {

            if (
                !cell.classList.contains(
                    "restricted-cell"
                )
            ) {

                const row =
                    Math.floor(index / size);

                const col =
                    index % size;


                availableSquares.push({
                    row: row,
                    col: col
                });

            }

        });


        // ------------------------------------------
        // ROOK NUMBERS
        // ------------------------------------------

        const rookNumbers =
            new Array(size + 1).fill(0);


        // There is exactly one way to place zero rooks
        rookNumbers[0] = 1;


        // ------------------------------------------
        // RECURSIVE COUNTING FUNCTION
        // ------------------------------------------

        function countPlacements(
            squareIndex,
            rooksPlaced,
            usedRows,
            usedColumns
        ) {


            // Maximum number of rooks
            if (rooksPlaced > size) {

                return;

            }


            // All squares have been considered
            if (
                squareIndex ===
                availableSquares.length
            ) {

                // r₀ is already set to 1.
                // Count only placements containing
                // one or more rooks.

                if (rooksPlaced > 0) {

                    rookNumbers[rooksPlaced]++;

                }

                return;

            }


            const square =
                availableSquares[squareIndex];


            const row =
                square.row;

            const col =
                square.col;


            // --------------------------------------
            // OPTION 1:
            // DO NOT PLACE A ROOK
            // --------------------------------------

            countPlacements(
                squareIndex + 1,
                rooksPlaced,
                usedRows,
                usedColumns
            );


            // --------------------------------------
            // OPTION 2:
            // PLACE A ROOK
            // --------------------------------------

            if (
                !usedRows.has(row) &&
                !usedColumns.has(col)
            ) {

                usedRows.add(row);
                usedColumns.add(col);


                countPlacements(
                    squareIndex + 1,
                    rooksPlaced + 1,
                    usedRows,
                    usedColumns
                );


                // Backtrack
                usedRows.delete(row);
                usedColumns.delete(col);

            }

        }


        // Start counting
        countPlacements(
            0,
            0,
            new Set(),
            new Set()
        );


        // ------------------------------------------
        // DISPLAY ROOK NUMBERS
        // ------------------------------------------

        let result = `
            <strong>Rook Numbers:</strong>
            <br><br>
        `;


        for (
            let i = 0;
            i <= size;
            i++
        ) {

            result += `
                r<sub>${i}</sub> =
                ${rookNumbers[i]}
                ${i < size ? "&nbsp;&nbsp;&nbsp;" : ""}
            `;

        }


        // ------------------------------------------
        // BUILD ROOK POLYNOMIAL
        // ------------------------------------------

        let polynomial = "";


        for (
            let i = 0;
            i <= size;
            i++
        ) {

            const coefficient =
                rookNumbers[i];


            // Constant term
            if (i === 0) {

                polynomial += coefficient;

            }


            // Terms containing x
            else if (coefficient > 0) {

                polynomial +=
                    ` + ${coefficient}x`;


                // Add power for x², x³, etc.
                if (i > 1) {

                    polynomial +=
                        `<sup>${i}</sup>`;

                }

            }

        }


        // ------------------------------------------
        // DISPLAY POLYNOMIAL
        // ------------------------------------------

        result += `
            <br><br>

            <strong>Rook Polynomial:</strong>
            <br><br>

            <span style="font-size: 22px;">
                R<sub>B</sub>(x) = ${polynomial}
            </span>
        `;


        polynomialResult.innerHTML =
            result;

        polynomialResult.classList.add(
            "show"
        );

    }
);


// ======================================================
// CREATE DEFAULT 3 × 3 BOARD
// ======================================================

createBoard();

// ======================================================
// EXERCISES QUIZ
// ======================================================

const quizForm = document.getElementById("quiz-form");
const quizScore = document.getElementById("quiz-score");
const quizResult = document.getElementById("quiz-result");
const submitQuizButton = document.getElementById("submit-quiz");
const restartQuizButton = document.getElementById("restart-quiz");
let quizSubmitted = false;

const quizQuestions = [
    {
        name: "q1",
        answer: "placements",
        answerLabel: "B. The number of ways to place k non-attacking rooks",
        feedbackId: "exercise1-result",
        explanation: "By definition, r<sub>k</sub> counts the placements of exactly k rooks on allowed squares with no two rooks sharing a row or column."
    },
    {
        name: "q2",
        answer: "b",
        answerLabel: "B. The rooks are in different rows and different columns",
        feedbackId: "exercise2-result",
        explanation: "In arrangement B, the rooks occupy different rows and columns. Arrangements A and C share a row and a column, respectively."
    },
    {
        name: "q3",
        answer: "4",
        answerLabel: "B. 4",
        feedbackId: "exercise3-result",
        explanation: "For one rook, every allowed square is a possible placement. The board has four allowed squares, so r<sub>1</sub> = 4."
    },
    {
        name: "q4",
        answer: "2",
        answerLabel: "B. 2",
        feedbackId: "exercise4-result",
        explanation: "The two rooks must occupy different rows and columns. The two valid placements are the two diagonals, so r<sub>2</sub> = 2."
    },
    {
        name: "q5",
        answer: "one-plus-three-x-plus-x-squared",
        answerLabel: "A. R<sub>B</sub>(x) = 1 + 3x + x<sup>2</sup>",
        feedbackId: "exercise5-result",
        explanation: "There is one way to place zero rooks, three allowed squares for one rook, and one non-attacking placement of two rooks. Thus r<sub>0</sub> = 1, r<sub>1</sub> = 3, r<sub>2</sub> = 1."
    }
];

quizForm.addEventListener("submit", event => {
    event.preventDefault();

    if (quizSubmitted) {
        return;
    }

    quizSubmitted = true;
    let score = 0;

    quizQuestions.forEach(question => {
        const selectedAnswer = quizForm.querySelector(
            `input[name="${question.name}"]:checked`
        );
        const isCorrect = selectedAnswer?.value === question.answer;
        const feedback = document.getElementById(question.feedbackId);

        if (isCorrect) {
            score += 10;
            feedback.innerHTML = `
                <strong>✓ Correct.</strong><br>
                ${question.explanation}
            `;
        } else {
            feedback.innerHTML = `
                <strong>${selectedAnswer ? "✗ Not quite." : "Not answered."}</strong><br>
                Correct answer: ${question.answerLabel}.<br>
                ${question.explanation}
            `;
        }

        feedback.classList.add("show");
    });

    quizScore.textContent = String(score);

    let performanceMessage;
    if (score === 50) {
        performanceMessage = "Perfect score! You have an excellent understanding of rook polynomials.";
    } else if (score >= 40) {
        performanceMessage = "Excellent work! You have a strong grasp of the concepts.";
    } else if (score >= 20) {
        performanceMessage = "Good effort! Review the explanations and try again to strengthen your understanding.";
    } else {
        performanceMessage = "Keep practicing! Review the explanations and the examples above, then try again.";
    }

    quizResult.innerHTML = `
        <strong>Quiz complete: ${score} / 50 points.</strong><br>
        ${performanceMessage}
    `;
    quizResult.classList.add("show");
    submitQuizButton.disabled = true;
    quizForm.querySelectorAll('input[type="radio"]').forEach(input => {
        input.disabled = true;
    });
});

restartQuizButton.addEventListener("click", () => {
    quizForm.reset();
    quizSubmitted = false;
    quizScore.textContent = "0";
    quizResult.textContent = "";
    quizResult.classList.remove("show");
    submitQuizButton.disabled = false;

    quizForm.querySelectorAll('input[type="radio"]').forEach(input => {
        input.disabled = false;
    });

    quizQuestions.forEach(question => {
        const feedback = document.getElementById(question.feedbackId);
        feedback.textContent = "";
        feedback.classList.remove("show");
    });
});