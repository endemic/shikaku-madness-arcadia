var GameScene = function (options) {
    Arcadia.Scene.apply(this, arguments);

    if (options === undefined) {
        options = {};
    }

    this.difficulty = options.difficulty || 'beginner';
    this.level = options.level || 0;
    this.color = '#ccc';

    this.levelData = LEVELS[this.difficulty][this.level];

    this.timer = 0;
    this.timerLabel = new Arcadia.Label({});

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

};

GameScene.prototype.onPointMove = function (points) {

};

GameScene.prototype.onPointEnd = function (points) {
    // do something here?
};

GameScene.prototype.initUi = function () {
    this.grid = new Grid({
        levelData: this.levelData,
        position: {
            x: Arcadia.WIDTH / 2,
            y: Arcadia.HEIGHT / 2
        }
    });
    this.add(this.grid);
};
