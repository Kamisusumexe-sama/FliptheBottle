import { _decorator, Component, RigidBody2D, Vec2 } from 'cc';
import { Events } from './Events'; // ⬅️ Import your custom event system

const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property
    direction: Vec2 = new Vec2(0, 1); // Upward direction

    @property
    forceMultiplier = 10;

    @property
    spinMultiplier = 0.05;

    private body: RigidBody2D | null = null;
    private startPos: Vec2 = new Vec2(); // 📌 Remember start position

    start() {
        this.body = this.getComponent(RigidBody2D);

        if (this.body) {
            this.body.linearDamping = 0.2;
            this.body.angularDamping = 0.05;
        }

        // Save initial position
        this.startPos.set(this.node.position.x, this.node.position.y);

        // 🔁 Listen for Restart event
        Events.on('Restart', this.onRestart, this);
    }

    applyChargeForce(forceValue: number) {
        if (!this.body) return;

        const impulse = this.direction.clone().multiplyScalar(forceValue * this.forceMultiplier);
        const worldCenter = new Vec2();
        this.body.getWorldCenter(worldCenter);
        this.body.applyLinearImpulse(impulse, worldCenter, true);

        const rotationForce = forceValue * this.spinMultiplier;
        this.body.applyAngularImpulse(rotationForce, true);

        console.log('Applied force:', impulse, 'Rotation:', rotationForce);
    }

    // 🔁 Reset on restart
    onRestart() {
        if (this.body) {
            this.body.linearVelocity = new Vec2(0, 0);
            this.body.angularVelocity = 0;
        }

        this.node.setPosition(this.startPos.x, this.startPos.y);
        this.node.angle = 0;

        console.log('Player reset!');
    }

    onDestroy() {
        Events.off('Restart', this.onRestart, this);
    }
}
