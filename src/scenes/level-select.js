/*jslint sloppy: true */
/*globals Arcadia, window, console, localStorage, sona, LEVELS,
GameScene, Title, Thumbnail */

var LevelSelectScene = function (options) {
    Arcadia.Scene.apply(this, arguments);

    options = options || {};

    var title,
        backButton,
        startButton,
        self = this;

    this.selectedLevel = 0;
    this.currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 0;
    this.perPage = 9;
    this.totalPages = Math.ceil(LEVELS.length / this.perPage);

    this.pageLabel = new Arcadia.Label({
        position: {
            x: 0,
            y: this.size.height / 2 - 100
        }
    });
    this.updatePageLabel();
    this.add(this.pageLabel);

    // Create two "pages" of thumbnail previews
    this.thumbnails = [[], []];

    // Store the default coords of each thumbnail (used for resetting after animations, etc.)
    this.thumbnailPositions = [];

    this.thumbnails.forEach(function (page) {
        var thumbnail,
            index,
            previewSize = 75,
            previewPadding = 10;

        while (page.length < self.perPage) {
            index = page.length;

            self.thumbnailPositions[index] = {
                x: -(previewSize + previewPadding) + (index % 3) * (previewSize + previewPadding),
                y: -(previewSize + previewPadding) + Math.floor(index / 3) * (previewSize + previewPadding)
            };

            thumbnail = new Thumbnail({
                size: {
                    width: previewSize,
                    height: previewSize
                },
                position: {
                    x: self.thumbnailPositions[index].x,
                    y: self.thumbnailPositions[index].y
                },
                shadow: '5px 5px 0 rgba(0, 0, 0, 0.5)'
            });

            thumbnail.drawPreview(self.currentPage * self.perPage + index);

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
        color: 'white',
        border: '1px black',
        shadow: '1px 0 5px black',
        label: new Arcadia.Label({
            text: '← back',
            color: 'black',
            font: '25px sans-serif'
        }),
        action: function () {
            sona.play('button');
            Arcadia.changeScene(Title);
        }
    });
    this.add(backButton);

    title = new Arcadia.Label({
        text: 'Choose\nPuzzle',
        font: '65px sans-serif',
        color: 'white',
        border: '1px black',
        shadow: '1px 0 5px black',
        position: { x: 0, y: -this.size.height / 2 + 130 }
    });
    this.add(title);

    startButton = new Arcadia.Button({
        position: { x: 0, y: this.size.height / 2 - 50 },
        size: { width: 180, height: 50 },
        color: 'white',
        border: '1px black',
        shadow: '1px 0 5px black',
        label: new Arcadia.Label({
            text: 'Play',
            color: 'black',
            font: '35px sans-serif'
        }),
        action: function () {
            sona.play('button');
            Arcadia.changeScene(GameScene, { level: self.selectedLevel });
        }
    });
    this.add(startButton);

    // Create previous/next buttons
    this.previousButton = new Arcadia.Button({
        position: { x: -this.size.width / 2 + 50, y: 0 },
        size: { width: 60, height: 60 },
        border: '1px black',
        color: 'white',
        shadow: '1px 0 5px black',
        vertices: 0,
        label: new Arcadia.Label({
            text: '<',
            font: '40px uni_05_53',
            color: 'black',
            position: { x: 0, y: -3 }
        }),
        action: function () {
            self.previous();
        }
    });

    this.nextButton = new Arcadia.Button({
        position: { x: this.size.width / 2 - 50, y: 0 },
        size: { width: 60, height: 60 },
        border: '1px solid black',
        color: 'white',
        shadow: '1px 0 5px black',
        vertices: 0,
        label: new Arcadia.Label({
            text: '>',
            font: '40px uni_05_53',
            color: 'black',
            position: { x: 0, y: -3 }
        }),
        action: function () {
            self.next();
        }
    });

    this.add(this.previousButton);
    this.add(this.nextButton);
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
            var delay = index * LevelSelectScene.TRANSITION_DELAY;
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
            // Move offscreen to the right
            shape.position = {
                x: self.thumbnailPositions[index].x - offset,
                y: shape.position.y
            };

            var delay = index * LevelSelectScene.TRANSITION_DELAY + 100,
                levelIndex = self.currentPage * self.perPage + index;

            shape.drawPreview(levelIndex);

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
            var delay = (self.perPage - index) * LevelSelectScene.TRANSITION_DELAY;
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
            // Move offscreen to the left
            shape.position = {
                x: self.thumbnailPositions[index].x - offset,
                y: shape.position.y
            };

            var delay = (self.perPage - index) * LevelSelectScene.TRANSITION_DELAY + 100,
                levelIndex = self.currentPage * self.perPage + index;

            shape.drawPreview(levelIndex);

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
};

LevelSelectScene.prototype.onPointEnd = function (points) {
    var self = this,
        cursor = {
            size: { width: 4, height: 4 },
            position: points[0]
        };

    // Determine if tap/click touched a thumbnail
    this.thumbnails[this.activeThumbnailPage].forEach(function (thumbnail, index) {
        if (thumbnail.collidesWith(cursor)) {
            sona.play('button');
            // thumbnail.selected = true;
            thumbnail.border = '3px red';
            self.selectedLevel = self.currentPage * self.perPage + index;
            console.log("currently selected level is #" + self.selectedLevel);
        }
    });
};

LevelSelectScene.TRANSITION_TYPE = 'cubicInOut';
LevelSelectScene.TRANSITION_DURATION = 400;
LevelSelectScene.TRANSITION_DELAY = 25;
LevelSelectScene.TOTAL_TRANSITION_DURATION = 600;
