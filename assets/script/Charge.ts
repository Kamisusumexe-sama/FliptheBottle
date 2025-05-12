import { _decorator, Component, Node, Slider, Button, EventTouch, Color, Sprite } from 'cc';
import { Player } from './Player';
import { Events } from './Events';

const { ccclass, property } = _decorator;

@ccclass('Charge')
export class Charge extends Component {
    @property({ type: Slider })
    slider: Slider | null = null;

    @property({ type: Button })
    triggerButton: Button | null = null;

    @property({ type: Node })
    playerNode: Node | null = null;

    @property({ type: Node })
    collisionObject: Node | null = null;

    @property({ type: Node })
    sliderHandle: Node | null = null;

    @property({ type: Node })
    touchArea: Node | null = null; // The touch area where interaction will happen

    @property
    maxValue = 100;

    @property
    multiplier = 100;

    private value = 0;
    private sliderSpeed = 0.005;
    private sliderDirection = 1;
    private baseSliderSpeed = 0.005;

    start() {
        Events.on('Restart', this.onRestart, this);
        Events.on('BottleReset', this.onBottleReset, this);
        Events.on('IncreaseSliderSpeed', this.onIncreaseSliderSpeed, this);

        this.resetSlider();

        // Listen for a click or touch inside the touch area (not the entire screen)
        if (this.touchArea) {
            this.touchArea.on(Node.EventType.TOUCH_END, this.onScreenTouch, this);
        }
    }

    onIncreaseSliderSpeed() {
        this.sliderSpeed *= 1.2;
        console.log(`Slider speed increased to: ${this.sliderSpeed}`);
    }

    onRestart() {
        console.log('Charge.ts: Restart event received');
        this.resetSlider();
    }

    resetSlider() {
        if (this.slider) {
            this.slider.progress = 0;
            this.sliderDirection = 1;
            this.value = 0;
        }

        this.sliderSpeed = this.baseSliderSpeed;

        // Enable the button after reset
        if (this.triggerButton) {
            this.triggerButton.interactable = true;
        }
    }

    onSliderChanged() {
        if (this.slider) {
            this.value = this.slider.progress * this.maxValue;
            console.log('Slider value: ', this.value.toFixed(2));
        }
    }

    onBottleReset() {
        console.log('✅ Bottle reset! Button re-enabled.');
        if (this.triggerButton) {
            this.triggerButton.interactable = true;
        }
    }

    // Handle touch/click anywhere inside the touch area
    onScreenTouch(event: EventTouch) {
        if (!this.triggerButton || !this.triggerButton.interactable) return;

        // Same logic as the button click
        let forceValue = this.value;

        // Check if the value is in the special sweet spot
        const rounded = Math.round(this.value);

        if (rounded >= 35 && rounded <= 45) {
            forceValue = 49.50;  // Override to 49.50 if near 40
        } else if (rounded >= 55 && rounded <= 65) {
            forceValue = 60.5;  // Override to 60.5 if near 60
        }

        console.log(`🚀 Screen touched within the area! Sending force value: ${forceValue.toFixed(2)}`);

        // Apply the force value to the player
        const player = this.playerNode?.getComponent(Player);
        if (player) {
            player.applyChargeForce(forceValue);
        } else {
            console.warn('Player component missing!');
        }

        // Handle collision
        const collisionHandler = this.collisionObject?.getComponent('CollisionHandler') as any;
        if (collisionHandler && typeof collisionHandler.startChecking === 'function') {
            collisionHandler.startChecking();
        } else {
            console.warn('No CollisionHandler found on collisionObject!');
        }

        // Disable the button temporarily (we don't need it anymore since we're using screen touch)
        this.triggerButton.interactable = false;
    }

    updateSliderMovement() {
        if (this.slider) {
            this.slider.progress += this.sliderSpeed * this.sliderDirection;

            if (this.slider.progress >= 1) {
                this.slider.progress = 1;
                this.sliderDirection = -1;
            }
            if (this.slider.progress <= 0) {
                this.slider.progress = 0;
                this.sliderDirection = 1;
            }

            this.value = this.slider.progress * this.maxValue;

            // Update color based on slider position
            if (this.sliderHandle) {
                const sprite = this.sliderHandle.getComponent(Sprite);
                if (sprite) {
                    const rounded = Math.round(this.value);
                    const isNear40 = rounded >= 35 && rounded <= 45;
                    const isNear60 = rounded >= 55 && rounded <= 65;

                    if (isNear40) {
                        sprite.color = new Color(0, 255, 0); // Green
                    } else {
                        sprite.color = new Color(255, 255, 255); // White
                    }
                }
            }
        }
    }

    update(deltaTime: number) {
        this.updateSliderMovement();
    }

    onDestroy() {
        Events.off('Restart', this.onRestart, this);
        Events.off('BottleReset', this.onBottleReset, this);

        // Clean up touch listeners
        if (this.touchArea) {
            this.touchArea.off(Node.EventType.TOUCH_END, this.onScreenTouch, this);
        }
    }
}
