/*jslint this, browser */
/*global window, Arcadia, sona, LevelSelectScene */

(function (root) {
    'use strict';

    var CreditsScene = function () {
        Arcadia.Scene.apply(this, arguments);

        var buttonPadding = 15;

        Arcadia.cycleBackground();

        var title = new Arcadia.Label({
            position: {x: 0, y: -167},
            font: '48px monospace',
            text: 'Thanks\nFor\nPlaying!'
        });
        this.add(title);

        var description = new Arcadia.Label({
            position: {x: 0, y: 33},
            font: '20px monospace',
            text: 'Programming by Nathan Demick\nPuzzle concept by Nikoli\n(c) 2011-2016 Ganbaru Games\nhttps://ganbarugames.com'
        });
        this.add(description);

        var button = new Arcadia.Button({
            position: {x: 0, y: 200},
            color: null,
            border: '2px #fff',
            padding: buttonPadding,
            text: 'OK',
            font: '20px monospace',
            action: function () {
                // Clear out saved level data here! start over like a champ
                // localStorage.setObject('completed', new Array(LEVELS.length));
                sona.play('button');
                Arcadia.changeScene(LevelSelectScene);
            }
        });
        this.add(button);
    };

    CreditsScene.prototype = new Arcadia.Scene();

    root.CreditsScene = CreditsScene;
}(window));
