/*jslint sloppy: true */
/*globals Arcadia, window, console, localStorage, sona, LEVELS,
GameScene, TitleScene, Thumbnail */

var LevelSelectScene = function (options) {
    Arcadia.Scene.apply(this, arguments);

    options = options || {};

    var title,
        backButton,
        startButton,
        self = this;

    Arcadia.cycleBackground();

    this.selectedLevel = 0;
    this.currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 0;
    this.perPage = 9;
    this.totalPages = Math.ceil(LEVELS.length / this.perPage);
    this.completed = localStorage.getObject('completed') || Array(LEVELS.length);

    this.pageLabel = new Arcadia.Label({
        position: {
            x: 0,
            y: 145
        },
        font: '24px monospace'
    });
    this.add(this.pageLabel);
    this.puzzleLabel = new Arcadia.Label({
        position: {
            x: 0,
            y: 245
        },
        font: '24px monospace'
    });
    this.add(this.puzzleLabel);

    this.difficultyLabel = new Arcadia.Label({
        position: {
            x: 0,
            y: 245
        },
        font: '24px monospace'
    });
    this.add(this.puzzleLabel);

    this.updatePageLabel();

    // Create two "pages" of thumbnail previews
    this.thumbnails = [[], []];

    // Store the default coords of each thumbnail (used for resetting after animations, etc.)
    this.thumbnailPositions = [];

    this.thumbnails.forEach(function (page) {
        var thumbnail,
            thumbnailIndex,
            index,
            previewPadding = 10;

        while (page.length < self.perPage) {
            thumbnailIndex = page.length;
            index = self.currentPage * self.perPage + thumbnailIndex;

            self.thumbnailPositions[thumbnailIndex] = {
                x: -(Thumbnail.SIZE + previewPadding) + (thumbnailIndex % 3) * (Thumbnail.SIZE + previewPadding),
                y: -(Thumbnail.SIZE + previewPadding) + Math.floor(thumbnailIndex / 3) * (Thumbnail.SIZE + previewPadding)
            };

            thumbnail = new Thumbnail({
                position: {
                    x: self.thumbnailPositions[thumbnailIndex].x,
                    y: self.thumbnailPositions[thumbnailIndex].y
                }
            });

            thumbnail.drawPreview(index, self.completed);

            self.add(thumbnail);
            page.push(thumbnail);
        }
    });

    // Move second page offscreen
    this.thumbnails[1].forEach(function (thumbnail) {
        thumbnail.position = {
            x: thumbnail.position.x + self.size.width,
            y: thumbnail.position.y
        };
    });

    this.activeThumbnailPage = 0;

    backButton = new Arcadia.Button({
        position: { x: -this.size.width / 2 + 65, y: -this.size.height / 2 + 25 },
        size: { width: 120, height: 40 },
        color: null,
        border: '2px white',
        label: new Arcadia.Label({
            text: '← title',
            color: 'white',
            font: '24px monospace'
        }),
        action: function () {
            sona.play('button');
            Arcadia.changeScene(TitleScene);
        }
    });
    this.add(backButton);

    title = new Arcadia.Label({
        text: 'Choose\nPuzzle',
        font: '64px monospace',
        position: { x: 0, y: -this.size.height / 2 + 130 }
    });
    this.add(title);

    startButton = new Arcadia.Button({
        position: { x: 0, y: this.size.height / 2 - 50 },
        size: { width: 180, height: 50 },
        color: null,
        border: '2px white',
        label: new Arcadia.Label({
            text: 'play',
            font: '35px monospace'
        }),
        action: function () {
            sona.play('button');
            Arcadia.changeScene(GameScene, { level: self.selectedLevel });
        }
    });
    this.add(startButton);

    // Create previous/next buttons
    this.previousButton = new Arcadia.Button({
        position: { x: -this.size.width / 2 + 30, y: 0 },
        size: { width: 50, height: 50 },
        border: '2px white',
        color: null,
        vertices: 0,
        label: new Arcadia.Label({
            text: '<',
            font: '40px monospace'
        }),
        action: function () {
            self.previous();
        }
    });

    this.nextButton = new Arcadia.Button({
        position: { x: this.size.width / 2 - 30, y: 0 },
        size: { width: 50, height: 50 },
        border: '2px white',
        color: null,
        vertices: 0,
        label: new Arcadia.Label({
            text: '>',
            font: '40px monospace'
        }),
        action: function () {
            self.next();
        }
    });

    this.add(this.previousButton);
    this.add(this.nextButton);

    if (options.selectedLevel !== undefined) {
        this.selectedLevel = options.selectedLevel;
        this.thumbnails[this.selectedLevel - this.perPage * this.currentPage].highlight();
    }
};

LevelSelectScene.prototype = new Arcadia.Scene();

