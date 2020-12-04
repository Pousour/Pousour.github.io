loadEventListeners();

document.getElementById("date").value = "2021-01-01";

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", function() {
    calcTemps();
  });
}

var timeTo = document.getElementById("date").value,
  date,
  maintenant,
  nouvelleAnnee = "2021-01-01",
  startTimer = "";

calcTemps("2021-01-01");

function calcTemps(dates) {
  clearInterval(startTimer);

  if (typeof dates == "undefined") {
    date = new Date(nouvelleAnnee).getTime();
  } else {
    date = new Date(dates).getTime();
  }
  startTimer = setInterval(function() {
    updateTimer(date);
  }, 1000);
}


function updateTimer(date) {
  var maintenant = new Date().getTime();
  var distance = date - maintenant;

  var jours = Math.floor(distance / (1000 * 60 * 60 * 24));
  var heures = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var secondes = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector(".temps-jours").innerHTML = jours;
  document.querySelector(".temps-heures").innerHTML = heures;
  document.querySelector(".temps-minutes").innerHTML = minutes;
  document.querySelector(".temps-secondes").innerHTML = secondes;

  if (maintenant >= date) {
    clearInterval(startTimer);

    document.querySelector(".temps-jours").innerHTML = "F";
    document.querySelector(".temps-heures").innerHTML = "I";
    document.querySelector(".temps-minutes").innerHTML = "N";
    document.querySelector(".temps-secondes").innerHTML = "I";
  }
}

