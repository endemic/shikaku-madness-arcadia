
var TitleScene = function () {
    Arcadia.Scene.apply(this);

    this.color = 'white';

    var titleLabel,
        startButton;

    titleLabel = new Arcadia.Label({
        text: 'Shikaku Madness',
        font: '65px uni_05_53',
        color: '#000',
        shadow: '0px 0px 10px #000'
    });

    titleLabel.position = {
        x: Arcadia.WIDTH / 2,
        y: 100
    };

    this.add(titleLabel);

    startButton = new Arcadia.Button({
        position: { x: Arcadia.WIDTH / 2, y: 400 },
        border: '1px solid #000',
        color: '#fff',
        shadow: '5px -5px 0 rgba(0, 0, 0, 0.5)',
        text: 'start',
        font: '20px sans-serif',
        action: function () {
            window.sona.playSfx('button');
            Arcadia.changeScene(DifficultySelect);
        }
    });
    this.add(startButton);
};

TitleScene.prototype = new Arcadia.Scene();
