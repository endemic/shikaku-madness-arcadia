var Thumbnail = function () {
    Arcadia.Shape.apply(this, arguments);

    this.size = {
        width: Thumbnail.SIZE,
        height: Thumbnail.SIZE
    };

    this.shadow = '1px 0 5px black';
    this.border = '1px black';

    this.pixels = new Arcadia.Pool();
    this.pixels.factory = function () {
        return new Arcadia.Shape({
            color: 'black',
            vertices: 0
        });
    };
    this.add(this.pixels);
};

Thumbnail.prototype = new Arcadia.Shape();

Thumbnail.SIZE = 75;

Thumbnail.prototype.drawPreview = function (levelIndex) {
    if (LEVELS[levelIndex] === undefined) {
        this.alpha = 0;
        return;
    } else if (this.alpha < 1) {
        this.alpha = 1;
    }

    this.pixels.deactivateAll();

    var self,
        clues,
        puzzleSize,
        previewSize,
        pixelSize;

    self = this;
    clues = LEVELS[levelIndex].clues;
    puzzleSize = LEVELS[levelIndex].size;
    // previewSize = Math.floor(this.size.width / puzzleSize) * puzzleSize;
    previewSize = Thumbnail.SIZE;
    pixelSize = previewSize / puzzleSize;

    clues.forEach(function (clue) {
        var x = clue[0],
            y = clue[1],
            pixel = self.pixels.activate();

        pixel.size = {
            width: Math.round(pixelSize),
            height: Math.round(pixelSize)
        };
        pixel.position = {
            x: -self.size.width / 2 + x * pixelSize + pixelSize / 2,
            y: -self.size.height / 2 + y * pixelSize + pixelSize / 2
        };
    });
};

