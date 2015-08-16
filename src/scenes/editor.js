/*jslint sloppy: true */
/*globals Arcadia, window, console, localStorage, sona, Grid */

var EditorScene = function () {
    Arcadia.Scene.apply(this);

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
    var biggerButton,
        smallerButton,
        padding = 10,
        self = this;

    smallerButton = new Arcadia.Button({
        color: 'white',
        border: '2px black',
        shadow: '5px 5px 0 rgba(0, 0, 0, 0.5)',
        label: new Arcadia.Label({
            color: 'black',
            text: 'smaller',
            font: '20px sans-serif'
        }),
        size: { width: Grid.MAX_SIZE / 2 - padding, height: 40 },
        action: function () {
            sona.play('button');
            if (self.gridCount > self.MIN_GRID_COUNT) {
                self.gridCount -= 1;
            }
            self.grid.resize(self.gridCount);
        }
    });
    smallerButton.position =  {
        x: smallerButton.size.width / 2 + padding / 2,
        y: -this.size.height / 2 + smallerButton.size.height / 2 + this.verticalPadding
    };
    this.add(smallerButton);

    biggerButton = new Arcadia.Button({
        color: 'white',
        border: '2px black',
        shadow: '5px 5px 0 rgba(0, 0, 0, 0.5)',
        label: new Arcadia.Label({
            color: 'black',
            text: 'bigger',
            font: '20px sans-serif'
        }),
        size: { width: Grid.MAX_SIZE / 2 - padding, height: 40 },
        action: function () {
            sona.play('button');
            if (self.gridCount < self.MAX_GRID_COUNT) {
                self.gridCount += 1;
            }
            self.grid.resize(self.gridCount);
        }
    });
    biggerButton.position =  {
        x: -biggerButton.size.width / 2 - padding / 2,
        y: -this.size.height / 2 + biggerButton.size.height / 2 + this.verticalPadding
    };
    this.add(biggerButton);
};
