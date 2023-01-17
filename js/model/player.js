export default class player {
    paddle;
    score;
    winningScore;

    constructor (paddle, winningScore) {
        this.paddle = paddle;
        this.winningScore = winningScore;
        this.resetScore();
    }

    getPaddle () {
        return this.paddle;
    }

    getScore () {
        return this.score;
    }

    hasWon () {
        return this.score === this.winningScore;
    }

    incrementScore () {
        this.score++;
    }

    resetScore () {
        this.score = 0;
    }
}