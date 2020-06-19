players = [];
playersCopy = []; //this is a copy of player array that never changes
enemies = []; //rule is that special enemies will always appear in the first 0, 1, and 3rd index of the array 
playerInventory = []; //inventory to hold items, additional classes will be implemented for skill scrolls
battlescenemap = 'heaven'; //default is heaven, this global variable determines the battle scene map to load
enemy_hp_bars = [];
UIarray = []; //this array keeps track of all the UIs for every character on the map. Needs to be cleared
EnemyUIarray = []; //this array keeps track of all the UIs for every enemy on the map
menus = []; //keeps track of menus
num_of_players = 4; //global variable to keep track of the number of players, will be set to 2 in actual game
currentDialogStatus = "heaven0"; //This is a list of current dialog statuses, and this global variable will determine how conversations are accessed
currentScene = "WorldScene"; //keeps track of the current scene to go back to 


var BootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },

    preload: function ()
    {
        // map tiles
        this.load.image('tiles', 'assets/map/Mapset.png');
        
        // map in json format
        this.load.tilemapTiledJSON('level0', 'assets/map/level0.json');
        
        // enemies
        this.load.image("dragonblue", "assets/dragonblue.png");
        this.load.image("dragonorrange", "assets/dragonorrange.png");
        
        // load all sprites for battle UI
        this.load.image("reenasprite", "assets/sprites/Reena.png");
        this.load.image("alyenesprite", "assets/sprites/Alyene.png");
        this.load.image('yunesprite', 'assets/sprites/Yune.png')
        
        //load menu items
        this.load.image('attack', "assets/menu/attack.png");
        this.load.image('escape', "assets/menu/escape.png");
        this.load.image('guard', "assets/menu/guard.png");
        this.load.image('items', 'assets/menu/items.png');
        this.load.image('skill', 'assets/menu/skill.png');
        this.load.image('skip', 'assets/menu/skip.png');

        //load all the status images
        this.load.image('attackdown', 'assets/status/attackdown.png');
        this.load.image('attackup', 'assets/status/attackup.png');
        this.load.image('bindattack', 'assets/statusbindattack.png');
        this.load.image('critup', 'assets/status/critup.png');
        this.load.image('defensedown', 'assets/status/defensedown.png');
        this.load.image('defenseup', 'assets/status/defenseup.png');
        this.load.image('paralysis', 'assets/status/paralysis.png');
        this.load.image('poison', 'assets/status/poison.png');
        this.load.image('skillbind', 'assets/status/skillbind.png');

        // player 
        this.load.spritesheet('Reena', 'assets/Character Design/main.png', {frameWidth: 128, frameHeight: 128});

        // load the other char for base world, level1 extends world
        this.load.spritesheet('Alyene', 'assets/Character Design/main_chara.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('Yune', 'assets/Character Design/younger.png', {frameWidth: 128, frameHeight: 128});

        //load battle skills
        this.load.image('rightfulgod', 'assets/skills/rightfulgod.png');    
        this.load.image('cloudnine', 'assets/skills/cloudnine.png');
        this.load.image('almightygod', 'assets/skills/almightygod.png');
        this.load.image('dragonskin', 'assets/skills/dragonskin.png');
        this.load.image('angelictruth', 'assets/skills/angelictruth.png');

        //load a dialog box
        this.load.image('dialogbox', 'assets/dialogBox.png');
        this.load.image('expbackground', 'assets/expbackground.png');

    },

    create: function ()
    {
        // start the WorldScene
        // Here we actually create a splash art and a Menu
        // Well we don't have the splash art at the moment so let's just do the menu
        
        this.cameras.main.setBackgroundColor('rgba(250, 218, 94, 1)');
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);       

        this.graphics.strokeRect(90, 600, 300, 50);
        this.graphics.fillRect(90, 600, 300, 50);

        this.graphics.strokeRect(90, 700, 300, 50);
        this.graphics.fillRect(90, 700, 300, 50);

        this.graphics.strokeRect(90, 800, 300, 50);
        this.graphics.fillRect(90, 800, 300, 50);
        
        this.graphics.strokeRect(90, 900, 300, 50);
        this.graphics.fillRect(90, 900, 300, 50);

        var text = this.add.text(1280/2 - 200,
			200, "World Calling: Three Realms", {
				color: "#000000",
				align: "center",
				fontWeight: 'bold',
				font: '60px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        }).setInteractive();
        
        var text1 = this.add.text(185,
			610, "    START    ", {
				color: "#ffffff",
				align: "center",
				fontWeight: 'bold',
				font: '32px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        }).setInteractive();

        text1.on('pointerdown', ()=>{
            this.scene.start('DialogScene');
        });

        var text2 = this.add.text(185,
			710, "LOAD", {
				color: "#ffffff",
				align: "center",
				fontWeight: 'bold',
				font: '32px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        }).setInteractive();

        var text3 = this.add.text(185,
			810, "ABOUT", {
				color: "#ffffff",
				align: "center",
				fontWeight: 'bold',
				font: '32px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        }).setInteractive();

        var text4 = this.add.text(185,
			910, "HELP", {
				color: "#ffffff",
				align: "center",
				fontWeight: 'bold',
				font: '32px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        }).setInteractive();

        
        //this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function ()
    {
        
    },

    create: function ()
    {
        //keep an array of all the npcs on this map 
        var npcs = [];
        // create the map
        var level0 = this.make.tilemap({ key: 'level0' });
        
        // first parameter is the name of the tilemap in tiled
        var tiles = level0.addTilesetImage('Mapset', 'tiles');
        
        // creating the layers
        var traverse = level0.createStaticLayer('traverse', tiles, 0, 0);
        var blocked = level0.createStaticLayer('blocked', tiles, 0, 0);
        
        // make all tiles in obstacles collidable
        blocked.setCollisionByExclusion([-1]);

        //list of global attributes that the current player has 

        var animations = []; //a string of animations being stored 

        //conversations array;


        
        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Reena', { frames: [8,9,10,11,12,13,14,15]}),
            frameRate: 5,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Reena', { frames: [0,1,2,3,4,5,6,7] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('Reena', { frames: [8,9,10,11,12,13,14,15]}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('Reena', { frames: [0,1,2,3,4,5,6,7] }),
            frameRate: 5,
            repeat: -1
        });     

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('Reena', { frames: [24,25,26,27,28,29,30,31] }),
            frameRate: 5,
        });
        
        this.anims.create({
            key: 'defeated',
            frames: this.anims.generateFrameNumbers('Reena', {frames: [32]}),
            frameRate: 1,
            repeat: -1
        })

        //alyene animations
        this.anims.create({
            key: 'rightalyene',
            frames: this.anims.generateFrameNumbers('Alyene', { frames: [8,9,10,11,12,13,14,15]}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'leftalyene',
            frames: this.anims.generateFrameNumbers('Alyene', { frames: [0,1,2,3,4,5,6,7]}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attackalyene',
            frames: this.anims.generateFrameNumbers('Alyene', { frames: [24,25,26,27,28,29,30,31]}),
            frameRate: 5,
        });
        this.anims.create({
            key: 'defeatedalyene',
            frames: this.anims.generateFrameNumbers('Alyene', { frames: [33]}),
            frameRate: 5,
            repeat: -1
        });

        //yune animations
        this.anims.create({
            key: 'rightyune',
            frames: this.anims.generateFrameNumbers('Yune', {frames: [8,9,10,11,12,13,14,15]}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'leftyune',
            frames: this.anims.generateFrameNumbers('Yune', {frames: [0,1,2,3,4,5,6,7]}),
            frameRate: 5,
            repeat: -1
        });

        // our player sprite created through the phycis system
        this.reena = this.physics.add.sprite(640, 128+64, 'Reena', 6);
        
        // don't go out of the map
        this.physics.world.bounds.width = level0.widthInPixels;
        this.physics.world.bounds.height = level0.heightInPixels;
        this.reena.setCollideWorldBounds(true);
        
        // don't walk on trees
        this.physics.add.collider(this.reena, blocked);

        // limit camera to map
        this.cameras.main.setBounds(0, 0, level0.widthInPixels, level0.heightInPixels);
        this.cameras.main.startFollow(this.reena);
        this.cameras.main.roundPixels = true; // avoid tile bleed

        unitReenaSkills1 = new unitSkills("Rightful God","Negates the damage bonus from enemy critical hits", "rightfulgod");
        unitReenaSkills2 = new unitSkills("Cloud Nine","grants SPD + 10% during combat", "cloudnine");
        unitReenaSkillArray = [unitReenaSkills1, unitReenaSkills2]; //an array with the two beginning skills
        unitReenaStats = new unitStats(28, 20, 45, 16, 21, 20, 7); //this is Reena's current stats
        reenaAnimations = ['left', 'right', 'attack', 'defeated'];
        //create a new unit information that stores all of Reena's information 
        unitReenaBattleSkills1 = new unitBattleSkills("Fire Magic", "deals 1x magical damage to opponent", 5, "magic", "single", "firemagic");
        unitReenaBattleSkills2 = new unitBattleSkills("Pure Halo", "deals 1.5x physical damage to opponent", 2, "magic", "single", "purehalo");
        unitReenaBattleSkills3 = new unitBattleSkills("Chaos", "inflicts paralysis and deals damage", 5, "magic", "single", "chaos");
        unitReenaBattleSkills4 = new unitBattleSkills("Pure Chaos", "inflicts attack down effect to all opponents", 5, "magic", "single", "purechaos");
        unitReenaBattleSkillArray = [unitReenaBattleSkills1, unitReenaBattleSkills2, unitReenaBattleSkills3, unitReenaBattleSkills4];

        //create a new unit information that stores all of Reena's information 
        unitReena = new unitInformation(this.reena, "Reena", reenaAnimations, "reenasprite", unitReenaSkillArray, unitReenaStats, null, unitReenaBattleSkillArray, 5); 
        this.reena.anims.play('up', true);
        players.push(unitReena);
        playersCopy.push(unitReena);


        //alyene and yune
        this.alyene = this.physics.add.sprite(640, 2400, 'Alyene', 6).setImmovable();
        this.alyene.anims.play('rightalyene', true);
        npcs.push(this.alyene);


        this.yune = this.physics.add.sprite(768, 2400, 'Yune', 6).setImmovable();
        this.yune.anims.play('rightyune', true);
        //npcs.push(this.yune);
    

        // user input
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        });  // keys.up, keys.down, keys.left, keys.right


        this.input.keyboard.on('keydown_F', ()=>{
            this.scene.switch("PartyMembersScene");
        });

        this.input.keyboard.on('keydown_G', ()=>{
            this.scene.switch("SkillScene");
        });
        
        // where the enemies will be
        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(var i = 0; i < 30; i++) {
            var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);            
        }        
        // add collider
        //this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
        for (var i = 0; i < npcs.length; i++){
            this.physics.add.collider(this.reena, this.alyene, this.onNpcDialog, false, this).name = "AlyeneCollider";
        }
        // we listen for 'wake' event
        this.sys.events.on('wake', this.wake, this);
    },
    wake: function() {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.cursors.down.reset();
    },
    onMeetEnemy: function(player, zone) {        
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
        // shake the world
        this.cameras.main.shake(300);
        
        this.input.stopPropagation();
        // start battle 
        this.scene.start('BattleScene');                
    },

    logBoi: function(){
        console.log("boii");
    },

    startBattle: function(){
        this.scene.switch('BattleScene');
    },


    //this detects the nearest npc that the player bumps to, an a dialog will happen for that npc and the player
    //a bunch of if statements, different events will trigger depending on the different npcs encountered in this World
    onNpcDialog: function(player, npc){
        console.log(npc.texture.key);
        if (npc.texture.key === "Alyene"){
            currentDialogStatus = "heaven1";
            this.reena.y -= 20;
            this.reena.setVelocityY(0);
            unitAlyeneSkills1 = new unitSkills("Almighty God","Negates damage bonus from enemy critical hits, damage from opponent's attacks reduced by 50%", "almightygod");
            unitAlyeneSkills2 = new unitSkills("Dragon Skin", "Negates the effects of all non-damaging status effects. Nullifies poison damage", "dragonskin");
            unitAlyeneSkills3 = new unitSkills("Angelic Truth", "Halves skill damage received", "angelictruth");
            unitAlyeneSkillArray = [unitAlyeneSkills1, unitAlyeneSkills2, unitAlyeneSkills3];
            unitAlyeneStats = new unitStats(30, 30, 30, 15, 30, 30, 30); //this is Alyene's current stats
            alyeneAnimations = ['rightalyene', 'leftalyene','attackalyene','defeatedalyene'];
            unitAlyeneBattleSkills1 = new unitBattleSkills("Mass Toxic", "inflicts poison and deals damage", 5, "magic", "single", "masstoxic");
            unitAlyeneBattleSkills2 = new unitBattleSkills("Toxic", "inflicts poison and deals damage", 5, "magic", "single", "toxic");
            unitAlyeneBattleSkills3 = new unitBattleSkills("Rally Break", "inflicts attack down effect to all opponents", 5, "magic", "multiple", "rallybreak");
            unitAyleneBattleSkllArray = [unitAlyeneBattleSkills1];

            unitAlyene = new unitInformation(this.alyene, "Alyene", alyeneAnimations, "alyenesprite", unitAlyeneSkillArray, unitAlyeneStats, null, unitAyleneBattleSkllArray, 9);
            enemies.push(unitAlyene);

            unitYuneSkills1 = new unitSkills("Angelic Truth", "Halves skill damage received", "angelictruth");
            unitYuneSkills2 = new unitSkills("Dragon Skin", "Negates the effects of all non-damaging status effects. Nullifies poison damage", "dragonskin");
            unitYuneSkills3 = new unitSkills("Almighty God","Negates damage bonus from enemy critical hits, damage from opponent's attacks reduced by 50%", "almightygod");
            unitYuneSkillArray = [unitYuneSkills1, unitYuneSkills2, unitYuneSkills3];
            unitYuneStats = new unitStats(30, 30, 30, 30, 30, 30, 30); //this is Alyene's current stats
            YuneAnimations = ['rightyune', 'leftyune'];
            unitYuneBattleSkills1 = new unitBattleSkills("Spirit Break", "inflicts attack down effect", 5, "magic", "single", "spiritbreak");
            unitYuneBattleSkllArray = [unitAlyeneBattleSkills1];

            unitYune = new unitInformation(this.yune, "Yune", YuneAnimations, "yunesprite", unitYuneSkillArray, unitYuneStats, null, unitYuneBattleSkllArray, 12);
            enemies.push(unitYune);

            this.physics.world.colliders.getActive().find(function(i){
                return i.name == 'AlyeneCollider';
            }).destroy();

            this.cameras.main.shake(300);
            this.input.stopPropagation();

            this.scene.pause('WorldScene');
            this.scene.run('DialogScene');
        }



        
        
    },

    update: function (time, delta)
    {             
        this.reena.body.setVelocity(0);
        
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.reena.body.setVelocityX(-550);
        }
        else if (this.cursors.right.isDown)
        {
            this.reena.body.setVelocityX(550);
        }
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.reena.body.setVelocityY(-550);
        }
        else if (this.cursors.down.isDown)
        {
            this.reena.body.setVelocityY(550);
        }        

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown)
        {
            this.reena.anims.play('left', true);
            //this.reena.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.reena.anims.play('right', true);
            this.reena.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.reena.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.reena.anims.play('down', true);
        }
        else
        {
            //this.reena.anims.stop();
        }
    }
    
});

//Unit skills consist of skill names and a description, and the skillname will be checked to see the skill effect in the battle method
class unitSkills{
    constructor (skillName, description, spriteName)
    {
        this.skillName = skillName;
        this.description = description; //description and skill names are both strings
        this.spriteName = spriteName;
    }
}

//Unit battle information consist of basic stats of a character, each stat represent different things 
class unitStats{
    constructor (HP, MP, ATK, DEF, RES, SPEED, LUCK)
    {
        this.hp = HP;
        this.maxHP = HP;
        this.mp = MP;
        this.maxMP = MP;
        this.atk = ATK;
        this.def = DEF;
        this.res = RES
        this.spd = SPEED;
        this.luck = LUCK;
    }
}

//Unit battle information consist of the current status effect on the user
class unitStatus{
    constructor (statusName, statusDescription)
    {
        this.statusName = statusName;
        this.statusDescription = statusDescription;
    }
}

//Unit battle skills information. type can be magic, physical, special, or null.
//target can be single or multi
class unitBattleSkills{
    constructor(battleSkillName, battleSkillDescription, mpRequired, type, target){
        this.battleSkillName = battleSkillName;
        this.battleSkillDescription = battleSkillDescription;
        this.mpRequired = mpRequired;
        this.type = type;
        this.target = target;
    }
}

//This class stores all unit's informations, including sprites, skills, and so on. Stored in a single global array
/*unitData consists of phaser sprite data, unitName is the sprite name reference, Animation is an array of animation strings,
unitSprites is a string that represents a unit's sprite, unitSkills represents a skills class, and battle info represents stats like HP, MP, ATTACK, and such
unitStatus is the unit's current status, such as paralysis, bind, poisoned and such 
*/
class unitInformation {
    constructor (unitData, unitName, unitAnimations, unitSprites, unitSkills, unitStats, unitStatus, unitBattleSkills, level)
    {
        this.unitData = unitData;
        this.unitName = unitName;
        this.unitAnimations = unitAnimations;
        this.unitSprites = unitSprites;
        this.unitSkills = unitSkills;
        this.unitStats = unitStats;
        this.unitStatus = unitStatus;
        this.unitBattleSkills = unitBattleSkills;
        this.isGuarding = false;
        this.level = level;
        this.exp = 0;
    }

}

//a dialog class consists of an array of conversations, null-terminated, where each array holds a string of dialog
class dialog{
    constructor(conversationArray, name){
        this.conversationArray = conversationArray;
        this.name = name; 
    }
}

var PartyMembersScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function PartyMembersScene(){
            Phaser.Scene.call(this, {
                key: "PartyMembersScene"
            });
        },
    
    create: function(){
        this.cameras.main.setBackgroundColor('rgba(250, 218, 94, 1)');
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(280, 30, 720, 150);
        this.graphics.fillRect(280, 30, 720, 150);
        this.graphics.strokeRect(280, 200, 720, 815);
        this.graphics.fillRect(280, 200, 720, 815);
        this.graphics.strokeRect(90, 900, 150, 50);
        this.graphics.fillRect(90, 900, 150, 50);


        var text = this.add.text(350,
			40, "CURRENT PARTY (SELECT 4 NEW PARTY MEMBERS)", {
				color: "#FF0000",
				align: "center",
				fontWeight: 'bold',
				font: '24px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        });
        
        var exitText = this.add.text(115,
			910, "CANCEL", {
				color: "#FF0000",
				align: "center",
				fontWeight: 'bold',
				font: '24px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        }).setInteractive();

        exitText.on('pointerdown', ()=>{
            this.num_characters_changed = 0;
            this.currentUnitIndex = 0;
            for (var i = 0; i < this.currentPartySprites.length; i++){
                this.currentPartySprites[i].destroy();
            }
            for (var i = 0; i < this.currentPlayersSprites.length; i++){
                this.currentPlayersSprites[i].destroy();
            }
            for (var i = 0; i < this.textsArray.length; i++){
                this.textsArray[i].destroy();
            }
            this.tempPlayersArray.length = 0;
            this.textsArray.length = 0;
            this.currentPartySprites.length = 0;
            this.currentPlayersSprites.length = 0;
            this.scene.switch(currentScene);
        });


        /*this.input.keyboard.on('keydown_F', ()=>{
            this.currentUnitIndex = 0;
            for (var i = 0; i < this.currentPartySprites.length; i++){
                this.currentPartySprites[i].destroy();
            }
            for (var i = 0; i < this.currentPlayersSprites.length; i++){
                this.currentPlayersSprites[i].destroy();
            }
            this.currentPartySprites.length = 0;
            this.currentPlayersSprites.length = 0;
            this.scene.switch("WorldScene");
        });*/

        this.currentUnitIndex = 0; //start and 0, and when it reaches 3, go back to 0 as a circular array
        this.currentPartySprites = []; //an array that holds sprite information regarding the current party
        this.currentPlayersSprites = []; //an array that holds all the playable characters 
        this.num_characters_changed = 0; //keeps track of the number of characters currently changed 
        this.textsArray = [];
        this.tempPlayersArray = []; //stores temporary players arrays

        this.sys.events.on('wake', this.createMenu, this);
        this.createMenu();
    },

    createMenu: function(){
        //an array of only 4 for the party members

        for (var i = 0; i < players.length; i++){
            var player = this.add.sprite(340 + i*200, 120, players[i].unitSprites).setInteractive();
            this.currentPartySprites.push(player);
        }

        for (var i = 0; i < players.length; i++){
            if (i === 0){
                //an array of all the current avaliable players
                var player1 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text1 = this.add.text(400, 220 + i*100, playersCopy[i].unitName + "\n" + " LEVEL:" + playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" + playersCopy[i].unitStats.hp + " MP:" + playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player1.on('pointerover', ()=> {
                    player1.setTint(0x87ceeb);
                })
                player1.on('pointerout', ()=> {
                    player1.clearTint();
                });
                player1.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite1 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[0].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite1;

                    var playerObject1 = {index:0, playerInformation: playersCopy[0]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject1;
                    //var tempPlayer1 = players[this.currentUnitIndex];
                    //players[this.currentUnitIndex] = players[0];
                    //players[0] = tempPlayer1;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player1.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;
                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text1);
                this.currentPlayersSprites.push(player1);  
            }
            if (i === 1){
                //an array of all the current avaliable players
                var player2 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text2 = this.add.text(400, 220 + i*100, playersCopy[i].unitName + "\n" + " LEVEL:" + playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" + playersCopy[i].unitStats.hp + " MP:" + playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player2.on('pointerover', ()=> {
                    player2.setTint(0x87ceeb);
                })
                player2.on('pointerout', ()=> {
                    player2.clearTint();
                });
                player2.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite2 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[1].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite2;


                    var playerObject2 = {index:1, playerInformation: playersCopy[1]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject2;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player2.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;
                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text2);
                this.currentPlayersSprites.push(player2);  
            }
            if (i === 2){
                //an array of all the current avaliable players
                var player3 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text3 = this.add.text(400, 220 + i*100, playersCopy[i].unitName + "\n" + " LEVEL:" + playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" + playersCopy[i].unitStats.hp + " MP:" + playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player3.on('pointerover', ()=> {
                    player3.setTint(0x87ceeb);
                })
                player3.on('pointerout', ()=> {
                    player3.clearTint();
                });
                player3.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite3 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[2].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite3;


                    var playerObject3 = {index:2, playerInformation: playersCopy[2]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject3;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player3.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;
                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text3);
                this.currentPlayersSprites.push(player3);  
            }
            if (i === 3){
                //an array of all the current avaliable players
                var player4 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text4 = this.add.text(400, 220 + i*100, playersCopy[i].unitName + "\n" + " LEVEL:" + playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" + playersCopy[i].unitStats.hp + " MP:" + playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player4.on('pointerover', ()=> {
                    player4.setTint(0x87ceeb);
                })
                player4.on('pointerout', ()=> {
                    player4.clearTint();
                });
                player4.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite4 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[3].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite4;

                    var playerObject4 = {index:3, playerInformation: playersCopy[3]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject4;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player4.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;
                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text4);
                this.currentPlayersSprites.push(player4);  
            }
            if (i === 4){
                //an array of all the current avaliable players
                var player5 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text5 = this.add.text(400, 220 + i*100,playersCopy[i].unitName + "\n" + " LEVEL:" +playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" + playersCopy[i].unitStats.hp + " MP:" + playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player5.on('pointerover', ()=> {
                    player5.setTint(0x87ceeb);
                })
                player5.on('pointerout', ()=> {
                    player5.clearTint();
                });
                player5.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite5 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[4].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite5;


                    var playerObject5 = {index:4, playerInformation: playersCopy[4]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject5;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player5.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;
                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text5);
                this.currentPlayersSprites.push(player5);  
            }
            if (i === 5){
                //an array of all the current avaliable players
                var player6 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text6 = this.add.text(400, 220 + i*100, playersCopy[i].unitName + "\n" + " LEVEL:" + playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" + playersCopy[i].unitStats.hp + " MP:" + playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player6.on('pointerover', ()=> {
                    player6.setTint(0x87ceeb);
                })
                player6.on('pointerout', ()=> {
                    player6.clearTint();
                });
                player6.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite6 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[5].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite6;


                    var playerObject6 = {index:5, playerInformation: playersCopy[5]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject6;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player6.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;
                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text6);
                this.currentPlayersSprites.push(player6);  
            }
            if (i === 6){
                //an array of all the current avaliable players
                var player7 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text7 = this.add.text(400, 220 + i*100, playersCopy[i].unitName + "\n" + " LEVEL:" + playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" +playersCopy[i].unitStats.hp + " MP:" +playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player7.on('pointerover', ()=> {
                    player7.setTint(0x87ceeb);
                })
                player7.on('pointerout', ()=> {
                    player7.clearTint();
                });
                player7.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite7 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[6].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite7;

                    var playerObject7 = {index:6, playerInformation: playersCopy[6]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject7;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player7.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;
                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text7);
                this.currentPlayersSprites.push(player7);  
            }
            if (i === 7){
                //an array of all the current avaliable players
                var player8 = this.add.sprite(340, 260 + i*100, playersCopy[i].unitSprites).setInteractive()
                var text8 = this.add.text(400, 220 + i*100, playersCopy[i].unitName + "\n" + " LEVEL:" + playersCopy[i].level + " EXP:" +
                playersCopy[i].exp + " HP:" + playersCopy[i].unitStats.hp + " MP:" + playersCopy[i].unitStats.mp + " ATK:" +
                playersCopy[i].unitStats.atk + " DEF:" + playersCopy[i].unitStats.def + " RES:" + playersCopy[i].unitStats.res + " SPD:" +
                playersCopy[i].unitStats.spd + " LUCK:" + playersCopy[i].unitStats.luck , {
                color: "#FF0000",
                align: "center",
                fontWeight: 'bold',
                font: '28px Arial',
                wordWrap: {
                    width: 600,
                    useAdvancedWrap: true
                }
                });
                player8.on('pointerover', ()=> {
                    player8.setTint(0x87ceeb);
                })
                player8.on('pointerout', ()=> {
                    player8.clearTint();
                });
                player8.on('pointerdown', ()=> {
                    //first check if unit is in the top 4 player base
                    
                    this.currentPartySprites[this.currentUnitIndex].destroy();
                    var playerSprite8 = this.add.sprite(340 + this.currentUnitIndex*200, 120, playersCopy[7].unitSprites).setInteractive();
                    this.currentPartySprites[this.currentUnitIndex] = playerSprite8;


                    var playerObject8 = {index:7, playerInformation: playersCopy[7]};
                    this.tempPlayersArray[this.currentUnitIndex] = playerObject8;

                    this.currentUnitIndex++;
                    if (this.currentUnitIndex === 4){
                        this.currentUnitIndex = 0;
                    }
                    player8.disableInteractive();
                    this.num_characters_changed++;
                    if (this.num_characters_changed === num_of_players){
                        //changed player number of times
                        this.num_characters_changed = 0;
                        this.currentUnitIndex = 0;
                        for (var i = 0; i < this.currentPartySprites.length; i++){
                            this.currentPartySprites[i].destroy();
                        }
                        for (var i = 0; i < this.currentPlayersSprites.length; i++){
                            this.currentPlayersSprites[i].destroy();
                        }
                        for (var i = 0; i < this.textsArray.length; i++){
                            this.textsArray[i].destroy();
                        }
                        for (var i = 0; i < this.tempPlayersArray.length; i++){
                            //players[this.tempPlayersArray[i].index] = players[i];
                            players[i] = this.tempPlayersArray[i].playerInformation;

                        }
                        this.tempPlayersArray.length = 0;
                        this.textsArray.length = 0;
                        this.currentPartySprites.length = 0;
                        this.currentPlayersSprites.length = 0;
                        this.scene.switch(currentScene);
                    }
                });
                this.textsArray.push(text8);
                this.currentPlayersSprites.push(player8);  
            }
        }
    },

    



    
})

var SkillScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function PartyMembersScene(){
            Phaser.Scene.call(this, {
                key: "SkillScene"
            });
        },
    
    create: function(){
        this.cameras.main.setBackgroundColor('rgba(250, 218, 94, 1)');
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(280, 10, 950, 1005);
        this.graphics.fillRect(280, 10, 950, 1005);
        this.graphics.strokeRect(90, 955, 150, 50);
        this.graphics.fillRect(90, 955, 150, 50);

        var exitText = this.add.text(128,
			965, "BACK", {
				color: "#FF0000",
				align: "center",
				fontWeight: 'bold',
				font: '26px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
        }).setInteractive();

        exitText.on('pointerdown', ()=>{
            for (var i = 0; i < this.spritesArray.length; i++){
                this.spritesArray[i].destroy();
            }
            for (var i = 0; i < this.skillDescriptionTextArray.length; i++){
                this.skillDescriptionTextArray[i].destroy();
            }
            for (var i = 0; i < this.battleSkillDescriptionTextArray.length; i++){
                this.battleSkillDescriptionTextArray[i].destroy();
            }
            for (var i = 0; i < this.nameTextArray.length; i++){
                this.nameTextArray[i].destroy();
            }
            this.spritesArray.length = 0
            this.nameTextArray.length = 0;
            this.skillDescriptionTextArray.length = 0;
            this.battleSkillDescriptionTextArray.length = 0;
            this.scene.switch(currentScene);
        });

        this.spritesArray = []; //array of party sprites
        this.nameTextArray = []; //array of names
        this.skillDescriptionTextArray = []; //array of skills and skill description texts
        this.battleSkillDescriptionTextArray = [];


        this.sys.events.on('wake', this.createMenu, this);
        this.createMenu();
    },

    createMenu: function(){
        //an array of only 4 for the party members
        for (var i = 0; i < players.length; i++){
            var player = this.add.sprite(350, 80 + i*280, players[i].unitSprites).setInteractive()
            player.anims.play(players[i].unitAnimations[0], false);
            this.spritesArray.push(player);

            var nameText = this.add.text(315, 145 + i*280, players[i].unitName +"\n" + "\n" +
            "______________________________________________", {
                color: "#FF0000",

				fontWeight: 'bold',
				font: '24px Arial',
				wordWrap: {
					width: 800,
					useAdvancedWrap: true
				}
            }).setInteractive();
            this.nameTextArray.push(nameText);

            for (var j = 0; j < players[i].unitSkills.length; j++){
                var skillText = this.add.text(430, 15 + i*280 + j*15, players[i].unitSkills[j].skillName + " :" +
                 players[i].unitSkills[j].description + "\n", {
                    fontWeight: 'bold',
                    wordWrap: {
                        width: 900,
                        useAdvancedWrap: true
                    }
                });
                this.skillDescriptionTextArray.push(skillText);
            }

            for (var k = 0; k < players[i].unitBattleSkills.length; k++){
                var battleSkillText = this.add.text(430, 105 + i*280 + k*15, players[i].unitBattleSkills[k].battleSkillName + " :" + 
                players[i].unitBattleSkills[k].battleSkillDescription + "\n", {
                    fontWeight: 'bold',
                    wordWrap: {
                        width: 900,
                        useAdvancedWrap: true
                    }
                });
                this.battleSkillDescriptionTextArray.push(battleSkillText);
            }
            
        }

        
    },

});

var DialogScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function DialogScene(){
            Phaser.Scene.call(this, {
                key: "DialogScene"
            });
        },
    
    create: function(){
        this.dialogBox = this.add.sprite(640, 900, 'dialogbox').setInteractive();
        this.convoText = this.add.text(240, 860, "", {
            color: "#ff0000",
            align: "center",
            fontWeight: 'bold',
            font: "22px Arial",
            wordWrap: {
                width:800,
                useAdvancedWrap: true
            }
        }).setInteractive();
        this.convoName = this.add.text(400, 810, "", {
            color: "#ff0000",
            align: "center",
            fontWeight: 'bold',
            font: "30px Arial",
            wordWrap: {
                width:800,
                useAdvancedWrap: true
            }
        }).setInteractive();

        this.currentIndex = -1; //index to access the conversation arrays
        this.convo0 = ["Aestria, Earth, Rukkr", "These three realms make up what we call, the WORLD...", "Our father, the Engineer, judges the souls of humans...",
        "and maintains balance between the three realms...", "The Engineer created us, the Gods, to maintain order in the realm of Aestria", 
        "As well as Demons, to maintain order in the realm of Rukkr...", "This was the world I've always known since my creation... until...", null];
        this.convo1 = ["You're late again for your training, Reena.", "Alyene... sorry but what are we even training for? It's so peaceful around here.", 
        "Hmm, don't try to use that as an excuse again, if our Father learns about this, he probably won't forgive you for that.", 
        "He won't forgive me huh, it's not like we've ever seen Father before. Ever since he created the realm of Aestria he's never been here again, who knows where he is... or if he even created us...",
        "That's enough of your silly speculations, our training is starting, are you two ready, Yune, Reena?", "Yes big sister, let's start", null]; //null terminated arrays
        this.convoNames1 = ["Alyene", "Reena", "Alyene", "Reena", "Alyene", "Yune", null];
        this.convo2 = ["conversation 2 Test", "Conversation 5 Test", null];

            //click anywhere
        this.input.on("pointerdown", ()=>{
            if (currentDialogStatus === "heaven0"){
                this.currentIndex++;
                this.convoText.text = this.convo0[this.currentIndex];
                this.convoName.text = "Reena";
                if(this.convo0[this.currentIndex] === null){
                    this.currentIndex = -1;
                    currentDialogStatus = "heaven1"
                    this.scene.switch('WorldScene');
                }
            }
            else if (currentDialogStatus === "heaven1"){
                this.currentIndex++;
                this.convoText.text = this.convo1[this.currentIndex];
                this.convoName.text = this.convoNames1[this.currentIndex];
                if (this.convo1[this.currentIndex] === null){
                    this.currentIndex = -1; //resest the index and trigger the event
                    //this.scene.switch('WorldScene');
                    this.scene.resume('WorldScene');
                    this.scene.stop('DialogScene');
                    //this.scene.start('BattleScene');
                    this.scene.get('WorldScene').startBattle();
                }
            }
            else if (currentDialogStatus === "heaven2"){
                this.currentIndex++;
                this.convoText.text = this.convo2[this.currentIndex];
                if (this.convo2[this.currentIndex] === null){
                    
                }
            }
        })
        

    },


    //create all the conversations here, and then set interactive to update accordingly
    

});

