/*jslint sloppy: true */
/*globals Arcadia, LevelSelectScene, localStorage, sona */

var TitleScene = function () {
    Arcadia.Scene.apply(this);

    Arcadia.cycleBackground();

    var titleLabel,
        playButton,
        tutorialButton,
        rulesButton,
        editorButton,
        padding = 10;

    titleLabel = new Arcadia.Label({
        text: 'Shikaku\nMadness',
        font: '64px monospace',
        position: {
            x: 0,
            y: -100
        }
    });

    this.add(titleLabel);

    playButton = new Arcadia.Button({
        position: { x: 0, y: 80 },
        size: { width: 180, height: 50 },
        color: null,
        border: '2px white',
        text: 'play',
        font: '36px monospace',
        action: function () {
            sona.play('button');
            Arcadia.changeScene(LevelSelectScene);
        }
    });
    this.add(playButton);

    // tutorialButton = new Arcadia.Button({
    //     position: { x: 0, y: playButton.position.y + playButton.size.height + padding },
    //     size: { width: 180, height: 50 },
    //     color: null,
    //     border: '2px white',
    //     text: 'tutorial',
    //     font: '36px monospace',
    //     action: function () {
    //         sona.play('button');
    //         Arcadia.changeScene(GameScene, { tutorial: true });
    //     }
    // });
    // this.add(tutorialButton);

    rulesButton = new Arcadia.Button({
        position: { x: 0, y: playButton.position.y + playButton.size.height + padding },
        size: { width: 180, height: 50 },
        color: null,
        border: '2px white',
        text: 'rules',
        font: '36px monospace',
        action: function () {
            sona.play('button');
            Arcadia.changeScene(RulesScene);
        }
    });
    this.add(rulesButton);

    // editorButton = new Arcadia.Button({
    //     position: { x: 0, y: rulesButton.position.y + rulesButton.size.height + padding },
    //     size: { width: 180, height: 50 },
    //     color: null,
    //     border: '2px white',
    //     text: 'editor',
    //     font: '36px monospace',
    //     action: function () {
    //         sona.play('button');
    //         Arcadia.changeScene(EditorScene);
    //     }
    // });
    // this.add(editorButton);
};

TitleScene.prototype = new Arcadia.Scene();
