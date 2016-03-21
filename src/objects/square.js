/*jslint this: true, browser: true */
/*global Arcadia, window */

(function (root) {
    'use strict';

    var Square = function (ignore) {
        Arcadia.Shape.apply(this, arguments);

        this.color = 'rgba(255, 255, 255, 0.1)';
        this.border = '2px white';
    };

    Square.prototype = new Arcadia.Shape();

    Square.prototype.path = function (context) {
        var cornerRadius = 20;

        context.beginPath();
        context.fillStyle = this.color;
        context.strokeStyle = 'darkred';
        context.lineWidth = 2 * Arcadia.PIXEL_RATIO;

        var topLeftX = (-this.size.width / 2 + cornerRadius) * Arcadia.PIXEL_RATIO;
        var topLeftY = -this.size.height / 2 * Arcadia.PIXEL_RATIO;
        var topRightX = (this.size.width / 2 - cornerRadius) * Arcadia.PIXEL_RATIO;
        var topRightY = -this.size.height / 2 * Arcadia.PIXEL_RATIO;
        var rightTopX = this.size.width / 2 * Arcadia.PIXEL_RATIO;
        var rightTopY = (-this.size.height / 2 + cornerRadius) * Arcadia.PIXEL_RATIO;
        var rightBottomX = this.size.width / 2 * Arcadia.PIXEL_RATIO;
        var rightBottomY = (this.size.height / 2 - cornerRadius) * Arcadia.PIXEL_RATIO;
        var bottomRightX = (this.size.width / 2 - cornerRadius) * Arcadia.PIXEL_RATIO;
        var bottomRightY = this.size.height / 2 * Arcadia.PIXEL_RATIO;
        var bottomLeftX = (-this.size.width / 2 + cornerRadius) * Arcadia.PIXEL_RATIO;
        var bottomLeftY = this.size.height / 2 * Arcadia.PIXEL_RATIO;
        var leftBottomX = -this.size.width / 2 * Arcadia.PIXEL_RATIO;
        var leftBottomY = (this.size.height / 2 - cornerRadius) * Arcadia.PIXEL_RATIO;
        var leftTopX = -this.size.width / 2 * Arcadia.PIXEL_RATIO;
        var leftTopY = (-this.size.height / 2 + cornerRadius) * Arcadia.PIXEL_RATIO;

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

    Square.prototype.blink = function () {
        var self = this;
        var callback = function () {
            // console.log('blink callback');
            self.blink();
        };
        // ocillate between 0 - 0.5
        var alphaValue = this.alpha === 1 ? 0 : 1;
        // console.log('calling blink; alpha value: ', alphaValue, this.alpha);
        this.tween('alpha', alphaValue, 1000, 'linearNone', callback);
    };

    root.Square = Square;
}(window));
