let timelimit = 60;
let timeLeft = timelimit;
let timeElapsed = 0;
let ans = document.getElementById("final_ans");
let txt = document.getElementById("txt");
let content = document.getElementById("content");
let accuracy = document.getElementById("total_accuracy");
let errors = document.getElementById("total_errors");
let words = document.getElementById("total_words");
let Time = document.getElementById("timer");
let timer = null;
content.textContent = "#include<stdio.h> \n using namespace std;";
const resetValues = () => {};

const updatetime = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timeElapsed++;
    Time.textContent = timeLeft + "s";
  }
  else{
    finishGame();
  }
};
const startGame = () => {
  resetValues();
  //updateQuotes();
  clearInterval(Time);
  Time = setInterval(updatetime, 1000);
};
const processCurrentText = () => {};
