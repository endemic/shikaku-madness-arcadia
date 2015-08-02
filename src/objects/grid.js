
var Grid = function (options) {
    Arcadia.Shape.apply(this, arguments);

    this.size = {
        width: Grid.SIZE,
        height: Grid.SIZE
    };

    this.gridSize = options.size;
    this.cellSize = this.size.width / this.gridSize;

    // TODO: draw this in path()
    this.shadow = '5px 5px 0 rgba(0, 0, 0, 0.5)';

    var left, right, top, bottom;

    left = -this.size.width / 2;
    right = this.size.width / 2;
    top = -this.size.height / 2;
    bottom = this.size.height / 2;

    // Get bounds of user interactive area
    this.bounds = {
        right: right + this.position.x,
        left: (right - (this.cellSize * this.gridSize)) + this.position.x,
        bottom: bottom + this.position.y,
        top: (bottom - (this.cellSize * this.gridSize)) + this.position.y
    };
};

Grid.prototype = new Arcadia.Shape();

Grid.SIZE = 375;

Grid.prototype.path = function (context) {
    var i,
        left,
        right,
        top,
        bottom;

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

Grid.prototype.containsPoint = function (point) {
    return point.x < this.bounds.right &&
      point.x > this.bounds.left &&
      point.y < this.bounds.bottom &&
      point.y > this.bounds.top;
};

Grid.prototype.getRowAndColumn = function (point) {
    if (!this.containsPoint(point)) {
        return [null, null];
    }

    var row, column;

    row = Math.floor((point.y - this.bounds.top) / this.cellSize);
    column = Math.floor((point.x - this.bounds.left) / this.cellSize);

    return [row, column];
};
