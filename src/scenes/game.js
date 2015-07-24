var GameScene = function (options) {
    Arcadia.Scene.apply(this, arguments);

    if (options === undefined) {
        options = {};
    }

    this.color = '#ccc';
    this.difficulty = options.difficulty || 'beginner';
    this.level = options.level || 0;
    this.ignoreInput = false;

    this.levelData = LEVELS[this.difficulty][this.level];

    this.timer = 0;
    this.timerLabel = new Arcadia.Label();

    this.grid = new Grid({
        levelData: this.levelData,
        position: {
            x: Arcadia.WIDTH - (Grid.SIZE / 2),
            y: Arcadia.HEIGHT / 2
        }
    });
    this.add(this.grid);

    this.squares = [];
    this.activeSquare = new Arcadia.Shape({
        color: 'rgba(255, 0, 0, 0.5)',
        border: '2px darkred',
        alpha: 0
    });
    this.add(this.activeSquare);

    this.initUi();
};

GameScene.prototype = new Arcadia.Scene();

GameScene.prototype.update = function (delta) {
    Arcadia.Scene.prototype.update.call(this, delta);

    this.timer -= delta;

    var minutes,
        seconds;

    minutes = Math.round(this.timer / 60);
    seconds = Math.round(this.timer % 60);
    // TODO break this out into two labels, to prevent text jumping
    this.timerLabel.text = minutes + ':' + seconds;
};

GameScene.prototype.onPointStart = function (points) {
    var values, row, column, self;

    if (this.ignoreInput) {
        return;
    }

    self = this;
    values = this.grid.getRowAndColumn(points[0]);
    row = values[0];
    column = values[1];

    if (row === null || column === null) {
        return;
    }

    this.startRow = this.previousRow = row;
    this.startColumn = this.previousColumn = column;

    this.activeSquare.alpha = 1;
    this.activeSquare.position = {
        x: this.grid.bounds.left + column * this.grid.cellSize + this.grid.cellSize / 2,
        y: this.grid.bounds.top + row * this.grid.cellSize + this.grid.cellSize / 2
    };
    this.activeSquare.size = {
        width: this.grid.cellSize,
        height: this.grid.cellSize
    };

    // TODO: Determine if the square collides with another;
    // if so, delete the other one
    this.squares.forEach(function (square, index) {
        if (self.activeSquare.collidesWith(square)) {
            self.remove(square);
            self.squares.splice(index, 1);

            // TODO: play "remove" sfx
        }
    });
};

GameScene.prototype.onPointMove = function (points) {
    var values, row, column, width, height;

    if (this.ignoreInput) {
        return;
    }

    if (this.startRow === null || this.startColumn === null) {
        return;
    }

    values = this.grid.getRowAndColumn(points[0]);
    row = values[0];
    column = values[1];

    if (row === null || column === null) {
        return;
    }

    /*
    # This allows a single click/tap to remove rects
    # User has to move input at least 5px to start drawing a new one
    if Input.distance(position, @startPosition) > 5 and @rectangle.css('display') is 'none'
        @rectangle.show()
        @$('.area').html "Area:<br>1"
        @trigger 'sfx:play', 'move'
    */

    width = Math.abs(this.startColumn - column) + 1;
    height = Math.abs(this.startRow - row) + 1;

    // Set position
    this.activeSquare.position = {
        x: this.grid.bounds.left + ((width / 2 + this.startColumn) * this.grid.cellSize),
        y: this.grid.bounds.top + ((height / 2 + this.startRow) * this.grid.cellSize)
    };

    // Change size if necessary
    if (row !== this.previousRow) {
        this.activeSquare.size = {
            width: this.activeSquare.size.width,
            height: height * this.grid.cellSize
        };
    }

    // Offset position if necessary
    if (row < this.startRow) {
        this.activeSquare.position = {
            x: this.activeSquare.position.x,
            y: this.activeSquare.position.y - ((this.startRow - row) * this.grid.cellSize)
        };
    }

    // Change size if necessary
    if (column !== this.previousColumn) {
        this.activeSquare.size = {
            width: width * this.grid.cellSize,
            height: this.activeSquare.size.height
        };
    }

    // Offset position if necessary
    if (column < this.startColumn) {
        this.activeSquare.position = {
            x: this.activeSquare.position.x - ((this.startColumn - column) * this.grid.cellSize),
            y: this.activeSquare.position.y
        };
    }

    if (row !== this.previousRow || column !== this.previousColumn) {
        // sona.play('move')
        // this.areaLabel.text = 'Area:\n' + (width * height);
    }

    this.previousRow = row;
    this.previousColumn = column;
};

GameScene.prototype.onPointEnd = function (points) {
    var width, height, area, dupe;

    if (this.activeSquare.alpha === 1) {
        width = Math.abs(this.startColumn - this.previousColumn) + 1;
        height = Math.abs(this.startRow - this.previousRow) + 1;
        area = width * height;

        // Dupe the activeSquare
        dupe = new Arcadia.Shape({
            color: 'rgba(255, 0, 0, 0.5)',
            border: '2px darkred',
            position: {
                x: this.activeSquare.position.x,
                y: this.activeSquare.position.y
            },
            size: {
                width: this.activeSquare.size.width,
                height: this.activeSquare.size.height
            }
        });
        this.add(dupe);
        this.squares.push(dupe);

        // Check if square overlaps a clue

        // If square overlaps a single clue, check if the area matches the clue

        // If area matches the single clue, give the square a different color

        // square.area = area

        // Reset the activeSquare
        this.activeSquare.alpha = 0;
    }

    // Check if player has won
    if (this.check()) {
        this.win();
    }

    // Clear out previous data
    this.startRow = this.previousRow = null;
    this.startColumn = this.previousColumn = null;
};

GameScene.prototype.check = function () {
    return false;
};

GameScene.prototype.win = function () {
    alert('u solved the puzzle, bro');
};

GameScene.prototype.initUi = function () {
    // TODO: Create UI (timer, etc.) components here
};
