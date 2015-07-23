
var Grid = function (options) {
    Arcadia.Shape.apply(this, arguments);

    this.size = {
        width: 375,
        height: 375
    };

    this.levelData = options.levelData;
    this.gridSize = this.levelData.size;
    this.cellSize = this.size.width / this.gridSize;

    this.shadow = '5px 5px 0 rgba(0, 0, 0, 0.5)';

    var left, right, top, bottom;

    left = -this.size.width / 2;
    right = this.size.width / 2;
    top = -this.size.height / 2;
    bottom = this.size.height / 2;

    // Get bounds of user interactive area
    this.gridBounds = {
        right: right + this.position.x,
        left: (right - (this.cellSize * this.gridSize)) + this.position.x,
        bottom: bottom + this.position.y,
        top: (bottom - (this.cellSize * this.gridSize)) + this.position.y
    };

    this.path = function (context) {
        var i,
            left, right,
            top, bottom;

        left = -this.size.width / 2;
        right = this.size.width / 2;
        top = -this.size.height / 2;
        bottom = this.size.height / 2;

        // Draw background
        context.fillStyle = '#fff';
        context.fillRect(left * Arcadia.PIXEL_RATIO, top * Arcadia.PIXEL_RATIO, this.size.width * Arcadia.PIXEL_RATIO, this.size.height * Arcadia.PIXEL_RATIO);

        for (i = 0; i <= this.gridSize; i += 1) {
            // Horizontal lines
            context.moveTo(left * Arcadia.PIXEL_RATIO, (bottom - this.cellSize * i) * Arcadia.PIXEL_RATIO);
            context.lineTo(right * Arcadia.PIXEL_RATIO, (bottom - this.cellSize * i) * Arcadia.PIXEL_RATIO);

            // Vertical lines
            context.moveTo((right - this.cellSize * i) * Arcadia.PIXEL_RATIO, top * Arcadia.PIXEL_RATIO);
            context.lineTo((right - this.cellSize * i) * Arcadia.PIXEL_RATIO, bottom * Arcadia.PIXEL_RATIO);
        }

        // Draw grid
        context.lineWidth = 2 * Arcadia.PIXEL_RATIO;
        context.strokeStyle = '#000';
        context.stroke();

        // Draw border
        context.strokeRect(left * Arcadia.PIXEL_RATIO, top * Arcadia.PIXEL_RATIO, this.size.width * Arcadia.PIXEL_RATIO, this.size.height * Arcadia.PIXEL_RATIO);
    };

    this.drawClues();
};

Grid.prototype = new Arcadia.Shape();


Grid.prototype.drawClues = function () {
    var self = this;

    this.levelData.clues.forEach(function (clue) {
        var clueLabel,
            x = clue[0],
            y = clue[1],
            value = clue[2];
        
        clueLabel = new Clue({
            number: value,
            position: {
                x: (-self.size.width / 2) + (x * self.cellSize) + Clue.SIZE / 2 + 2, // TODO: get rid of these magic numbers
                y: (-self.size.height / 2) + (y * self.cellSize) + Clue.SIZE / 2 + 2
            }
        });
        self.add(clueLabel);
    });
};

Grid.prototype.containsPoint = function (point) {
    return point.x < this.gridBounds.right &&
      point.x > this.gridBounds.left &&
      point.y < this.gridBounds.bottom &&
      point.y > this.gridBounds.top;
};

Grid.prototype.getRowAndColumn = function (point) {
    if (!this.containsPoint(point)) {
        return [null, null];
    }

    var row, column;

    row = Math.floor((point.y - this.gridBounds.top) / this.cellSize);
    column = Math.floor((point.x - this.gridBounds.left) / this.cellSize);

    return [row, column];
};
