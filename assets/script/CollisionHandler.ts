import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact, Vec3, Node, RigidBody2D, Vec2 } from 'cc';
import { Events } from './Events';
import { ScoreManager } from './ScoreManager'; // Make sure the path is correct


const { ccclass, property } = _decorator;

@ccclass('CollisionHandler')
export class CollisionHandler extends Component {
    @property(Node)
    bottleNode: Node | null = null;

    private _isTouching: boolean = false;
    private _currentOtherCollider: Collider2D | null = null;
    private _shouldCheck: boolean = false;
    private _delayTime: number = 1;
    private _scoreManager: ScoreManager | null = null;


    private _originalBottlePosition: Vec3 = new Vec3();
    private _bottleBody: RigidBody2D | null = null;
    

    start() {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        if (this.bottleNode) {
            this._originalBottlePosition.set(this.bottleNode.position);
            this._bottleBody = this.bottleNode.getComponent(RigidBody2D);
        } else {
            console.warn('🚫 Bottle node not assigned!');
        }

        if (this._scoreManager) {
            this._scoreManager = this._scoreManager.getComponent(ScoreManager);
            if (!this._scoreManager) {
                console.warn('⚠️ ScoreManager not found on ScoreNode!');
            }
        }
        
    }

    update(dt: number) {
        if (this._shouldCheck && this._isTouching && this._currentOtherCollider) {
            const tag = this._currentOtherCollider.tag;
    
            if (tag === 8) {  // Bottle hits bottom
                console.log('🍾 Bottle hit bottom. Will reset after 0.5s...');
                this._shouldCheck = false;
                Events.emit('BottleScored'); // 📈 Emit score event
    
                // ⏳ Delay before resetting
                this.scheduleOnce(() => {
                    this.resetBottle();
                    Events.emit('IncreaseSliderSpeed'); // 🏎️ Increase slider speed
                }, 0.5); // adjust delay as needed
            } 
            else if (tag === 1) {  // Hit wall
                console.log('💥 Hit wall. Game Over in 1 sec...');
                this._shouldCheck = false;
    
                this.scheduleOnce(() => {
                    Events.emit('GameOver');
                }, 1);
            }
        }
    }
    
    

    onBeginContact(self: Collider2D, other: Collider2D) {
        this._isTouching = true;
        this._currentOtherCollider = other;
    }

    onEndContact() {
        this._isTouching = false;
        this._currentOtherCollider = null;
    }

    public startChecking() {
        this.scheduleOnce(() => {
            console.log('⏳ Start collision check!');
            this._shouldCheck = true;
        }, this._delayTime);
    }

    private resetBottle() {
        if (!this.bottleNode || !this._bottleBody) return;
    
        // Stop physics
        this._bottleBody.sleep();
    
        // Reset position
        this.bottleNode.setPosition(this._originalBottlePosition);
    
        // Clear velocity
        this._bottleBody.linearVelocity = new Vec2(0, 0);
        this._bottleBody.angularVelocity = 0;

        this.bottleNode.setRotationFromEuler(0, 0, 0);

    
        // 💤 Don't call wakeUp() — let physics do it naturally if needed
        console.log('🔄 Bottle has been fully reset (no forces).');

        Events.emit('BottleReset');

    }
    
    
}
