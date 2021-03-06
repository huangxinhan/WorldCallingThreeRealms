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
            debug: false // set to true to view zones
        }
    },
    scene: [
        BootScene,
        WorldScene,
        World1,
        World2,
        World3,
        World4,
        World5,
        World6,
        BattleScene,
        UIScene,
        PartyMembersScene,
        SkillScene,
        DialogScene
    ]
};
var game = new Phaser.Game(config);