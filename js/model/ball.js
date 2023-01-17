export default class ball {
    angle; // in degrees
    canvasHeight;
    canvasWidth;
    color;
    dx;
    dy;
    radius;
    speed;
    xPos;
    yPos;

    constructor (canvasWidth, canvasHeight) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.color = 'rgb(255, 255, 255)';
        this.radius = 5;
        this.resetSpeed();
        this.reset();
    }

    getRandomAngle () {
        const MIN = 25;
        const MAX = 45;
        const randomAngle = ((Math.random() * (MAX - MIN)) + MIN);
        
        if(Math.random() < .5) {
            return 360 - randomAngle;
        }

        return randomAngle;
    }

    degreesToRadians (deg) {
        return (deg / 180) * Math.PI;
    }

    incrementSpeed () {
        this.speed *= 1.1;
    }

    move () {
        this.xPos += this.dx;
        this.yPos += this.dy;
    }

    reset () {
        this.angle = this.getRandomAngle();
        const rad = this.degreesToRadians(this.angle);
        if(this.dx) { // remain in the same direction
            if(this.dx < 0) {
                this.dx = this.speed * Math.cos(rad) * -1;
            } else {
                this.dx = this.speed * Math.cos(rad);
            }
        } else { // randomize the direction
            this.dx = this.speed * Math.cos(rad);
            if(Math.random() < .5) {
                this.reverseX();
            }
        }
        this.dy = this.speed * Math.sin(rad);

        this.xPos = this.canvasWidth / 2;
        this.yPos = this.canvasHeight / 2;
    }

    resetSpeed () {
        this.speed = this.canvasWidth * .00625;
    }

    reverseX () {
        this.dx *= -1;
    }

    reverseY () {
        this.dy *= -1;
    }

    getDX () {
        return this.dx;
    }

    getRadius () {
        return this.radius;
    }

    getYPos () {
        return this.yPos;
    }

    getLeftEdge () {
        return this.xPos - this.radius;
    }

    getRightEdge () {
        return this.xPos + this.radius;
    }

    getTopEdge () {
        return this.yPos - this.radius;
    }

    getBottomEdge () {
        return this.yPos + this.radius;
    }
}