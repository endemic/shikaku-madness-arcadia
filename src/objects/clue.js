var Clue = function (args) {
    Arcadia.Shape.apply(this, arguments);

    this.size = { width: Clue.SIZE, height: Clue.SIZE };
    this.vertices = 0;
    this.color = 'mediumvioletred';
    this.border = '2px darkred';
    this.number = 0;

    if (args.hasOwnProperty('number')) {
        this.number = args.number;
    }

    this.label = new Arcadia.Label({
        font: '24px monospace',
        text: this.number,
        fixed: false
    });
    this.add(this.label);
};

Clue.prototype = new Arcadia.Shape();

Clue.SIZE = 34; // 375 / 10 = 37.5