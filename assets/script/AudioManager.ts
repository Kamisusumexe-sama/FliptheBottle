import { _decorator, Component, AudioSource } from 'cc';
import { Events } from './Events';

const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioSource)
    musicSource: AudioSource | null = null;

    @property(AudioSource)
    gameOverSFX: AudioSource | null = null;

    @property(AudioSource)
    bottleLandSFX: AudioSource | null = null;

    @property(AudioSource)
    specialLandSFX: AudioSource | null = null; // 🌟 New: special sound every 3 lands

    @property(AudioSource)
    serenade: AudioSource | null = null; 

    @property(AudioSource)
    gameAud: AudioSource | null = null; 

    @property(AudioSource)
    mmAud: AudioSource | null = null; 

    private AudBool: boolean = false;
    private landStreak: number = 0; // 🔢 Track how many bottles landed in a row

    onLoad() 
    {
        this.OnmMenu();
    }

    

    start() {
        Events.on('GameOver', this.onGameOver, this);
        Events.on('Restart', this.onGameRestart, this);
        Events.on('BottleScored', this.onBottleLanded, this);
        Events.on('mMenu', this.OnmMenu, this);
        Events.on('GamePlaying', this.onGamePlaying, this);
    }

   onGamePlaying() {
    console.log('🎮 Switching to Game Audio');
    this.AudBool = true;
    this.gameAud?.play();
    this.mmAud?.stop();
    }

OnmMenu() {
    console.log('🏠 Switching to Main Menu Audio');
    this.AudBool = false;
    this.mmAud?.play();
    this.gameAud?.stop();
}


    onGameOver() {
        console.log('🔁 GameOver triggered: Playing SFX and stopping music');

        if (this.gameOverSFX) {
            this.gameOverSFX.play();
        }

        if (this.musicSource?.playing) {
            this.musicSource.stop();
        }

        this.landStreak = 0; // 🔄 Reset streak on game over
    }

    onGameRestart() {
        console.log('🔄 GameRestart triggered: Restarting music');

        if (this.musicSource && !this.musicSource.playing) {
            this.musicSource.play();
        }

        this.landStreak = 0; // 🔄 Reset streak on restart
    }

    onBottleLanded() {
        this.landStreak++;
        console.log(`✅ Bottle landed! Streak: ${this.landStreak}`);

        if (this.bottleLandSFX) {
            this.bottleLandSFX.play(); // Play regular sound
        }

        if (this.landStreak % 3 === 0 && this.specialLandSFX) {
            console.log('🌟 Triple streak! Playing special sound!');
            this.specialLandSFX.play(); // Play special SFX every 3rd land
        }
    }

    onDestroy() {
        Events.off('GameOver', this.onGameOver, this);
        Events.off('Restart', this.onGameRestart, this);
        Events.off('BottleScored', this.onBottleLanded, this);
        Events.off('mMenu', this.OnmMenu, this);
        Events.off('GamePlaying', this.onGamePlaying, this);
    }
}
