/*jslint sloppy: true */
/*globals Arcadia, window, LEVELS, INCOMPLETE */

var Thumbnail = function () {
    Arcadia.Shape.apply(this, arguments);

    this.size = {
        width: Thumbnail.SIZE,
        height: Thumbnail.SIZE
    };

    this.border = '2px white';
    this.color = null;

    this.pixels = new Arcadia.Shape({
        size: {
            width: this.size.width,
            height: this.size.height
        }
    });

    this.pixels.path = function (context) {
        var pixelSize,
            originX,
            originY,
            self = this;

        if (!this.clues) {
            return;
        }

        pixelSize = this.size.width / this.puzzleSize * Arcadia.PIXEL_RATIO;
        originX = -self.size.width / 2 * Arcadia.PIXEL_RATIO;
        originY = -self.size.height / 2 * Arcadia.PIXEL_RATIO;

        context.fillStyle = 'white';

        this.clues.forEach(function (clue, index) {
            var x = clue[0],
                y = clue[1];

            context.beginPath();
            context.arc(originX + (x * pixelSize) + pixelSize / 2,
                        originY + (y * pixelSize) + pixelSize / 2,
                        pixelSize / 2,
                        0,
                        Math.PI * 2);
            context.closePath();
            context.fill();
        });
    };

    this.add(this.pixels);
};

Thumbnail.prototype = new Arcadia.Shape();

Thumbnail.SIZE = 75;

Thumbnail.prototype.drawPreview = function (levelIndex, isComplete) {
    // Can't draw a preview without data
    if (LEVELS[levelIndex] === undefined) {
        this.alpha = 0;
        return;
    }

    if (this.alpha < 1) {
        this.alpha = 1;
    }

    if (isComplete) {
        this.border = '2px limegreen';
    } else if (Arcadia.isLocked() && levelIndex >= Arcadia.freeLevels) {
        this.border = '2px crimson';
    } else {
        this.border = '2px white';
    }

    this.pixels.puzzleSize = LEVELS[levelIndex].size;
    this.pixels.clues = LEVELS[levelIndex].clues;
    this.pixels.dirty = true;
};

Thumbnail.prototype.highlight = function () {
    this._border.width = 5;
    this.dirty = true;
    this.scale = 1.1;
};

Thumbnail.prototype.lowlight = function () {
    this._border.width = 2;
    this.dirty = true;
    this.scale = 1;
};
