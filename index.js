let TIME_LIMIT = 60;
let timer_text = document.querySelector("#curr_time");
let accuracy_text = document.querySelector("#curr_accuracy");
let error_text = document.querySelector("#curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
let restart = document.querySelector(".restart");
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;
// define quotes to be used
let quotes_array = [
  `When I was attempting to sell the cloud computing services part of the Loudcloud business, I met with Bill Campbell to update him on where I was with the deal. `,
  `The concept of lifestyle design as a replacement for multi-staged career planning is sound. `,
  `I was supposedly one of the best in the world, but it just didn’t register. My partner Alicia shifted from foot to foot as we stood in line with nine other couples, all chosen from over 1,000 competitors from 29 countries and four continents. `,
  `Pretty much a conversation ender. It’s only half true, besides. The whole truth would take too long. How can I possibly explain that what I do with my time and what I do for money are completely different things? `,
  `Life doesn’t have to be so damn hard. It really doesn’t. Most people, my past self included, have spent too much time convincing themselves that life has to be hard, a resignation to 9-to-5 drudgery in exchange for (sometimes) relaxing weekends and the occasional keep-it-short-or-get-fired vacation.`,
  `Do I have to quit or hate my job? Do I have to be a risk-taker? No on all three counts. From using Jedi mind tricks to disappear from the office to designing businesses that finance your lifestyle, there are paths for every comfort level. `,
  `I was supposedly one of the best in the world, but it just didn’t register. My partner Alicia shifted from foot to foot as we stood in line with nine other couples, all chosen from over 1,000 competitors from 29 countries and four continents. `,
  `Assuming you can find me (hard to do), and depending on when you ask me (I’d prefer you didn’t), I could be racing motorcycles in Europe, scuba diving off a private island in Panama, resting under a palm tree between kickboxing sessions in Thailand, or dancing tango in Buenos Aires.`,
  `If you’ve picked up this book, chances are that you don’t want to sit behind a desk until you are 62.`,
  `In the last five years, I have answered this question for myself, and this book will answer it for you. `,
];
function updateQuote() {
  quote_text.textContent = null;
  quoteNo = Math.random() * 10;
  quoteNo = Math.round(quoteNo);
  if (quoteNo == 10) {
    quoteNo = quoteNo - 1;
  }
  current_quote = quotes_array[quoteNo];
  // separate each character and make an element
  // out of each of them to individually style them
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });
  // roll over to the first quote
  // if (quoteNo < quotes_array.length - 1) quoteNo++;
  // else quoteNo = 0;
}
function processCurrentText() {
  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split("");

  // increment total characters typed
  characterTyped++;

  errors = 0;

  let quoteSpanArray = quote_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    // character not currently typed
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");

      // correct character
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
      // incorrect character
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}
function startGame() {
  resetValues();
  updateQuote();
  // clear old and start a new timer
  clearInterval(timer);
  restart_btn.style.display = "none";
  restart.style.display = "none";
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;
  input_area.value = "";
  quote_text.textContent = "Click on the area below to start the game.";
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  restart_btn.style.display = "none";
}
function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;
    // increase the time elapsed
    timeElapsed++;
    // update the timer text
    timer_text.textContent = timeLeft + "s";
  } else {
    // finish the game
    finishGame();
  }
}
function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.value = "";
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on restart to start a new game.";

  // display restart button
  restart_btn.style.display = "block";
  restart.style.display = "block";
  // calculate cpm and wpm
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}
