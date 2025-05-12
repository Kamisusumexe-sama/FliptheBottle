import { _decorator, Component, Label } from 'cc';
import { Events } from './Events';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    @property(Label)
    scoreLabel: Label | null = null;

    @property(Label)
    finalScoreLabel: Label | null = null; // 🏁 New: for game over screen

    private _score: number = 0;

    start() {
        Events.on('BottleScored', this.addScore, this);
        Events.on('GameOver', this.resetScore, this);
    }

    addScore() {
        this._score += 1;
        if (this.scoreLabel) {
            this.scoreLabel.string = `${this._score}`;
        }
        console.log('🎯 Score increased:', this._score);
    }

    resetScore() {
        // ✨ Update final score label BEFORE resetting
        if (this.finalScoreLabel) {
            this.finalScoreLabel.string = `${this._score}`;
            console.log('🏁 Final score displayed on game over screen:', this._score);
        }

        this._score = 0;
        if (this.scoreLabel) {
            this.scoreLabel.string = `${this._score}`;
        }

        console.log('🎯 Score has been reset.');
    }

    onDestroy() {
        Events.off('BottleScored', this.addScore, this);
        Events.off('GameOver', this.resetScore, this);
    }
}
