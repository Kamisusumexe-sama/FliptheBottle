import { _decorator, Component, Node, Prefab, instantiate, Vec3, view, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BottleSpawner')
export class BottleSpawner extends Component {
    @property(Prefab)
    objectPrefab: Prefab = null!;

    @property(Node)
    spawnParent: Node = null!;

    @property(Camera)
    mainCamera: Camera = null!;

    private objectPool: Node[] = [];
    private activeObjects: Node[] = [];

    private spawnInterval: number = 5;
    private timer: number = 0;

    private fallSpeed: number = 100; // px/sec
    private rotateSpeed: number = 90; // degrees/sec

    start() {
        this.timer = this.spawnInterval;
    }

    update(dt: number) {
        this.timer -= dt;

        if (this.timer <= 0) {
            this.spawnObject();
            this.timer = this.spawnInterval;
        }

        this.updateObjects(dt);
        this.recycleOutOfBoundsObjects();
    }

    spawnObject() {
        let obj: Node;

        if (this.objectPool.length > 0) {
            obj = this.objectPool.pop()!;
        } else {
            obj = instantiate(this.objectPrefab);
        }

        const screenWidth = view.getVisibleSize().width;
        const x = (Math.random() * screenWidth) - screenWidth / 2;
        const y = view.getVisibleSize().height / 2 + 50; // Start just above view

        obj.setPosition(new Vec3(x, y, 0));
        obj.angle = Math.random() * 360;
        obj.setParent(this.spawnParent);
        this.activeObjects.push(obj);
    }

    updateObjects(dt: number) {
        for (const obj of this.activeObjects) {
            const pos = obj.position;
            obj.setPosition(pos.x, pos.y - this.fallSpeed * dt, 0);
            obj.angle += this.rotateSpeed * dt;
        }
    }

    recycleOutOfBoundsObjects() {
        const cameraWorldRect = this.getCameraWorldBounds();

        for (let i = this.activeObjects.length - 1; i >= 0; i--) {
            const obj = this.activeObjects[i];
            const worldPos = obj.worldPosition;

            if (worldPos.y < cameraWorldRect.yMin - 100) {
                this.returnToPool(obj);
                this.activeObjects.splice(i, 1);
            }
        }
    }

    returnToPool(obj: Node) {
        obj.removeFromParent();
        this.objectPool.push(obj);
    }

    getCameraWorldBounds() {
        const canvasSize = view.getVisibleSize();
        const halfWidth = canvasSize.width / 2;
        const halfHeight = canvasSize.height / 2;
        const camPos = this.mainCamera.node.worldPosition;

        return {
            xMin: camPos.x - halfWidth,
            xMax: camPos.x + halfWidth,
            yMin: camPos.y - halfHeight,
            yMax: camPos.y + halfHeight
        };
    }
}
