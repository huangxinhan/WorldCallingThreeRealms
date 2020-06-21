var config = {
    type: Phaser.GRAPHICS,
    parent: 'content',
    width: 1280,
    height: 1024,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true // set to true to view zones
        }
    },
    scene: [
        BootScene,
        WorldScene,
        World1,
        World2,
        BattleScene,
        UIScene,
        PartyMembersScene,
        SkillScene,
        DialogScene
    ]
};
var game = new Phaser.Game(config);