import {
    _decorator,
    Component,
    Node,
    Camera,
    view,
    Size,
    UITransform,
    instantiate,
    director,
    BoxCollider2D,
    RigidBody2D,
    PhysicsSystem2D,
    ERigidBody2DType,
} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('CameraBoundaries')
export class CameraBoundaries extends Component {
    @property({ type: Camera })
    camera: Camera | null = null;

    @property
    wallThickness: number = 50;

    start() {
        if (!this.camera) {
            this.camera = this.getComponent(Camera);
        }

        const visibleSize = view.getVisibleSize();
        const halfW = visibleSize.width / 2;
        const halfH = visibleSize.height / 2;
        const camPos = this.camera!.node.worldPosition;

        const walls = [
            { name: 'WallTop', x: 0, y: halfH + this.wallThickness / 2, width: visibleSize.width, height: this.wallThickness },
            { name: 'WallBottom', x: 0, y: -halfH - this.wallThickness / 2, width: visibleSize.width, height: this.wallThickness },
            { name: 'WallLeft', x: -halfW - this.wallThickness / 2, y: 0, width: this.wallThickness, height: visibleSize.height },
            { name: 'WallRight', x: halfW + this.wallThickness / 2, y: 0, width: this.wallThickness, height: visibleSize.height },
        ];

        for (const wall of walls) {
            const wallNode = new Node(wall.name);
            wallNode.setWorldPosition(camPos.x + wall.x, camPos.y + wall.y, 0);
            wallNode.setParent(director.getScene());

            const ui = wallNode.addComponent(UITransform);
            ui.setContentSize(wall.width, wall.height);

            const collider = wallNode.addComponent(BoxCollider2D);
            collider.size.set(wall.width, wall.height);

            const rb = wallNode.addComponent(RigidBody2D);
            rb.type = ERigidBody2DType.Static;
        }

        PhysicsSystem2D.instance.enable = true;
    }
}
