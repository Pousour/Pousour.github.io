$(document).ready(function () {


  // Majorité des variables utilisées

  var jeuPageActu;
  var onoff = 0;
  var divEquipe;
  var logoEquipe;
  var newA;
  var nomTeam;
  var titre;
  var divTab = document.createElement("div");
  divTab.id = "classement-equipes";
  var styleSheet;
  var style;
  var liensTeams;
  var w = $(document).width();
  var h = $(document).height();
  var teams = {
    Csgo: ["Vitality", "Astralis", "Navi", "Faze", "Evil Geniuses", "G2", "Liquid", "Mousesports", "Fnatic", "NiP", "100Thieves", "Complexity", "Mad Lions", "Furia", "OG", "Renegades", "Godsent", "BIG"],
    CsgoLiens: ["vitality", "astralis", "navi", "faze", "evilgeniuses", "g2", "liquid", "mousesports", "fnatic", "nip", "100thieves", "complexity", "madlions", "furia", "og", "renegades", "godsent", "big"],
    Fortnite: ["Vitality", "Faze", "Gamers Origins", "Grizi", "NRG", "Sentinels", "100Thieves", "Cooler", "Enterprise Gaming", "Liquid", "MCES", "Solary"],
    FortniteLiens: ["vitality", "faze", "gamersorigins", "grizi", "nrg", "sentinels", "100t", "cooler", "eg", "liquid", "mces", "solary"],
    LoL: ["Damwon Gaming", "Flash Wolves", "Fnatic", "FPX", "G2", "Griffin", "Invictus Gaming", "Liquid", "RNG", "SKT"],
    LoLLiens: ["damwongaming", "flashwolves", "fnatic", "fpx", "g2", "griffin", "invictusgaming", "liquid", "rng", "skt"],
    Valorant: ["HypHypHyp", "SKT", "StartedFromCS", "TSM"],
    ValorantLiens: ["hyphyphyp", "skt", "startedfromcs", "tsm"],
    Rocket: ["Cloud9", "Dignitas", "G2", "Mousesports", "NRG", "Rogue", "Vitality"],
    RocketLiens: ["cloud9", "dignitas", "g2", "mousesports", "nrg", "rogue", "vitality"],
    Smash: ["LeStream", "Liquid", "NRG", "Solary", "TSM"],
    SmashLiens: ["lestream", "liquid", "nrg", "solary", "tsm"],
}
var jeux = ["home", "csgo", "fortnite", "lol", "valorant", "rocket", "smash"];
var home;
var cs;
var fortnite;
var lol;
var valorant;
var rocket;
var smash;
var srcFond = $("#fond").attr("src");
var couleursJeux = ["ab1325", "ba31e1", "949494", "15b320", "c7940c", "0d83de"];







  //Définir si on doit afficher le burger lorsqu'on change la taille de la fenêtre

  $(window).on("orientationchange load resize", function () {
    w = $(document).width();
    h = $(document).height();
    if (w < 1040) {
      $("header").hide();
      $("#classement-equipes h3").hide();
      $("#burger").show();
      $("#burger-container").show();
      $("#burger-container").css({height: h});
      $("#classement-equipes").css({ left: "83vw", width: "7vw", "min-width": "5vw"});
      $("#classement-equipes img").css({ 
        width: "80%", 
        height: "80%",  
        left: "50%",
        "padding": "45px 0 0 2px",
        "transform": "translateX(-50%)"
      });
      $("#classement-equipes img").eq(0).css({ 
        "padding-top": "10px",
      });
      $("#classement-equipes img:last").css({ 
        "padding-bottom": "10px",
      });
      $("#infos").css({ top: "15vh", width: "65vw" });
    } else if (w > 1040) {
      $("header").show();
      $("#classement-equipes h3").show();
      $("#burger").hide();
      $("#burger-container").hide();
      $("#infos").css({ width: "55vw", left: "10vw", top: "8vh" });
      $("#classement-equipes").css({left: "75vw", width: "13vw" });
      $("#classement-equipes img").css({ 
        width: "34px", 
        height: "auto",
        left: "0%", "transform": 
        "translateX(0%)",
        padding: 10,
      });
      onoff = 1;
      fermerOuvrir();
    }
  });






  //Définir ce qu'on doit afficher lors du chargement de la page.

  $(document).ready(function () {
    if (w < 1040) {
      $("header").hide();
      $("#classement-equipes h3").hide();
      $("#burger").show();
      $("#classement-equipes").css({ left: "84vw", width: "7vw", "min-width": "5vw"});
      $("#classement-equipes img").css({ 
        width: "80%", 
        height: "80%",  
        left: "50%",
        "padding": "45px 0 0 2px",
        "transform": "translateX(-50%)"
      });
      $("#classement-equipes img").eq(0).css({ 
        "padding-top": "10px",
      });
      $("#classement-equipes img:last").css({ 
        "padding-bottom": "10px",
      });
      $("#infos").css({ top: "15vh", width: "65vw" });
    } else if (w > 1040) {
      $("header").show();
      $("#burger").hide();
      $("#classement-equipes").css({width: "13vw", left: "75vw"});
      $("#classement-equipes img").css({ 
        width: "34px", 
        left: "0%", 
      });
      $("#infos").css({ top: "8vh" });
    }
    $("#burger").click(function () {
      fermerOuvrir();
    });
  });




  // Fixer le tableau des equipes si on est en bas de page 

  $(window).on("load scroll", function () {
    h = $(document).height();
    posUser = window.scrollY;
    hauteurViewport = window.innerHeight;
    if (posUser >= h - hauteurViewport - (hauteurViewport*0.4)) {
      $("#classement-equipes").css({position: "absolute", top: h - hauteurViewport + (hauteurViewport*0.14)})
    } else {
      $("#classement-equipes").css({position: "fixed", top: "54vh"})
    }
  })



  



  //Ajouter l'icone home à la nav bar

  if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
    $("#navbar").prepend("<img src='../../../../img/home.png' class='navlogo'/>");
  } else {
    $("#navbar").prepend("<img src='../../img/home.png' class='navlogo'/>");
  }








  // Créer le tableau des équipes


  function creerTabTeam() {
    if (srcFond === "../../../../img/fortnite.jpg" || srcFond === "../../img/fortnite.jpg"){
      ajouterEquipeTab("Fortnite");
    } else if (srcFond === "../../../../img/csgo.jpg" || srcFond === "../../img/csgo.jpg"){
      ajouterEquipeTab("Csgo");
    } else if (srcFond === "../../../../img/lol.jpg" || srcFond === "../../img/lol.jpg"){
      ajouterEquipeTab("LoL");
    } else if (srcFond === "../../../../img/valorant.jpg" || srcFond === "../../img/valorant.jpg"){
      ajouterEquipeTab("Valorant");
    } else if (srcFond === "../../../../img/rocket.jpg" || srcFond === "../../img/rocket.jpg"){
      ajouterEquipeTab("Rocket");
    } else if (srcFond === "../../../../img/smash.jpg" || srcFond === "../../img/smash.jpg"){
      ajouterEquipeTab("Smash");
    }
    document.body.append(divTab);
  }

  creerTabTeam();

  function ajouterEquipeTab(nomJeux) {
    jeuPageActu = nomJeux;

      if (nomJeux === "Csgo") {
        titre = "Counter-Strike";
      } else if (nomJeux === "Fortnite") {
        titre = "Fortnite";
      } else if (nomJeux === "LoL") {
        titre = "LoL";
      } else if (nomJeux === "Valorant") {
        titre = "Valorant";
      } else if (nomJeux === "Rocket") {
        titre = "Rocket League";
      } else if (nomJeux === "Smash") {
        titre = "Smash";
      }
      
      for(var i = 0; i < teams[nomJeux].length; i++) {
        liensTeams = teams[nomJeux + "Liens"][i];
        divEquipe = document.createElement("div");
        logoEquipe = document.createElement("img");
        newA = document.createElement("a");
        nomTeam = document.createElement("h3");
        if(document.title === "E-Stats - " + titre) {
          logoEquipe.setAttribute("src", "equipes/" + liensTeams + "/logo.png");
          newA.setAttribute("href", "equipes/" + liensTeams + "/" + liensTeams + ".html");
        } else {
          logoEquipe.setAttribute("src", "../" + liensTeams + "/logo.png"); 
          newA.setAttribute("href", "../../equipes/" + liensTeams + "/" + liensTeams + ".html");
        }
        divEquipe.append(logoEquipe);
        nomTeam.append(teams[nomJeux][i]);
        newA.append(nomTeam);
        divEquipe.append(newA);
        divTab.append(divEquipe);
      }
  }

  $("#classement-equipes img").click(function () {
    srcString = $(this).attr("src");
    var equipe = sliceString(srcString);
    if(jeuPageActu === "Csgo") {
      jeuPageActu = "cs";
    }
    if(jeuPageActu === "Rocket") {
      jeuPageActu = "rocketleague";
    }
    document.location.href = "http://estats.trv20.mmi-nancy.fr/jeux/" + jeuPageActu.toLowerCase() + "/equipes/"+ equipe + "/" + equipe + ".html";
  })

  function sliceString(string) {
    if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
      string = string.slice(3, string.length - 9);
    } else {
      string = string.slice(8);
      string = string.slice(0, string.length - 9);
    }
    return string;
  }








  // Ajouter le footer à chaque pages

  function ajouterFooter() {
    var divFooter = document.createElement("footer");
        h2 = document.createElement("h2");
        divPhotos = document.createElement("div");
        aTwitter = document.createElement("span");
        aDiscord = document.createElement("span");

    divPhotos.id = "photosreseaux";
    divFooter.id = "reseaux";
    h2.innerHTML = "Rejoins nous sur les réseaux";

    if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
      aTwitter.innerHTML = "<a href='https://twitter.com/EstatsFR' target='_blank'><img src='../../../../img/twitter.png' alt='twitter' id='twitter'/></a>";
      aDiscord.innerHTML = "<a href='https://discord.gg/xgBZTD' target='_blank'><img src='../../../../img/discord.png' alt='discord' id='discord'/></a>"
    }else {
      aTwitter.innerHTML = "<a href='https://twitter.com/EstatsFR' target='_blank'><img src='../../img/twitter.png' alt='twitter' id='twitter'/></a>";
      aDiscord.innerHTML = "<a href='https://discord.gg/xgBZTD' target='_blank'><img src='../../img/discord.png' alt='discord' id='discord'/></a>"
    }

    divFooter.append(h2);
    divFooter.append(divPhotos);
    divPhotos.append(aTwitter);
    divPhotos.append(aDiscord);
    document.body.insertAdjacentElement("afterend", divFooter);
  }
  
  ajouterFooter();



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
    $("#navbar").prepend(label);
    $(".switch").css({"left": "0.5vw", "top": "0.5vh"})
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
      $("header").css({backgroundColor: "black", color: "white", "box-shadow": "none"});
      $("a").css({color: "white"});
      $("#classement-equipes").css({"background-color": "rgba(232, 232, 232, 0.2)", "box-shadow": "none", "border-color": "black"});
      $("header img").eq(0).attr("src", "../../img/homeBlanc.png");
      $("header img").eq(2).attr("src", "../../img/logofortniteBlanc.png");
      $("#reseaux").css({backgroundColor: "black"});
      $("html, body").css({backgroundColor: "#252525"});
      
      sessionStorage.setItem("cle", "false");
      switchMode("false");
    } else {
      $("header").css({backgroundColor: "white"});
      $("header a").css({color: "black"});
      $("header img").eq(0).attr("src", "../../img/home.png");
      $("header img").eq(2).attr("src", "../../img/logofortnite.png");
      $("html, body").css({backgroundColor: "#3b3b3b"});
      $("#reseaux").css({backgroundColor: "#555"});
      $("#classement-equipes").css({"background-color": "rgba(255, 255, 255, 0.6)", "box-shadow": "10px 5px 5px #373737", "border-color": "white"});
      $("#classement-equipes a").css({"color": "black"});
      $(".switch input").prop("checked", false);

      sessionStorage.setItem("cle", "true");
      switchMode("true");
    }
  }



  // Activer ou désactiver le dark mode

  function switchMode(x) {
    if(x == "true") {
      $("header").css({backgroundColor: "white"});
      $("header a").css({color: "black"});
      couleurNavbar();
      $("html, body").css({backgroundColor: "#3b3b3b"});
      $("#reseaux").css({backgroundColor: "#555"});
      $("#classement-equipes").css({"background-color": "rgba(255, 255, 255, 0.6)", "box-shadow": "10px 5px 5px #373737", "border-color": "white"});
      $("#classement-equipes a").css({"color": "black"});
      if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
        $("header img").eq(0).attr("src", "../../../../img/home.png");
        $("header img").eq(2).attr("src", "../../../../img/logofortnite.png");
      } else {
        $("header img").eq(0).attr("src", "../../img/home.png");
        $("header img").eq(2).attr("src", "../../img/logofortnite.png");
      }
      sessionStorage.setItem("cle", "false");
    } else {
      $("header").css({backgroundColor: "black", color: "white", "box-shadow": "none"});
      $("header a").css({color: "white"});
      couleurNavbar();
      $("#classement-equipes").css({"background-color": "rgba(232, 232, 232, 0.2)", "box-shadow": "none", "border-color": "black"});
      $("#classement-equipes a").css({"color": "white"});
      if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
        $("header img").eq(0).attr("src", "../../../../img/homeBlanc.png");
        $("header img").eq(2).attr("src", "../../../../img/logofortniteBlanc.png");
      } else {
        $("header img").eq(0).attr("src", "../../img/homeBlanc.png");
        $("header img").eq(2).attr("src", "../../img/logofortniteBlanc.png");
      }
      $("#reseaux").css({backgroundColor: "black"});
      $("html, body").css({backgroundColor: "#252525"});
      sessionStorage.setItem("cle", "true");
    }
  }

  $(".slider").click(function() {
    switchMode(sessionStorage.getItem("cle"));
  })






  // Changer la couleur des scrolls (sur Firefox) et des boutons

  function definirCouleurs() {
    for(var i = 1; i <= jeux.length; i++) {
      if (srcFond.slice(10, srcFond.length - 4) === jeux[i] || srcFond.slice(16, srcFond.length - 4) === jeux[i]) {
        style = "#classement-equipes {scrollbar-color: #" + couleursJeux[i-1] + " rgba(0, 0, 255, 0);}html{scrollbar-color: #" + couleursJeux[i-1] + " #fff;}input:checked + .slider{background-color: #" + couleursJeux[i-1] + "}#submit{background-color: #" + couleursJeux[i-1] + ";}select{background-color: #" + couleursJeux[i-1] + ";}";
      }
    }
    ajouterCouleurs(style);
  }

  function ajouterCouleurs(style) {
    styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerHTML = style;
    document.head.appendChild(styleSheet);
  }

  function couleurNavbar() {
    for(var i = 1; i <= $("header a").length; i++) {
      if (srcFond.slice(10, srcFond.length - 4) === jeux[i-1] || srcFond.slice(16, srcFond.length - 4) === jeux[i-1]) {
        $("header a").eq(i-1).css({ "color": "#" + couleursJeux[i-2]});
      }
    }
  }

  definirCouleurs();

  function couleurClassement() {
    for (var i = 1; i <= jeux.length; i++) {
      if (srcFond.slice(10, srcFond.length - 4) === jeux[i-1] || srcFond.slice(16, srcFond.length - 4) === jeux[i-1]) {
        couleur = couleursJeux[i-2];
      }
    }
    for (var i = 0; i < $("#classement-equipes h3").length; i++) {
      if (document.title.slice(10, document.title.length) === $("#classement-equipes h3").eq(i).text()) {
        $("#classement-equipes h3").eq(i).css({"color": "#" + couleur})
      }
    }
  }

  couleurClassement();



  //Ajouter des alts aux images du tableau

  var nbrimg =$("#classement-equipes img").length;

  for (let index = 0; index < nbrimg; index++) {
    var team = $("#classement-equipes h3").eq(index).text();
    $("#classement-equipes img").eq(index).prop("alt", "logo" + team)
  }



  // Ajouter des alts aux images de la navbar

  for (let index = 0; index < jeux.length; index++) {
    $("#navbar img").eq(index).prop("alt", "logo" + jeux[index]);
  }



  // Ajouter des alts aux images de fond

  for (let index = 0; index < jeux.length; index++) {
    if (srcFond === "../../../../img/" + jeux[index] + ".jpg" || srcFond === "../../" + jeux[index] + ".jpg") {
      $("#fond").prop("alt", "fond" + jeux[index])
    }
  }





  // Fermer ouvrir burger

  function fermerOuvrir() {

    $(".jeux").remove();


    for(var i = 0; i < jeux.length; i++) {
      var a = document.createElement("a");
      var img = document.createElement("img");
      img.classList = "burgerlogo";
      a.classList = "jeux";
      if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
        img.src = "../../../../img/logo" + jeux[i] + ".png";
        a = creerLiensFromTeams(jeux[i]);
      } else {
        img.src = "../../img/logo" + jeux[i] + ".png";
        a = creerLiens(jeux[i]);
      }
      a.append(img);
      $("#burger-container").append(a);
    }

    function creerLiens(jeu) {
      if (jeu === "rocket") {
        a.href = "../" + jeu + "league/" + jeu + ".html";
      } else if(jeu === "csgo") {
        a.href = "../" + jeu.slice(0,2) + "/" + jeu.slice(0,2) + ".html";
      } else if(jeu === "home") {
        if(sessionStorage.getItem("cle") == "true") {
          img.src = "../../img/" + jeu + "Blanc.png";
          a.href = "../../index.html";
        } else {
          img.src = "../../img/" + jeu + ".png";
          a.href = "../../index.html";
        }
      } else if(jeu === "fortnite") {
        a.href = "../" + jeu + "/" + jeu + ".html";
        if(sessionStorage.getItem("cle") == "true") {
          img.src = "../../img/logo" + jeu + "Blanc.png";
        } else {
          img.src = "../../img/logo" + jeu + ".png";
        }
      }
       else {
        a.href = "../" + jeu + "/" + jeu + ".html";
      }
      return a;
    }

    function creerLiensFromTeams(jeu) {
      if (jeu === "rocket") {
        a.href = "../../../" + jeu + "league/" + jeu + ".html";
      } else if(jeux[i] === "csgo") {
        a.href = "../../../" + jeu.slice(0,2) + "/" + jeu.slice(0,2) + ".html";
      } else if(jeu === "home") {
        if(sessionStorage.getItem("cle") == "true") {
          img.src = "../../../../img/" + jeu + "Blanc.png";
          a.href = "../../../../index.html";
        } else {
          img.src = "../../../../img/" + jeu + ".png";
          a.href = "../../../../index.html";
        }
      } else if(jeu === "fortnite") {
        a.href = "../../../" + jeu + "/" + jeu + ".html";
        if(sessionStorage.getItem("cle") == "true") {
          img.src = "../../../../img/logo" + jeu + "Blanc.png";
        } else {
          img.src = "../../../../img/logo" + jeu + ".png";
        }
        
      } else {
        a.href = "../../../" + jeu + "/" + jeu + ".html";
      }
      return a;
    }

    if (onoff === 0) {
      h = $(document).height();
      if(sessionStorage.getItem("cle") == "true") {
        $("#burger-container").css({
          width: "10vw",
          height: h,
          backgroundColor: "black",
        });
      } else {
        $("#burger-container").css({
          width: "10vw",
          height: h,
          backgroundColor: "white",
        });
      }
      $("#burger-container").append(
        home,
        cs,
        fortnite,
        lol,
        valorant,
        rocket,
        smash
      );
      $("#burger-container img").eq(3).css({"right": "1.4vw"});

      if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
        if(sessionStorage.getItem("cle") == "true") {
          $("#burger").attr("src", "../../../../img/burger.png");
        } else {
          $("#burger").attr("src", "../../../../img/burgerNoir.png");
        }
      } else {
        if(sessionStorage.getItem("cle") == "true") {
          $("#burger").attr("src", "../../img/burger.png");
        } else {
          $("#burger").attr("src", "../../img/burgerNoir.png");
        }
      }
      $("#infos").animate({ width: "55vw", left: "20vw", top: "6vh" }, 300);
      $("#burger").animate({ left: "2.9vw" });
      onoff = 1;
    } else if (onoff === 1) {
      $(".jeux").remove();
      if(document.title != "E-Stats - Counter-Strike" && document.title != "E-Stats - Fortnite" && document.title != "E-Stats - LoL" && document.title != "E-Stats - Valorant" && document.title != "E-Stats - Rocket League" && document.title != "E-Stats - Smash") {
        $("#burger").attr("src", "../../../../img/burger.png");
      } else {
        $("#burger").attr("src", "../../img/burger.png");
      }
      if (w > 1040) {
        $("#infos").animate({ width: "55vw", left: "10vw", top: "8vh" }, 300);
      } else {
        $("#infos").animate({ width: "65vw", left: "10vw", top: "15vh" }, 300);
      }
      $("#burger-container").css({ backgroundColor: "transparent" });
      $("#burger").animate({ left: "10vw" });
      onoff = 0;
    }
    $(".jeux").css({
      margin: "0",
    });
  }
});





