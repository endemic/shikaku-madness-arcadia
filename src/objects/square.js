var Square = function (options) {
    Arcadia.Shape.apply(this, arguments);

    this.color = 'rgba(200, 50, 50, 0.5)';
    this.border = '2px darkred';
};

Square.prototype = new Arcadia.Shape();

Square.prototype.path = function (context) {
    var cornerRadius = 20;

    context.beginPath();
    context.fillStyle = this.color;
    context.strokeStyle = 'darkred';
    context.lineWidth = 2 * Arcadia.PIXEL_RATIO;

    var topLeftX = (-this.size.width / 2 + cornerRadius) * Arcadia.PIXEL_RATIO,
        topLeftY = -this.size.height / 2 * Arcadia.PIXEL_RATIO,
        topRightX = (this.size.width / 2 - cornerRadius) * Arcadia.PIXEL_RATIO,
        topRightY = -this.size.height / 2 * Arcadia.PIXEL_RATIO,
        rightTopX = this.size.width / 2 * Arcadia.PIXEL_RATIO,
        rightTopY = (-this.size.height / 2 + cornerRadius) * Arcadia.PIXEL_RATIO,
        rightBottomX = this.size.width / 2 * Arcadia.PIXEL_RATIO,
        rightBottomY = (this.size.height / 2 - cornerRadius) * Arcadia.PIXEL_RATIO,
        bottomRightX = (this.size.width / 2 - cornerRadius) * Arcadia.PIXEL_RATIO,
        bottomRightY = this.size.height / 2 * Arcadia.PIXEL_RATIO,
        bottomLeftX = (-this.size.width / 2 + cornerRadius) * Arcadia.PIXEL_RATIO,
        bottomLeftY = this.size.height / 2 * Arcadia.PIXEL_RATIO,
        leftBottomX = -this.size.width / 2 * Arcadia.PIXEL_RATIO,
        leftBottomY = (this.size.height / 2 - cornerRadius) * Arcadia.PIXEL_RATIO,
        leftTopX = -this.size.width / 2 * Arcadia.PIXEL_RATIO,
        leftTopY = (-this.size.height / 2 + cornerRadius) * Arcadia.PIXEL_RATIO;

    context.moveTo(topLeftX, topLeftY);
    context.lineTo(topRightX, topRightY);

    context.quadraticCurveTo(this.size.width / 2 * Arcadia.PIXEL_RATIO, -this.size.height / 2 * Arcadia.PIXEL_RATIO, rightTopX, rightTopY);

    context.lineTo(rightBottomX, rightBottomY);

    context.quadraticCurveTo(this.size.width / 2 * Arcadia.PIXEL_RATIO, this.size.height / 2 * Arcadia.PIXEL_RATIO, bottomRightX, bottomRightY);

    context.lineTo(bottomLeftX, bottomLeftY);

    context.quadraticCurveTo(-this.size.width / 2 * Arcadia.PIXEL_RATIO, this.size.height / 2 * Arcadia.PIXEL_RATIO, leftBottomX, leftBottomY);

    context.lineTo(leftTopX, leftTopY);

    context.quadraticCurveTo(-this.size.width / 2 * Arcadia.PIXEL_RATIO, -this.size.height / 2 * Arcadia.PIXEL_RATIO, topLeftX, topLeftY);

    context.fill();
    context.stroke();
};
