import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('movers')
export class movers extends Component {
    
   // Function to go to the main menu
      goToMainMenu() {
          console.log('[GameManager] Going to Main Menu...');
          director.loadScene('mainmenu');
          director.resume();
      }
  
      // Function to go back to the game (usually called from the main menu)
      gotoGame() {
          console.log('[GameManager] Going to the Game...');
          director.loadScene('game');
          director.resume();
      }
}


