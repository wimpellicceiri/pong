export default class net {
    color;
    length;
    strokeWidth;
    xPos;
    yPos;

    constructor (canvasWidth, canvasHeight) {
        this.color = 'rgb(255, 255, 255)';
        this.length = canvasHeight;
        this.strokeWidth = 2;
        this.xPos = canvasWidth / 2;
        this.yPos = 0;
    }
}