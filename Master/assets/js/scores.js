//this function hold all of the 
function printHighscores() {
    //getting the item highscores
    var userHighscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    //highest score will be at the top.
    userHighscores.sort(function(a, b) {
        return b.score - a.score;
    })

//Printing the scores on the highscore pages  and saving them to local storage
    userHighscores.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
      var olEl = document.getElementById("highscoresList");
      olEl.appendChild(liTag);
    })
    
//this function will clear all scores in the local storage and reload the page
    function clearAllScores() {
      window.localStorage.removeItem("highscores");
      //this will reload the page
      window.location.reload()
    }
    //link to the button
    document.getElementById("clear").onclick = clearAllScores;
  }
printHighscores();

  