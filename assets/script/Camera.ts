import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {
    @property(Node)
    target: Node | null = null; // The target the camera will follow

    @property
    smoothSpeed: number = 0.125; // How smoothly the camera follows

    @property(Vec3)
    offset: Vec3 = new Vec3(0, 0, 0); // Offset from the target

    private _currentPos: Vec3 = new Vec3();
    private _desiredPos: Vec3 = new Vec3();

    update(deltaTime: number) {
        if (!this.target) {
            return;
        }

        // Calculate desired position
        Vec3.add(this._desiredPos, this.target.worldPosition, this.offset);

        // Smoothly interpolate between current position and desired position
        Vec3.lerp(this._currentPos, this.node.worldPosition, this._desiredPos, this.smoothSpeed);

        this.node.setWorldPosition(this._currentPos);
    }
}
