$(document).ready(function () {


  var h = $(document).height();
  var declencheur;
  var posUser;
  var w;


  $("#reseaux").css({top: "210vh"})



    // Changer la couleur de la fleche en fonction de sa hauteur

  $(window).on("load scroll", function () {
    declencheur = 0.45 * h;
    posUser = window.scrollY;
    if (sessionStorage.getItem("cle") === "false") {
      if (posUser >= declencheur) {
        $("#fleche_top").css({ "border-color": "white" });
      } else {
        $("#fleche_top").css({ "border-color": "#373737" });
      }
    } else {
      $("#fleche_top").css({ "border-color": "white" });
    }
  });

  $(window).on("orientationchange load resize", function () {
    hauteurViewport = window.innerHeight;
    h = $(document).height();
    if (h < 1250) {
      $("#reseaux").css({top: "210vh"})
      $("#presentation").css({padding: "0 0 60px 0"})
    } else {
      $("#reseaux").css({top: "210vh"})
      $("#presentation").css({padding: "100px 0 0 0"})
    }
  });


  // Ajouter le bouton toggle

  function ajouterToggle() {
    var label = document.createElement("label");
    var input = document.createElement("input");
    var span = document.createElement("span");

    label.classList = "switch";
    input.type = "checkbox";
    span.classList = "slider round";

    label.append(input);
    label.append(span);
    $("body").prepend(label);
    $(".switch").css({"left": "2vh", "top": "2vh", "position": "absolute"})
    $(".switch input").prop("checked", false);
  }

  ajouterToggle();

  // Définir si on doit afficher le mode jour ou nuit lors du chargement

  var date = new Date();
  var heure = date.getHours();

  if (sessionStorage.getItem("cle") != "true" && sessionStorage.getItem("cle") != "false") {
    $(".switch input").prop("checked", true);
    jourNuit(heure);
  } else {
    if (sessionStorage.getItem("cle") === "true") {
      $(".switch input").prop("checked", true);
      switchMode("false");
    } else {
      $(".switch input").prop("checked", false);
      switchMode("true");
    }
  }


  function jourNuit(heure) {
    if(heure < 7 || heure >= 19) {
      sessionStorage.setItem("cle", "false");
      switchMode("false");
    } else {
      sessionStorage.setItem("cle", "true");
      switchMode("true");
    }
  }





  // Activer ou désactiver le dark mode

  function switchMode(x) {
    if(x == "true") {
      $("#fond").attr("src", "img/fond.jpg");
      $("html").css({"background-color": "white"});
      $("#presentation").css({"color": "#373737", "border-color": "black"});
      $(".vignette").css({"border": "3px solid #fff"});
      $("#fleche_top").css({"border-color": "#373737"});
      sessionStorage.setItem("cle", "false");
    } else {
      $("#fond").attr("src", "img/fondNoir.jpg");
      $("html").css({"background-color": "black"});
      $("#presentation").css({"color": "white", "border-color": "white"});
      $(".vignette").css({"border": "3px solid black"});
      $("#fleche_top").css({"border-color": "white"});
      sessionStorage.setItem("cle", "true");
    }
  }


  $(".slider").click(function() {
    switchMode(sessionStorage.getItem("cle"));
  })


});