LevelSelectScene.prototype.next = function () {
    var offset = -Arcadia.WIDTH,
        self = this;

    if (this.currentPage < this.totalPages - 1) {
        sona.play('button');
        this.nextButton.disabled = true;
        this.nextButton.alpha = 0.5;

        // Move (old) current page to the left
        this.thumbnails[this.activeThumbnailPage].forEach(function (shape, index) {
            var delay = Math.floor(index / 3) * LevelSelectScene.TRANSITION_DELAY;
            window.setTimeout(function () {
                shape.tween('position', { x: shape.position.x + offset, y: shape.position.y }, LevelSelectScene.TRANSITION_DURATION, LevelSelectScene.TRANSITION_TYPE);
            }, delay);
        });

        // increment currentPage
        this.currentPage += 1;

        // Toggle this var between 0 and 1
        this.activeThumbnailPage = this.activeThumbnailPage === 1 ? 0 : 1;

        // Move (new) current page to the left
        this.thumbnails[this.activeThumbnailPage].forEach(function (shape, index) {
            var delay,
                levelIndex;

            // Move offscreen to the right
            shape.position = {
                x: self.thumbnailPositions[index].x - offset,
                y: shape.position.y
            };

            levelIndex = self.currentPage * self.perPage + index;
            shape.drawPreview(levelIndex, self.completed);

            delay = Math.floor(index / 3) * LevelSelectScene.TRANSITION_DELAY + 100;

            window.setTimeout(function () {
                shape.tween('position', { x: shape.position.x + offset, y: shape.position.y }, LevelSelectScene.TRANSITION_DURATION, LevelSelectScene.TRANSITION_TYPE);
            }, delay);
        });

        this.updatePageLabel();
        localStorage.setItem('currentPage', this.currentPage);

        window.setTimeout(function () {
            self.nextButton.disabled = false;
            if (self.currentPage < self.totalPages - 1) {
                self.nextButton.alpha = 1;
            }
        }, LevelSelectScene.TOTAL_TRANSITION_DURATION);

        if (this.previousButton.alpha < 1) {
            this.previousButton.alpha = 1;
        }
    }
};

LevelSelectScene.prototype.previous = function () {
    var offset = Arcadia.WIDTH,
        self = this;

    if (this.currentPage > 0) {
        sona.play('button');
        this.previousButton.disabled = true;
        this.previousButton.alpha = 0.5;

        // Move (old) current page to the right
        this.thumbnails[this.activeThumbnailPage].forEach(function (shape, index) {
            var delay = Math.floor((self.perPage - index - 1) / 3) * LevelSelectScene.TRANSITION_DELAY;
            window.setTimeout(function () {
                shape.tween('position', { x: shape.position.x + offset, y: shape.position.y }, LevelSelectScene.TRANSITION_DURATION, LevelSelectScene.TRANSITION_TYPE);
            }, delay);
        });

        // decrement currentPage
        this.currentPage -= 1;

        // Toggle this var between 0 and 1
        this.activeThumbnailPage = this.activeThumbnailPage === 1 ? 0 : 1;

        // Move (new) current page to the right
        this.thumbnails[this.activeThumbnailPage].forEach(function (shape, index) {
            var delay,
                levelIndex;

            // Move offscreen to the left
            shape.position = {
                x: self.thumbnailPositions[index].x - offset,
                y: shape.position.y
            };

            levelIndex = self.currentPage * self.perPage + index;
            shape.drawPreview(levelIndex, self.completed);

            delay = Math.floor((self.perPage - index - 1) / 3) * LevelSelectScene.TRANSITION_DELAY + 100;

            window.setTimeout(function () {
                shape.tween('position', { x: shape.position.x + offset, y: shape.position.y }, LevelSelectScene.TRANSITION_DURATION, LevelSelectScene.TRANSITION_TYPE);
            }, delay);
        });

        this.updatePageLabel();
        localStorage.setItem('currentPage', this.currentPage);

        window.setTimeout(function () {
            self.previousButton.disabled = false;
            if (self.currentPage > 0) {
                self.previousButton.alpha = 1;
            }
        }, LevelSelectScene.TOTAL_TRANSITION_DURATION);

        if (this.nextButton.alpha < 1) {
            this.nextButton.alpha = 1;
        }
    }
};

LevelSelectScene.prototype.updatePageLabel = function () {
    this.pageLabel.text = (this.currentPage + 1) + '/' + this.totalPages;
    this.puzzleLabel.text = 'Puzzle #' + this.selectedLevel;
};

LevelSelectScene.prototype.onPointEnd = function (points) {
    var self = this,
        cursor = {
            size: { width: 1, height: 1 },
            position: points[0]
        };

    // Determine if tap/click touched a thumbnail
    this.thumbnails[this.activeThumbnailPage].forEach(function (thumbnail, index) {
        var selected = self.currentPage * self.perPage + index;

        thumbnail.lowlight();

        if (thumbnail.collidesWith(cursor)) {
            sona.play('button');

            thumbnail.highlight();

            self.selectedLevel = selected;

            self.updatePageLabel();
        }
    });
};

LevelSelectScene.TRANSITION_TYPE = 'cubicInOut';
LevelSelectScene.TRANSITION_DURATION = 400;
LevelSelectScene.TRANSITION_DELAY = 100;
LevelSelectScene.TOTAL_TRANSITION_DURATION = 600;
