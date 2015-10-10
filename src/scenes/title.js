/*jslint sloppy: true */
/*globals Arcadia, LevelSelectScene, localStorage, sona */

var TitleScene = function () {
    Arcadia.Scene.apply(this);

    Arcadia.cycleBackground();

    var titleLabel,
        startButton;

    titleLabel = new Arcadia.Label({
        text: 'Shikaku\nMadness',
        font: '64px monospace',
        position: {
            x: 0,
            y: -100
        }
    });

    this.add(titleLabel);

    startButton = new Arcadia.Button({
        position: { x: 0, y: 200 },
        size: { width: 180, height: 50 },
        color: null,
        border: '3px white',
        text: 'start',
        font: '36px monospace',
        action: function () {
            sona.play('button');
            Arcadia.changeScene(LevelSelectScene);
        }
    });
    this.add(startButton);
};

TitleScene.prototype = new Arcadia.Scene();