/*var alyenedialog1 = ["So you've come, at last", "You were always late for your training, what am I going to do with you?",
"Well, what are we waiting for, let's get started...", null];
var conversation1 = new dialog(alyenedialog1, "Alyene");
var convoText = this.add.text(this.reena.x, this.reena.y,
     "HEY HEY HEY", {
        color: "#FF0000",
        align: "center",
        fontWeight: 'bold',
        font: '26px Arial',
        wordWrap: {
            width: 800,
            useAdvancedWrap: true
        }
}).setInteractive();

this.dialogBox.on("pointerdown", ()=>{
    convoText.text = "NO";
})*/



var World1 = new Phaser.Class({
    Extends: WorldScene,

    initialize:

    function World1 ()
    {
        Phaser.Scene.call(this, { key: 'World1' });
    },
    
    create: function(){
        var level0 = this.make.tilemap({
            key: 'level0'
        });
        var tiles = level0.addTilesetImage('Mapset', 'tiles');
        // creating the layers
        this.traverse = level0.createStaticLayer('traverse', tiles, 0, 0);
        this.blocked = level0.createStaticLayer('blocked', tiles, 0, 0);
                //keep an array of all the npcs on this map 
                var npcs = [];
                // create the map
                var level0 = this.make.tilemap({ key: 'level0' });
                
                // first parameter is the name of the tilemap in tiled
                var tiles = level0.addTilesetImage('Mapset', 'tiles');
                
                // creating the layers
                var traverse = level0.createStaticLayer('traverse', tiles, 0, 0);
                var blocked = level0.createStaticLayer('blocked', tiles, 0, 0);
                
                // make all tiles in obstacles collidable
                blocked.setCollisionByExclusion([-1]);
        
                //list of global attributes that the current player has 
        
                var animations = []; //a string of animations being stored 
        
                //conversations array;
        
        
                
                //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
                this.anims.create({
                    key: 'left',
                    frames: this.anims.generateFrameNumbers('Reena', { frames: [8,9,10,11,12,13,14,15]}),
                    frameRate: 5,
                    repeat: -1
                });
                
                // animation with key 'right'
                this.anims.create({
                    key: 'right',
                    frames: this.anims.generateFrameNumbers('Reena', { frames: [0,1,2,3,4,5,6,7] }),
                    frameRate: 5,
                    repeat: -1
                });
                this.anims.create({
                    key: 'up',
                    frames: this.anims.generateFrameNumbers('Reena', { frames: [8,9,10,11,12,13,14,15]}),
                    frameRate: 5,
                    repeat: -1
                });
                this.anims.create({
                    key: 'down',
                    frames: this.anims.generateFrameNumbers('Reena', { frames: [0,1,2,3,4,5,6,7] }),
                    frameRate: 5,
                    repeat: -1
                });     
        
                this.anims.create({
                    key: 'attack',
                    frames: this.anims.generateFrameNumbers('Reena', { frames: [24,25,26,27,28,29,30,31] }),
                    frameRate: 5,
                });
                
                this.anims.create({
                    key: 'defeated',
                    frames: this.anims.generateFrameNumbers('Reena', {frames: [32]}),
                    frameRate: 1,
                    repeat: -1
                })
        
                //alyene animations
                this.anims.create({
                    key: 'rightalyene',
                    frames: this.anims.generateFrameNumbers('Alyene', { frames: [8,9,10,11,12,13,14,15]}),
                    frameRate: 5,
                    repeat: -1
                });
                this.anims.create({
                    key: 'leftalyene',
                    frames: this.anims.generateFrameNumbers('Alyene', { frames: [0,1,2,3,4,5,6,7]}),
                    frameRate: 5,
                    repeat: -1
                });
                this.anims.create({
                    key: 'attackalyene',
                    frames: this.anims.generateFrameNumbers('Alyene', { frames: [24,25,26,27,28,29,30,31]}),
                    frameRate: 5,
                });
                this.anims.create({
                    key: 'defeatedalyene',
                    frames: this.anims.generateFrameNumbers('Alyene', { frames: [33]}),
                    frameRate: 5,
                    repeat: -1
                });
        
                //yune animations
                this.anims.create({
                    key: 'rightyune',
                    frames: this.anims.generateFrameNumbers('Yune', {frames: [8,9,10,11,12,13,14,15]}),
                    frameRate: 5,
                    repeat: -1
                });
                this.anims.create({
                    key: 'leftyune',
                    frames: this.anims.generateFrameNumbers('Yune', {frames: [0,1,2,3,4,5,6,7]}),
                    frameRate: 5,
                    repeat: -1
                });
        
                // our player sprite created through the phycis system
                this.reena = this.physics.add.sprite(640, 128+64, 'Reena', 6);
                
                // don't go out of the map
                this.physics.world.bounds.width = level0.widthInPixels;
                this.physics.world.bounds.height = level0.heightInPixels;
                this.reena.setCollideWorldBounds(true);
                
                // don't walk on trees
                this.physics.add.collider(this.reena, blocked);
        
                // limit camera to map
                this.cameras.main.setBounds(0, 0, level0.widthInPixels, level0.heightInPixels);
                this.cameras.main.startFollow(this.reena);
                this.cameras.main.roundPixels = true; // avoid tile bleed

                        // user input
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        });  // keys.up, keys.down, keys.left, keys.right


        this.input.keyboard.on('keydown_F', ()=>{
            this.scene.switch("PartyMembersScene");
        });

        this.input.keyboard.on('keydown_G', ()=>{
            this.scene.switch("SkillScene");
        });

        currentScene = "World1";
    },
    
    update: function (time, delta)
    {             
        this.reena.body.setVelocity(0);
        
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.reena.body.setVelocityX(-550);
        }
        else if (this.cursors.right.isDown)
        {
            this.reena.body.setVelocityX(550);
        }
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.reena.body.setVelocityY(-550);
        }
        else if (this.cursors.down.isDown)
        {
            this.reena.body.setVelocityY(550);
        }        

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown)
        {
            this.reena.anims.play('left', true);
            //this.reena.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.reena.anims.play('right', true);
            this.reena.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.reena.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.reena.anims.play('down', true);
        }
        else
        {
            //this.reena.anims.stop();
        }
    }
})





