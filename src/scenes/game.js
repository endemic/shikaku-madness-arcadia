/*jslint sloppy: true */
/*globals Arcadia, window, console,
  localStorage, sona */

var GameScene = function (options) {
    Arcadia.Scene.apply(this, arguments);

    options = options || {};

    //this.color = '#ccc';
    this.difficulty = options.difficulty || 'beginner';
    this.level = options.level || 0;
    this.levelData = LEVELS[this.level];
    this.ignoreInput = false;
    this.timer = 0;

    // Puzzle grid
    this.grid = new Grid({
        size: this.levelData.size,
        position: {
            x: 0,
            y: this.size.height / 2 - Grid.SIZE / 1.75
        }
    });
    this.add(this.grid);

    // Clues
    this.clues = [];
    this.drawClues();

    // Squares
    this.squares = [];
    this.activeSquare = new Square({
        alpha: 0
    });
    this.add(this.activeSquare);

    this.drawUi();
};

GameScene.prototype = new Arcadia.Scene();

GameScene.prototype.update = function (delta) {
    Arcadia.Scene.prototype.update.call(this, delta);

    this.timer += delta;

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

    this.startPoint = points[0];
    this.startRow = this.previousRow = row;
    this.startColumn = this.previousColumn = column;

    this.activeSquare.position = {
        x: this.grid.bounds.left + column * this.grid.cellSize + this.grid.cellSize / 2,
        y: this.grid.bounds.top + row * this.grid.cellSize + this.grid.cellSize / 2
    };
    this.activeSquare.size = {
        width: this.grid.cellSize,
        height: this.grid.cellSize
    };

    // Determine if the square collides with another;
    // if so, delete the old one
    this.squares.forEach(function (square, index) {
        if (self.activeSquare.collidesWith(square)) {
            self.remove(square);
            self.squares.splice(index, 1);
            sona.play('erase');
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

    // This allows a single click/tap to remove squares
    // Player has to move input at least 5px to start drawing a new one
    if (Arcadia.distance(points[0], this.startPoint) > 5 && this.activeSquare.alpha === 0) {
        this.activeSquare.alpha = 1;
        this.areaLabel.text = 'Area:\n1';
        sona.play('move');
    }

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
        sona.play('move');
        console.log('trying to play sound');
        this.areaLabel.text = 'Area:\n' + (width * height);
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
        dupe = new Square({
            position: {
                x: this.activeSquare.position.x,
                y: this.activeSquare.position.y
            },
            size: {
                width: this.activeSquare.size.width,
                height: this.activeSquare.size.height
            },
            area: area  // non-standard prop
        });

        this.add(dupe);
        this.squares.push(dupe);

        // Check if square overlaps a clue

        // If square overlaps a single clue, check if the area matches the clue

        // If area matches the single clue, give the square a different color

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
    this.areaLabel.text = 'Area:\n--'
};

GameScene.prototype.check = function () {
    var square, clue, self;

    self = this;

    if (this.squares.length != this.clues.length) {
        console.log('Square count doesn\'t match clue count');
        return false;
    }

    var success = true;

    this.squares.forEach(function (square) {
        var collisionCount = 0;
        var validClue = null;

        self.clues.forEach(function (clue) {
            if (clue.collidesWith(square)) {
                validClue = clue;
                collisionCount += 1;
            } 
        });

        if (collisionCount > 1 || collisionCount === 0) {
            console.log("Failing because a clue has either no squares covering it, or multiple squares covering it");
            success = false;
        } else if (validClue.number !== square.area) {
            console.log("Clue and rect area don't match!");
            success = false;
        }
    });

    return success;
};

GameScene.prototype.win = function () {
    alert('u solved the puzzle, bro');
    sona.play('win');
    Arcadia.changeScene(LevelSelectScene);
};

GameScene.prototype.drawClues = function () {
    var self = this;

    this.levelData.clues.forEach(function (clue) {
        var clueLabel,
            x = clue[0],
            y = clue[1],
            value = clue[2];
        
        clueLabel = new Clue({
            number: value,
            position: {
                x: self.grid.bounds.left + (x * self.grid.cellSize) + Clue.SIZE / 2 + 2, // TODO: get rid of these magic numbers
                y: self.grid.bounds.top + (y * self.grid.cellSize) + Clue.SIZE / 2 + 2
            }
        });
        self.add(clueLabel);
        self.clues.push(clueLabel);
    });
};

GameScene.prototype.drawUi = function () {
    
    var areaLabelBackground,
        timerLabelBackground,
        quitButton,
        resetButton,
        self = this;

    quitButton = new Arcadia.Button({
        color: 'white',
        border: '2px black',
        label: new Arcadia.Label({
            color: 'black',
            text: 'quit',
            font: '20px sans-serif',   // TODO button throws exception w/o a font arg
        }),
        size: { width: 175, height: 50 },
        position: {
            x: 100,
            y: -this.size.height / 2 + 40
        },
        action: function () {
            sona.play('button');
            Arcadia.changeScene(LevelSelectScene);
        }
    });
    this.add(quitButton);

    resetButton = new Arcadia.Button({
        color: 'white',
        border: '2px black',
        label: new Arcadia.Label({
            color: 'black',
            text: 'reset',
            font: '20px sans-serif'
        }),
        size: { width: 175, height: 50 },
        position: {
            x: -100,
            y: -this.size.height / 2 + 40
        },
        action: function () {
            sona.play('button');
            // TODO: maybe have a confirm dialog here
            self.squares.forEach(function (square) {
                self.remove(square);
            });
            self.squares = [];
        }
    });
    this.add(resetButton);

    areaLabelBackground = new Arcadia.Shape({
        color: 'white',
        border: '2px black',
        shadow: '5px 5px 0 rgba(0, 0, 0, 0.5)',
        size: {
            width: 100,
            height: 100
        },
        position: {
            x: -50,
            y: -this.size.height / 2 + 150
        }
    });

    this.add(areaLabelBackground);

    this.areaLabel = new Arcadia.Label({
        color: 'black',
        text: 'Area:\n--',
        font: '20px sans-serif'
    });
    areaLabelBackground.add(this.areaLabel);

    timerLabelBackground = new Arcadia.Shape({
        color: 'white',
        border: '2px black',
        shadow: '5px 5px 0 rgba(0, 0, 0, 0.5)',
        size: {
            width: 100,
            height: 100
        },
        position: {
            x: 120,
            y: -this.size.height / 2 + 150
        }
    });
    this.add(timerLabelBackground);

    this.timerLabel = new Arcadia.Label({
        color: 'black',
        text: '00:00',
        font: '20px sans-serif'
    });
    timerLabelBackground.add(this.timerLabel);
};
