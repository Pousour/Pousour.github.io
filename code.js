			// nombre de gouttes

var nbDrop = 2000; 

function randRange( minNum, maxNum) {
	return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// générer les gouttes

function createRain() {
	for( i=1;i<nbDrop;i++) {

		var dropLeft = randRange(-2000,1600);
		var dropTop = randRange(-3000,1400);

		$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
		$('#drop'+i).css('left',dropLeft);
		$('#drop'+i).css('top',dropTop);
	}
}

jQuery(function($) {
	$("#pluie").prop("volume", 0.1);

	window.setVolume = function(pluie, vol) {
	sounds[pluie].volume = vol;
	}
});

function changeAngle() {
	var valeurAngle = document.getElementById("sliderAngle");
	var gouttes = document.getElementsByClassName("rain");
	$(".rain").css("transform", 'rotate('+valeurAngle+'deg)');
}






function changetony() {
	var bg = document.getElementById("fond");
	bg.src="ny.jpg";
}

function changetotokyo() {
	var bg = document.getElementById("fond");
	bg.src="tokyo.jpg";
}

function changetola() {
	var bg = document.getElementById("fond");
	bg.src="toronto.jpg";
}

function changetosf() {
	var bg = document.getElementById("fond");
	bg.src="sg.jpg";
}

function changetoparis() {
	var bg = document.getElementById("fond");
	bg.src="paris.jpg";
}

var villes = document.getElementsByClassName("cities")

cities.onclick = function() {
  villes.classList.add('animate');
};

createRain();