import ball from '../model/ball.js';
import net from '../model/net.js';
import { leftPaddle, rightPaddle } from '../model/paddle.js';

import canvasView from '../view/canvasView.js';
import player from '../model/player.js';
import pongAudio from '../model/pongAudio.js';

export default class pong {
    audio;
    WINNING_SCORE = 3;
    ball;
    net;
    leftPaddle;
    rightPaddle;
    leftPlayer;
    rightPlayer;

    view;

    isGamePaused;

    constructor () {
        this.audio = new pongAudio();
        this.view = new canvasView(this);
        
        const viewWidth = this.view.getWidth();
        const viewHeight = this.view.getHeight();

        this.ball = new ball(viewWidth, viewHeight);
        this.net = new net(viewWidth, viewHeight);
        this.leftPaddle = new leftPaddle(viewWidth, viewHeight);
        this.rightPaddle = new rightPaddle(viewWidth, viewHeight);
        this.leftPlayer = new player(this.leftPaddle, this.WINNING_SCORE);
        this.rightPlayer = new player(this.rightPaddle, this.WINNING_SCORE);

        this.pauseGame();
        this.draw();
    }

    isGameOver () {
        return this.leftPlayer.hasWon() || this.rightPlayer.hasWon();
    }

    isGameStopped () {
        return this.isGamePaused || this.isGameOver();
    }

    draw () {
        this.view.draw(
            this.ball,
            this.net,
            this.leftPlayer,
            this.rightPlayer);
    }

    loop () {
        this.update();
        this.draw();

        if (!this.isGameStopped()) {
            window.requestAnimationFrame(() => {
                this.loop();
            });
        }
    }

    pauseGame () {
        this.isGamePaused = true;
    }

    unpauseGame () {
        if(this.isGameOver()) {
            this.isGamePaused = false;
            this.leftPlayer.resetScore();
            this.rightPlayer.resetScore();
            this.loop();
        }
        else if(this.isGamePaused) {
            this.isGamePaused = false;
            this.loop();
        }  
    }

    update () {
        this.ball.move();
        this.leftPaddle.move();
        this.rightPaddle.move();

        if (this.didBallCollideWithBoundary(this.ball, this.view.getHeight(), 0)) {
            this.audio.playHitBoundarySound();
            this.ball.reverseY();
        } 
        else if(this.didLeftPlayerScore(this.ball, this.view.getWidth())) {
            this.#playerScored(this.leftPlayer);
        }
        else if(this.didRightPlayerScore(this.ball, 0)) {
            this.#playerScored(this.rightPlayer);
        }
        else if (this.didLeftPaddleHitBall(this.ball, this.leftPaddle)
         || this.didRightPaddleHitBall(this.ball, this.rightPaddle)) {
            this.audio.playHitPaddleSound();
            this.ball.reverseX();
        }
    }

    didBallCollideWithBoundary (ball, lowerBoundaryYPos, upperBoundaryYPos) {
        return ball.getBottomEdge() >= lowerBoundaryYPos 
            || ball.getTopEdge() <= upperBoundaryYPos;
    }

    didLeftPaddleHitBall (ball, paddle) {
        return ball.getDX() < 0
            && ball.getLeftEdge() >= paddle.getLeftEdge()
            && ball.getLeftEdge() <= paddle.getRightEdge()
            && ball.getYPos() >= paddle.getTopEdge()
            && ball.getYPos() <= paddle.getBottomEdge();
    }

    didRightPaddleHitBall (ball, paddle) {
        return ball.getDX() > 0     
            && ball.getRightEdge() >= paddle.getLeftEdge()
            && ball.getRightEdge() <= paddle.getRightEdge()
            && ball.getYPos() >= paddle.getTopEdge()
            && ball.getYPos() <= paddle.getBottomEdge();
    }

    didLeftPlayerScore (ball, scoreLine) {
        return ball.getLeftEdge() >= scoreLine;
    }

    didRightPlayerScore (ball, scoreLine) {
        return ball.getRightEdge() <= scoreLine;
    }

    #playerScored (player) {
        this.pauseGame();
        player.incrementScore();
        if(this.isGameOver()) {
            this.audio.playGameOverSound();
            this.ball.resetSpeed();
        } else {
            this.audio.playScoreSound();
            this.ball.incrementSpeed();
        }
        this.ball.reset();
        this.ball.reverseX();
        this.leftPaddle.reset();
        this.rightPaddle.reset();
    }

    setLeftPaddleDirection (direction) {
        this.leftPaddle.setDirection(direction);
    }

    setRightPaddleDirection (direction) {
        this.rightPaddle.setDirection(direction);
    }
}