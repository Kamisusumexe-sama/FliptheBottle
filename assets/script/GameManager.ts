import { _decorator, Component, Node, director } from 'cc';
import { Events } from './Events';
import { Charge } from './Charge';

const { property, ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    gameOverPanel: Node | null = null;

    @property(Node)
    mainMenuPanel: Node | null = null;

    @property(Node)
    gamePanel: Node | null = null;

    start() {
         // Listen for the GameOver event
    Events.on('GameOver', this.onGameOver, this);

    // Set initial UI state
    if (this.gamePanel) this.gamePanel.active = false;
    if (this.mainMenuPanel) this.mainMenuPanel.active = true;
    if (this.gameOverPanel) this.gameOverPanel.active = false;
    }

    // Function to restart the game (called when a reset occurs)
    restartGame() {
       
            console.log('[GameManager] Restarting game...');
            
            // Dispatch a "Restart" event that other components (like Charge) can listen to
            Events.emit('Restart');
        
            // Reset UI
            if (this.gameOverPanel) {
                this.gameOverPanel.active = false;
            }

           // director.resume();
        
            // You can also manually reset player, score, enemies, etc here
    }

    // Function to go to the main menu
    goToMainMenu() {
        console.log('[GameManager] Going to Main Menu...');
        this.mainMenuPanel.active = true; // Show the mm UI
        this.gamePanel.active = false; // hide the Game uI
        this.gameOverPanel.active = false; // hide the Game 
        
        //event
        Events.emit('mMenu'); // 📈 Emit score event
    }

    // Function to go back to the game (usually called from the main menu)
    gotoGame() {
       // console.log('[GameManager] Going to the Game...');
       
            this.mainMenuPanel.active = false; // hide the Game uI
            console.log('[GameManager] Going to the Game...');
        

        
            this.gamePanel.active = true; // show the Game uI
        

        
            this.gameOverPanel.active = false; // hide the Game uI  

            Events.emit('GamePlaying'); // 📈 Emit score event

        //director.resume();
    }

    // Clean up event listeners when this object is destroyed
    onDestroy() {
        Events.off('GameOver', this.onGameOver, this);
    }

    // Handle the GameOver event
    onGameOver() {
        console.log('[GameManager] Game Over!');
        
        // Pause the game and show the Game Over panel
            this.gameOverPanel.active = true; // Show the Game Over UI
        
       // director.pause();
    }
}