// Js spécifique aux pages d'accueil des jeux

// Variables stockant les infos données par l'utilisateur

var id;
var pseudo;
var region;

// Ouvrir les fenetres de stats

function ouvrirStats(id) {
  $("#erreur").remove();
  id = $("#id").val();
  pseudo = $("#pseudo").val();
  region = $("#region").val();
  if(document.title === "E-Stats - Counter-Strike" || document.title === "E-Stats - Rocket League") {
    if(id.length != 17) {
      $("<span id='erreur' style='left: 50%; position: absolute; transform: translateX(-50%); width: 100%; text-align: center; margin-top: 20px; color: red'></br>L'id entrée doit avoir une longueur de 17 caractères.</span>").insertAfter($("#submit"));
    } else {
      if(document.title === "E-Stats - Counter-Strike") {
        window.open("https://csgostats.gg/player/" + id);
      } else {
        $("#erreur").remove();
        window.open("https://rocketleague.tracker.network/profile/steam/" + id);
      }
    }
  } else {
    if (pseudo.length === 0) {
      $("<span id='erreur' style='left: 50%; position: absolute; transform: translateX(-50%); width: 100%; text-align: center; margin-top: 20px; color: red'></br>Vous devez entrer votre pseudo.</span>").insertAfter($("#submit"));
    } else {
      if(document.title === "E-Stats - LoL") {
        window.open("https://lolprofile.net/summoner/" + region + "/" + pseudo);
      } else {
        $("#erreur").remove();
        window.open("https://fortnitetracker.com/profile/all/" + pseudo);
      }
    }
  }
}













