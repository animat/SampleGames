var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload() {
    cursors = game.input.keyboard.createCursorKeys();
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('rain', 'assets/star.png',17,17);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);    
	game.add.image(0,0, 'sky');
    game.add.image(600,0, 'sky');


    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64,'ground');
    ground.scale.setTo(4,4);
    ground.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    var ledge = platforms.create(300,400,'ground');
    ledge.body.immovable=true;
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y=0.2;
    player.body.gravity.y=300;
    player.body.collideWorldBound=true;
    player.animations.add('left',[0,1,2,3],10,true);
    player.animations.add('right',[5,6,7,8],10,true);
    cursors = game.input.keyboard.createCursorKeys();
    game.world.setBounds(0, 0, 1400, 300);
    var emitter = game.add.emitter(game.world.centerX, 0, 400);

	emitter.width = 2000;

	emitter.makeParticles('rain');

	emitter.minParticleScale = 0.3;
	emitter.maxParticleScale = 0.8;

	emitter.setYSpeed(300, 500);
	emitter.setXSpeed(-5, 5);

	emitter.minRotation = 0;
	emitter.maxRotation = 0;

	emitter.start(false, 1600, 5, 0);

    game.camera.follow(player);

    
}

function update() {
    
    game.physics.arcade.collide(player, platforms);
    player.body.velocity.x=0;
    if(cursors.left.isDown)
    {
        player.body.velocity.x =-150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x =150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame=4;
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}