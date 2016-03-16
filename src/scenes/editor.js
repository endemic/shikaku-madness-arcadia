/*jslint this, browser */
/*global window, Arcadia, sona */

(function (root) {
    'use strict';

    var EditorScene = function () {
        Arcadia.Scene.apply(this);

        Arcadia.cycleBackground();

        /*
         * Idears: button to determine current action: draw square or place clue
            * drawing/erasing squares is the same as the game
            * w/ clues, touch to place/delete, need to place inside a square; area
              gives the "number" of the clue, can't place outside a square
         */

        this.gridCount = this.MAX_GRID_COUNT = 10;
        this.MIN_GRID_COUNT = 5;
        this.verticalPadding = 81;

        // Puzzle grid
        this.grid = new Grid({
            size: this.gridCount,
            position: {
                x: 0,
                y: this.size.height / 2 - Grid.MAX_SIZE / 2 - this.verticalPadding
            }
        });
        this.add(this.grid);

        this.drawUi();
    };

    EditorScene.prototype = new Arcadia.Scene();

    EditorScene.prototype.save = function () {
        var userPuzzles = localStorage.getObject('userPuzzles') || [];
        /*
            Puzzle data format: {
                "size":5,
                "difficulty":"tutorial",
                "clues":[[x,y,number],[3,1,9],[1,4,4],[4,3,6]],
                "squares":[[x, y, width, height]] // (x,y) is lower left
            };
        */
        localStorage.setObject('userPuzzles', userPuzzles);
    };

    EditorScene.prototype.drawUi = function () {
        var padding = 10;
        var buttonWidth = Grid.MAX_SIZE / 2 - padding;
        var buttonHeight = 40;
        var self = this;

        var smallerButton = new Arcadia.Button({
            color: null,
            border: '3px white',
            label: new Arcadia.Label({
                text: 'smaller',
                font: '24px monospace'
            }),
            size: { width: buttonWidth, height: buttonHeight },
            position: {
                x: buttonWidth / 2 + padding / 2,
                y: -this.size.height / 2 + buttonHeight / 2 + this.verticalPadding
            },
            action: function () {
                sona.play('button');
                if (self.gridCount > self.MIN_GRID_COUNT) {
                    self.gridCount -= 1;
                }
                self.grid.resize(self.gridCount);
            }
        });
        this.add(smallerButton);

        var biggerButton = new Arcadia.Button({
            color: null,
            border: '3px white',
            label: new Arcadia.Label({
                text: 'bigger',
                font: '24px monospace'
            }),
            size: { width: buttonWidth, height: buttonHeight },
            position: {
                x: -buttonWidth / 2 - padding / 2,
                y: -this.size.height / 2 + buttonHeight / 2 + this.verticalPadding
            },
            action: function () {
                sona.play('button');
                if (self.gridCount < self.MAX_GRID_COUNT) {
                    self.gridCount += 1;
                }
                self.grid.resize(self.gridCount);
            }
        });
        this.add(biggerButton);

        var resetButton = new Arcadia.Button({
            color: null,
            border: '3px white',
            label: new Arcadia.Label({
                text: 'reset',
                font: '24px monospace'
            }),
            size: { width: buttonWidth, height: buttonHeight },
            position: {
                x: buttonWidth / 2 + padding / 2,
                y: smallerButton.position.y + smallerButton.size.height + padding
            },
            action: function () {
                sona.play('button');
                // TODO: Reset here
            }
        });
        this.add(resetButton);

        var saveButton = new Arcadia.Button({
            color: null,
            border: '3px white',
            label: new Arcadia.Label({
                text: 'save & quit',
                font: '24px monospace'
            }),
            size: { width: buttonWidth, height: buttonHeight },
            position: {
                x: -buttonWidth / 2 - padding / 2,
                y: biggerButton.position.y + biggerButton.size.height + padding
            },
            action: function () {
                sona.play('button');
                self.save();
                Arcadia.changeScene(TitleScene);
            }
        });
        this.add(saveButton);
    };

    EditorScene.prototype.onPointStart = function (points) {
        var self = this;
        var values = this.grid.getRowAndColumn(points[0]);
        var row = values[0];
        var column = values[1];

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

        // Make slightly smaller; was causing erroneous collisions
        this.activeSquare.size = {
            width: this.grid.cellSize - 1,
            height: this.grid.cellSize - 1
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

    EditorScene.prototype.onPointMove = function (points) {
        if (this.startRow === null || this.startColumn === null) {
            return;
        }

        var values = this.grid.getRowAndColumn(points[0]);
        var row = values[0];
        var column = values[1];

        if (row === null || column === null) {
            return;
        }

        // This allows a single click/tap to remove squares
        // Player has to move input at least 5px to start drawing a new one
        if (Arcadia.distance(points[0], this.startPoint) > 5 && this.activeSquare.alpha === 0) {
            this.activeSquare.alpha = 1;
            this.areaLabel.text = 'Area\n1';
            sona.play('move');
        }

        var width = Math.abs(this.startColumn - column) + 1;
        var height = Math.abs(this.startRow - row) + 1;

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
            this.areaLabel.text = 'Area\n' + (width * height);
        }

        this.previousRow = row;
        this.previousColumn = column;
    };

    EditorScene.prototype.onPointEnd = function (points) {
        if (this.activeSquare.alpha === 1) {
            var width = Math.abs(this.startColumn - this.previousColumn) + 1;
            var height = Math.abs(this.startRow - this.previousRow) + 1;
            var area = width * height;

            // Dupe the activeSquare
            var dupe = new Square({
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

            // Reset the activeSquare
            this.activeSquare.alpha = 0;
        } else {
            // Try to place the hint, if intersects a square
        }

        // Clear out previous data
        this.startRow = this.previousRow = null;
        this.startColumn = this.previousColumn = null;
    };

    root.EditorScene = EditorScene;
}(window));
