export default class pongAudio {
    
    playGameOverSound () {
        this.#playSound("audGameOver");
    }

    playHitBoundarySound () {
        this.#playSound("audHitBoundary");
    }

    playHitPaddleSound () {
        this.#playSound("audHitPaddle");
    }

    playScoreSound () {
        this.#playSound("audScore");
    }

    #playSound (id) {
        const audioElem = document.getElementById(id);
        audioElem.play();
    }
}