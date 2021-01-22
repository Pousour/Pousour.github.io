var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1750}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
var counter = 0;
var text;
var orientationjoueur = 1;
var player;


function preload() {

    // CHargements des assets
    this.load.image("background", "images/v1.jpg");
    this.load.image("dude", "images/cyberpunk.png");
    this.load.image("sol", "images/plateforme.jpeg");
    this.load.audio("musique", "images/musique1.mp3");
    this.load.audio("dash", "images/whoosh.mp3");
    this.load.audio("saut", "images/saut.mp3");
    this.load.image("fleche", "images/boule.png");
    this.load.spritesheet("perso", "images/sprites/cyberpunk1-sheet.png", {frameWidth: 38, frameHeight: 68})
}

function create() {

    // Dash Sound Effect
    dash = this.sound.add('dash');
    dash.setVolume(0.5);

    // Saut Sound Effect
    saut = this.sound.add('saut');
    saut.setVolume(0.4);

    // Background
    background = this.add.sprite( -500, -500, 'background').setOrigin(0,0);
    background.setScale(1);
    background.setScrollFactor(0);

    // Plateformes
    platforms = this.physics.add.staticGroup();
    platforms.create(200,600, 'sol').setOrigin(0,0).setScale(2.1).refreshBody();
    platforms.create(1200,400, 'sol').setOrigin(0,0).setScale(2.1).refreshBody();
    platforms.create(0,900, 'sol').setOrigin(0,0).setScale(9).refreshBody();
    platforms.create(1800, 1200, 'sol').setOrigin(0,0).setScale(4.5).refreshBody()

    // Joueur
    player = this.physics.add.sprite(400,500, "dude").setScale(2.5);

    // Animations Courir et idle
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('perso', {frames: [1,2,3,4,5,6,7,8,9,10,11,12]}),
        frameRate: 20,
        repeat: true
    });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('perso', {frames: [0]}),
        frameRate: 20,
        repeat: true
    });

    // Actions avec clavier
    var dateDernierDash = new Date().getTime();
    var dateDernierE = new Date().getTime();;
    var dateSpace;
    fleches = this.physics.add.group();

    window.onkeydown= function(touche){ 
        
        // Dash
        if(touche.keyCode === 32){ 
            dateSpace = new Date().getTime();
            if(dateSpace >= dateDernierDash + 2000) {
                dateDernierDash = dateSpace;
                dash.play();
                if(orientationjoueur === 1) {
                    player.setX(player.x + 200) 
                } else {
                    player.setX(player.x - 200) 
                }
            }
        }

        // Projectiles
        if(touche.keyCode === 69) {
            dateE = new Date().getTime();
            if(dateE >= dateDernierE + 500) {
                dateDernierE = dateE;
                if(orientationjoueur === 1) {
                    fleches.create(player.x, player.y - 120, "fleche").setOrigin(0,0).setScale(2);
                    fleches.setVelocityX(3000);
                } else {
                    fleches.create(player.x, player.y - 0, "fleche").setOrigin(0,0).setScale(-2);
                    fleches.setVelocityX(-3000);
                }
            }
        }
    }; 

    // Collisions joueurs

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, background.displayWidth, background.displayHeight);
    this.cameras.main.startFollow(player);

        // Musique
        musique = this.sound.add('musique');
        musique.setVolume(0.25);
        musique.setLoop(true);
        musique.play();
}

// Compteur
setInterval(function() {

    // Game Over
    if (counter === 120 || player.y > 2000) {
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = "600px";
        div.style.height = "110px";
        div.style.left = "50%";
        div.style.top = "50%";
        div.style.transform = "translate(-50%, -50%)";
        div.style.color = "#cb1bdb";
        div.style.fontFamily = "cyber";
        div.style.fontSize =  "70px";
        div.style.textAlign = "center";
        div.innerHTML = "game over";

        var button = document.createElement("button");
        button.innerHTML = "restart";
        button.style.backgroundColor = "#ffde4a";
        button.style.border = "6px solid #cb1bdb"
        button.style.cursor = "pointer";
        button.style.color = "black";
        button.style.fontFamily = "cyber";
        button.style.fontSize = "17px";
        button.style.padding = "11px 11px 6px 11px";
        button.onclick = function() {window.location.reload(true)};
        div.appendChild(button);
        document.body.prepend(div);
        
        document.getElementsByClassName("myButton")[0].remove()

        cursors = 0;
    } else {
        counter++;
        document.getElementById("compteur").innerHTML = "temps: " + counter;
    }
}, 1000)

// Bouton restart
document.getElementsByClassName("myButton")[0].onclick = function() {window.location.reload(true)};
    

var dateDebut = new Date().getTime();
var dateSaut;
var jumpCount = 1;

function update() {

    // Collisions plateformes
    this.physics.add.collider(player, platforms);

    // Mouvements Joueurs
    if (cursors.left.isDown){
        player.setVelocityX(-500);
        player.setScale(-2.5, 2.5);
        orientationjoueur = -1;
        player.play("run", true);
    }
    else if (cursors.right.isDown){
        player.setVelocityX(500);
        player.setScale(2.5, 2.5);
        orientationjoueur = 1;
        player.play("run", true);
    }
    else{
        player.setVelocityX(0);
        player.play("idle", true);
        
    }

    // Double Jump
    if (cursors.up.isDown && (jumpCount === 0 || jumpCount === 1)){
        console.log(jumpCount)
        dateSaut = new Date().getTime();
        if(dateSaut >= dateDebut + 300) {
            jumpCount++;
            dateDebut = dateSaut;
            player.setVelocityY(-830);
            saut.play();
        }        
    }

    // Reset compteur saut
    if(player.body.touching.down == true) {
        jumpCount = 1;
    }
}



