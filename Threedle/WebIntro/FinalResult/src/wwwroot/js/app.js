// Load the data from the JSON file
const data = await new Promise((resolve, reject) => {
    fetch("./data/source.json")
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
});

// Set up our variables
// Set up button event listener
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", SubmitResponse);

// Select random word from the data
let randomizedWordFromData = data[Math.floor(Math.random() * data.length)];
const randomWord = randomizedWordFromData.toLowerCase();

let failedAttempts = 0;

// Get the HTML elements we need to work with
const wordTable1 = document.getElementById("wordTable1");
const wordTable2 = document.getElementById("wordTable2");
const wordTable3 = document.getElementById("wordTable3");

// Get the input elements we need to work with
const firstLetter1 = document.getElementById("firstLetter1");
const secondLetter1 = document.getElementById("secondLetter1");
const thirdLetter1 = document.getElementById("thirdLetter1");

const firstLetter2 = document.getElementById("firstLetter2");
const secondLetter2 = document.getElementById("secondLetter2");
const thirdLetter2 = document.getElementById("thirdLetter2");

const firstLetter3 = document.getElementById("firstLetter3");
const secondLetter3 = document.getElementById("secondLetter3");
const thirdLetter3 = document.getElementById("thirdLetter3");

// hide the tables we don't need
wordTable2.style.display = "none";
wordTable3.style.display = "none";

function SubmitResponse() {
    let firstLetter = "";
    let secondLetter = "";
    let thirdLetter = "";

    let currentTable = null;

    // get the values depending on how many attempts we've had
    switch (failedAttempts) {
        case 0:
            firstLetter = firstLetter1.value.toLowerCase();
            secondLetter = secondLetter1.value.toLowerCase();
            thirdLetter = thirdLetter1.value.toLowerCase();
            currentTable = wordTable1;
            break;
        case 1:
            firstLetter = firstLetter2.value.toLowerCase();
            secondLetter = secondLetter2.value.toLowerCase();
            thirdLetter = thirdLetter2.value.toLowerCase();
            currentTable = wordTable2;
            break;
        case 2:
            firstLetter = firstLetter3.value.toLowerCase();
            secondLetter = secondLetter3.value.toLowerCase();
            thirdLetter = thirdLetter3.value.toLowerCase();
            currentTable = wordTable3;
            break;        
        default:
            break;
    }

    // assemble the word
    let word = firstLetter + secondLetter + thirdLetter;

    // set it lowercase
    word = word.toLowerCase();

    // first check if the word is correct
    if (word === randomWord) {
        console.log("Correct!");
        alert("Correct!");

        // prompt to reload the page
        if (confirm("Play again?")) {
            location.reload();
        }

    }

    // check if any of the letters are correct and in the right place
    if (firstLetter === randomWord[0]) {
        currentTable.rows[0].cells[0].style.backgroundColor = "green";
    }

    if (secondLetter === randomWord[1]) {
        currentTable.rows[0].cells[1].style.backgroundColor = "green";
    }

    if (thirdLetter === randomWord[2]) {
        currentTable.rows[0].cells[2].style.backgroundColor = "green";
    }

    // check if any of the letters are correct but in the wrong place
    if (firstLetter === randomWord[1] || firstLetter === randomWord[2]) {
        currentTable.rows[0].cells[0].style.backgroundColor = "yellow";
    }

    if (secondLetter === randomWord[0] || secondLetter === randomWord[2]) {
        currentTable.rows[0].cells[1].style.backgroundColor = "yellow";
    }

    if (thirdLetter === randomWord[0] || thirdLetter === randomWord[1]) {
        currentTable.rows[0].cells[2].style.backgroundColor = "yellow";
    }

    // increment the failed attempts
    failedAttempts++;

    // if we've had 3 failed attempts, we've lost
    if (failedAttempts === 3) {
        console.log("You lost!");
        alert("You lost!");

        // prompt to reload the page
        if (confirm("Play again?")) {
            location.reload();
        }
    }

    // show the next table
    currentTable.nextElementSibling.style.display = "block";
}

// We're loaded! Say hello!
console.log("Hello from app.js!");
console.log("The random word is: " + randomWord);
console.log("Let's play!");