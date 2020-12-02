loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", function() {
    calcTemps();
  });
}

var timeTo = document.getElementById("date").value,
  date,
  maintenant,
  nouvelleAnnee = new Date("1.1.2020").getTime(),
  startTimer = "";

function calcTemps(dates) {
  clearInterval(startTimer);

  if (typeof dates == "undefined") {
    date = new Date(nouvelleAnnee).getTime();
  } else {
    date = new Date(dates).getTime();
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

  startTimer = setInterval(function() {
    updateTimer(date);
  }, 1000);
}
