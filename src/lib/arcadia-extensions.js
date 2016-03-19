/*jslint this, browser */
/*global window */

(function (root) {
    'use strict';

    var Arcadia = root.Arcadia || {};

    Arcadia.isLocked = function () {
        return window.store !== undefined && localStorage.getBoolean('unlocked') === false;
    };

    Arcadia.cycleBackground = function () {
        var TOTAL_BACKGROUNDS = 6;
        var backgroundCounter = parseInt(localStorage.getItem('backgroundCounter'), 10) || 1;

        backgroundCounter += 1;

        if (backgroundCounter > TOTAL_BACKGROUNDS) {
            backgroundCounter = 1;
        }

        localStorage.setItem('backgroundCounter', backgroundCounter);
        document.body.style['background-image'] = 'url("assets/images/background_' + backgroundCounter + '.png")';
    };

    Arcadia.FREE_LEVEL_COUNT = 20;

    root.Arcadia = Arcadia;
}(window));
