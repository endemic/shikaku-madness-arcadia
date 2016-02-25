/*jslint sloppy: true */
/*globals Arcadia, window, document, localStorage */

Arcadia.isLocked = function () {
    return window.store !== undefined && localStorage.getBoolean('unlocked') === false;
};

Arcadia.cycleBackground = function () {
    var TOTAL_BACKGROUNDS = 6,
        backgroundCounter;

    backgroundCounter = parseInt(localStorage.getItem('backgroundCounter'), 10) || 1;

    backgroundCounter += 1;

    if (backgroundCounter > TOTAL_BACKGROUNDS) {
        backgroundCounter = 1;
    }

    localStorage.setItem('backgroundCounter', backgroundCounter);
    document.body.style['background-image'] = 'url("assets/images/background_' + backgroundCounter + '.png")';
};

Arcadia.freeLevels = 20;
