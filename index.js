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
  `When I was attempting to sell the cloud computing services part of the Loudcloud business, I met with Bill Campbell to update him on where I was with the deal. The deal was critical, because without it, the company would almost certainly go bankrupt.After I carefully briefed him on where we were with both interested parties,IBM and EDS, Bill paused for a moment. He looked me in the eyes and said, “Ben, you need to do something in addition to working on this deal. You need to do it alone with your general counsel. You need to prepare the company for bankruptcy.” To an objective observer, this might sound like Bill was prudently advising me to build my contingency plan. But something in his voice and his eyes said something different. They said that he believed the contingency plan was going to be the plan.`,
  `The concept of lifestyle design as a replacement for multi-staged career planning is sound. It’s more flexible and allows you to testdifferent lifestyles without committing to a 10- or 20-year retirement plan that can fail due to market fluctuations outside of your control. People are open to exploring alternatives (and more forgiving of others who do the same), as many of the other options—theonce “safe” options—have failed.`,
  `I was supposedly one of the best in the world, but it just didn’t register. My partner Alicia shifted from foot to foot as we stood in line with nine other couples, all chosen from over 1,000 competitors from 29 countries and four continents. It was the last day of the Tango World Championship semifinals, and this was our final run in front of the judges, television cameras, and cheering crowds. The other couples had an average of 15 years together. For us, it was the culmination of 5 months of nonstop 6-hour practices, and finally, it was showtime.`,
  `Pretty much a conversation ender. It’s only half true, besides. The whole truth would take too long. How can I possibly explain that what I do with my time and what I do for money are completely different things? That I work less than four hours per week and make more per month than I used to make in a year? For the first time, I’m going to tell you the real story. It involves a quiet subculture of people called the “New Rich.”`,
  `Life doesn’t have to be so damn hard. It really doesn’t. Most people, my past self included, have spent too much time convincing themselves that life has to be hard, a resignation to 9-to-5 drudgery in exchange for (sometimes) relaxing weekends and the occasional keep-it-short-or-get-fired vacation.`,
  `Do I have to quit or hate my job? Do I have to be a risk-taker? No on all three counts. From using Jedi mind tricks to disappear from the office to designing businesses that finance your lifestyle, there are paths for every comfort level. How does a Fortune 500 employee explore the hidden jewels of China for a month and use technology to cover his tracks? How do you create a hands-off business that generates $80K per month with no management? It’s all here. Do I have to be a single twenty-something?`,
  `I was supposedly one of the best in the world, but it just didn’t register. My partner Alicia shifted from foot to foot as we stood in line with nine other couples, all chosen from over 1,000 competitors from 29 countries and four continents. It was the last day of the Tango World Championship semifinals, and this was our final run in front of the judges, television cameras, and cheering crowds. The other couples had an average of 15 years together. `,
  `Assuming you can find me (hard to do), and depending on when you ask me (I’d prefer you didn’t), I could be racing motorcycles in Europe, scuba diving off a private island in Panama, resting under a palm tree between kickboxing sessions in Thailand, or dancing tango in Buenos Aires. The beauty is, I’m not a multimillionaire, nor do I particularly care to be.`,
  `If you’ve picked up this book, chances are that you don’t want to sit behind a desk until you are 62. Whether your dream is escaping the rat race, real-life fantasy travel, long-term wandering, setting world records, or simply a dramatic career change, this book will give you all the tools you need to make it a reality in the here-andnow instead of in the often elusive “retirement.” There is a way to get the rewards for a life of hard work without waiting until the end.`,
  `In the last five years, I have answered this question for myself, and this book will answer it for you. I will show you exactly how I have separated income from time and created my ideal lifestyle in the process, traveling the world and enjoying the best this planet has to offer. How on earth did I go from 14-hour days and $40,000 per year to 4-hour weeks and $40,000-plus per month? It helps to know where it all started. Strangely enough, it was in a class of soon-to-be investment bankers.`,
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
