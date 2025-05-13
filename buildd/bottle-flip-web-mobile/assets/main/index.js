System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioSource, Component, Events;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      Component = module.Component;
    }, function (module) {
      Events = module.Events;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "85a20TrfyxHfoHSgvFqGBai", "AudioManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var AudioManager = exports('AudioManager', (_dec = ccclass('AudioManager'), _dec2 = property(AudioSource), _dec3 = property(AudioSource), _dec4 = property(AudioSource), _dec5 = property(AudioSource), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManager, _Component);
        function AudioManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "musicSource", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameOverSFX", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bottleLandSFX", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "specialLandSFX", _descriptor4, _assertThisInitialized(_this));
          // 🌟 New: special sound every 3 lands
          _this.landStreak = 0;
          return _this;
        }
        var _proto = AudioManager.prototype;
        // 🔢 Track how many bottles landed in a row
        _proto.onLoad = function onLoad() {
          if (this.musicSource) {
            this.musicSource.loop = true;
            this.musicSource.play();
          }
        };
        _proto.start = function start() {
          Events.on('GameOver', this.onGameOver, this);
          Events.on('Restart', this.onGameRestart, this);
          Events.on('BottleScored', this.onBottleLanded, this);
        };
        _proto.onGameOver = function onGameOver() {
          var _this$musicSource;
          console.log('🔁 GameOver triggered: Playing SFX and stopping music');
          if (this.gameOverSFX) {
            this.gameOverSFX.play();
          }
          if ((_this$musicSource = this.musicSource) != null && _this$musicSource.playing) {
            this.musicSource.stop();
          }
          this.landStreak = 0; // 🔄 Reset streak on game over
        };

        _proto.onGameRestart = function onGameRestart() {
          console.log('🔄 GameRestart triggered: Restarting music');
          if (this.musicSource && !this.musicSource.playing) {
            this.musicSource.play();
          }
          this.landStreak = 0; // 🔄 Reset streak on restart
        };

        _proto.onBottleLanded = function onBottleLanded() {
          this.landStreak++;
          console.log("\u2705 Bottle landed! Streak: " + this.landStreak);
          if (this.bottleLandSFX) {
            this.bottleLandSFX.play(); // Play regular sound
          }

          if (this.landStreak % 3 === 0 && this.specialLandSFX) {
            console.log('🌟 Triple streak! Playing special sound!');
            this.specialLandSFX.play(); // Play special SFX every 3rd land
          }
        };

        _proto.onDestroy = function onDestroy() {
          Events.off('GameOver', this.onGameOver, this);
          Events.off('Restart', this.onGameRestart, this);
          Events.off('BottleScored', this.onBottleLanded, this);
        };
        return AudioManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "musicSource", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameOverSFX", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bottleLandSFX", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "specialLandSFX", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BottleSpawner.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Prefab, Node, Camera, instantiate, view, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      Camera = module.Camera;
      instantiate = module.instantiate;
      view = module.view;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "91762eE2UBNR72WH5z2kydu", "BottleSpawner", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BottleSpawner = exports('BottleSpawner', (_dec = ccclass('BottleSpawner'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Camera), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BottleSpawner, _Component);
        function BottleSpawner() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "objectPrefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spawnParent", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mainCamera", _descriptor3, _assertThisInitialized(_this));
          _this.objectPool = [];
          _this.activeObjects = [];
          _this.spawnInterval = 5;
          _this.timer = 0;
          _this.fallSpeed = 100;
          // px/sec
          _this.rotateSpeed = 90;
          return _this;
        }
        var _proto = BottleSpawner.prototype;
        // degrees/sec
        _proto.start = function start() {
          this.timer = this.spawnInterval;
        };
        _proto.update = function update(dt) {
          this.timer -= dt;
          if (this.timer <= 0) {
            this.spawnObject();
            this.timer = this.spawnInterval;
          }
          this.updateObjects(dt);
          this.recycleOutOfBoundsObjects();
        };
        _proto.spawnObject = function spawnObject() {
          var obj;
          if (this.objectPool.length > 0) {
            obj = this.objectPool.pop();
          } else {
            obj = instantiate(this.objectPrefab);
          }
          var screenWidth = view.getVisibleSize().width;
          var x = Math.random() * screenWidth - screenWidth / 2;
          var y = view.getVisibleSize().height / 2 + 50; // Start just above view

          obj.setPosition(new Vec3(x, y, 0));
          obj.angle = Math.random() * 360;
          obj.setParent(this.spawnParent);
          this.activeObjects.push(obj);
        };
        _proto.updateObjects = function updateObjects(dt) {
          for (var _iterator = _createForOfIteratorHelperLoose(this.activeObjects), _step; !(_step = _iterator()).done;) {
            var obj = _step.value;
            var pos = obj.position;
            obj.setPosition(pos.x, pos.y - this.fallSpeed * dt, 0);
            obj.angle += this.rotateSpeed * dt;
          }
        };
        _proto.recycleOutOfBoundsObjects = function recycleOutOfBoundsObjects() {
          var cameraWorldRect = this.getCameraWorldBounds();
          for (var i = this.activeObjects.length - 1; i >= 0; i--) {
            var obj = this.activeObjects[i];
            var worldPos = obj.worldPosition;
            if (worldPos.y < cameraWorldRect.yMin - 100) {
              this.returnToPool(obj);
              this.activeObjects.splice(i, 1);
            }
          }
        };
        _proto.returnToPool = function returnToPool(obj) {
          obj.removeFromParent();
          this.objectPool.push(obj);
        };
        _proto.getCameraWorldBounds = function getCameraWorldBounds() {
          var canvasSize = view.getVisibleSize();
          var halfWidth = canvasSize.width / 2;
          var halfHeight = canvasSize.height / 2;
          var camPos = this.mainCamera.node.worldPosition;
          return {
            xMin: camPos.x - halfWidth,
            xMax: camPos.x + halfWidth,
            yMin: camPos.y - halfHeight,
            yMax: camPos.y + halfHeight
          };
        };
        return BottleSpawner;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "objectPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spawnParent", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Camera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "6b584QrwAtJ3Il21hvgzOTb", "Camera", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Camera = exports('Camera', (_dec = ccclass('Camera'), _dec2 = property(Node), _dec3 = property(Vec3), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Camera, _Component);
        function Camera() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));
          // The target the camera will follow
          _initializerDefineProperty(_this, "smoothSpeed", _descriptor2, _assertThisInitialized(_this));
          // How smoothly the camera follows
          _initializerDefineProperty(_this, "offset", _descriptor3, _assertThisInitialized(_this));
          // Offset from the target
          _this._currentPos = new Vec3();
          _this._desiredPos = new Vec3();
          return _this;
        }
        var _proto = Camera.prototype;
        _proto.update = function update(deltaTime) {
          if (!this.target) {
            return;
          }

          // Calculate desired position
          Vec3.add(this._desiredPos, this.target.worldPosition, this.offset);

          // Smoothly interpolate between current position and desired position
          Vec3.lerp(this._currentPos, this.node.worldPosition, this._desiredPos, this.smoothSpeed);
          this.node.setWorldPosition(this._currentPos);
        };
        return Camera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "smoothSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.125;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "offset", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 0, 0);
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraBoundaries.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Camera, view, Node, director, UITransform, BoxCollider2D, RigidBody2D, ERigidBody2DType, PhysicsSystem2D, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Camera = module.Camera;
      view = module.view;
      Node = module.Node;
      director = module.director;
      UITransform = module.UITransform;
      BoxCollider2D = module.BoxCollider2D;
      RigidBody2D = module.RigidBody2D;
      ERigidBody2DType = module.ERigidBody2DType;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "9bc0cCFnyNLGat4UBzToKpj", "CameraBoundaries", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CameraBoundaries = exports('CameraBoundaries', (_dec = ccclass('CameraBoundaries'), _dec2 = property({
        type: Camera
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CameraBoundaries, _Component);
        function CameraBoundaries() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "camera", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "wallThickness", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = CameraBoundaries.prototype;
        _proto.start = function start() {
          if (!this.camera) {
            this.camera = this.getComponent(Camera);
          }
          var visibleSize = view.getVisibleSize();
          var halfW = visibleSize.width / 2;
          var halfH = visibleSize.height / 2;
          var camPos = this.camera.node.worldPosition;
          var walls = [{
            name: 'WallTop',
            x: 0,
            y: halfH + this.wallThickness / 2,
            width: visibleSize.width,
            height: this.wallThickness
          }, {
            name: 'WallBottom',
            x: 0,
            y: -halfH - this.wallThickness / 2,
            width: visibleSize.width,
            height: this.wallThickness
          }, {
            name: 'WallLeft',
            x: -halfW - this.wallThickness / 2,
            y: 0,
            width: this.wallThickness,
            height: visibleSize.height
          }, {
            name: 'WallRight',
            x: halfW + this.wallThickness / 2,
            y: 0,
            width: this.wallThickness,
            height: visibleSize.height
          }];
          for (var _i = 0, _walls = walls; _i < _walls.length; _i++) {
            var wall = _walls[_i];
            var wallNode = new Node(wall.name);
            wallNode.setWorldPosition(camPos.x + wall.x, camPos.y + wall.y, 0);
            wallNode.setParent(director.getScene());
            var ui = wallNode.addComponent(UITransform);
            ui.setContentSize(wall.width, wall.height);
            var collider = wallNode.addComponent(BoxCollider2D);
            collider.size.set(wall.width, wall.height);
            var rb = wallNode.addComponent(RigidBody2D);
            rb.type = ERigidBody2DType.Static;
          }
          PhysicsSystem2D.instance.enable = true;
        };
        return CameraBoundaries;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "wallThickness", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Charge.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts', './Events.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Slider, Button, Node, Sprite, Color, Component, Player, Events;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Slider = module.Slider;
      Button = module.Button;
      Node = module.Node;
      Sprite = module.Sprite;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      Events = module.Events;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "51b63MAG1dIt51ICxjX3Z+T", "Charge", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Charge = exports('Charge', (_dec = ccclass('Charge'), _dec2 = property({
        type: Slider
      }), _dec3 = property({
        type: Button
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Charge, _Component);
        function Charge() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "slider", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "triggerButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playerNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "collisionObject", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sliderHandle", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "touchArea", _descriptor6, _assertThisInitialized(_this));
          // The touch area where interaction will happen
          _initializerDefineProperty(_this, "maxValue", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "multiplier", _descriptor8, _assertThisInitialized(_this));
          _this.value = 0;
          _this.sliderSpeed = 0.005;
          _this.sliderDirection = 1;
          _this.baseSliderSpeed = 0.005;
          return _this;
        }
        var _proto = Charge.prototype;
        _proto.start = function start() {
          Events.on('Restart', this.onRestart, this);
          Events.on('BottleReset', this.onBottleReset, this);
          Events.on('IncreaseSliderSpeed', this.onIncreaseSliderSpeed, this);
          this.resetSlider();

          // Listen for a click or touch inside the touch area (not the entire screen)
          if (this.touchArea) {
            this.touchArea.on(Node.EventType.TOUCH_END, this.onScreenTouch, this);
          }
        };
        _proto.onIncreaseSliderSpeed = function onIncreaseSliderSpeed() {
          this.sliderSpeed *= 1.2;
          console.log("Slider speed increased to: " + this.sliderSpeed);
        };
        _proto.onRestart = function onRestart() {
          console.log('Charge.ts: Restart event received');
          this.resetSlider();
        };
        _proto.resetSlider = function resetSlider() {
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
        };
        _proto.onSliderChanged = function onSliderChanged() {
          if (this.slider) {
            this.value = this.slider.progress * this.maxValue;
            console.log('Slider value: ', this.value.toFixed(2));
          }
        };
        _proto.onBottleReset = function onBottleReset() {
          console.log('✅ Bottle reset! Button re-enabled.');
          if (this.triggerButton) {
            this.triggerButton.interactable = true;
          }
        }

        // Handle touch/click anywhere inside the touch area
        ;

        _proto.onScreenTouch = function onScreenTouch(event) {
          var _this$playerNode, _this$collisionObject;
          if (!this.triggerButton || !this.triggerButton.interactable) return;

          // Same logic as the button click
          var forceValue = this.value;

          // Check if the value is in the special sweet spot
          var rounded = Math.round(this.value);
          if (rounded >= 35 && rounded <= 45) {
            forceValue = 49.50; // Override to 49.50 if near 40
          } else if (rounded >= 55 && rounded <= 65) {
            forceValue = 60.5; // Override to 60.5 if near 60
          }

          console.log("\uD83D\uDE80 Screen touched within the area! Sending force value: " + forceValue.toFixed(2));

          // Apply the force value to the player
          var player = (_this$playerNode = this.playerNode) == null ? void 0 : _this$playerNode.getComponent(Player);
          if (player) {
            player.applyChargeForce(forceValue);
          } else {
            console.warn('Player component missing!');
          }

          // Handle collision
          var collisionHandler = (_this$collisionObject = this.collisionObject) == null ? void 0 : _this$collisionObject.getComponent('CollisionHandler');
          if (collisionHandler && typeof collisionHandler.startChecking === 'function') {
            collisionHandler.startChecking();
          } else {
            console.warn('No CollisionHandler found on collisionObject!');
          }

          // Disable the button temporarily (we don't need it anymore since we're using screen touch)
          this.triggerButton.interactable = false;
        };
        _proto.updateSliderMovement = function updateSliderMovement() {
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
              var sprite = this.sliderHandle.getComponent(Sprite);
              if (sprite) {
                var rounded = Math.round(this.value);
                var isNear40 = rounded >= 35 && rounded <= 45;
                if (isNear40) {
                  sprite.color = new Color(0, 255, 0); // Green
                } else {
                  sprite.color = new Color(255, 255, 255); // White
                }
              }
            }
          }
        };

        _proto.update = function update(deltaTime) {
          this.updateSliderMovement();
        };
        _proto.onDestroy = function onDestroy() {
          Events.off('Restart', this.onRestart, this);
          Events.off('BottleReset', this.onBottleReset, this);

          // Clean up touch listeners
          if (this.touchArea) {
            this.touchArea.off(Node.EventType.TOUCH_END, this.onScreenTouch, this);
          }
        };
        return Charge;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slider", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "triggerButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "collisionObject", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sliderHandle", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "touchArea", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "maxValue", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "multiplier", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CollisionHandler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts', './ScoreManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, Collider2D, Contact2DType, RigidBody2D, Vec2, Component, Events, ScoreManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      RigidBody2D = module.RigidBody2D;
      Vec2 = module.Vec2;
      Component = module.Component;
    }, function (module) {
      Events = module.Events;
    }, function (module) {
      ScoreManager = module.ScoreManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "984a7N/eVpDsJTm+Lla4RUr", "CollisionHandler", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CollisionHandler = exports('CollisionHandler', (_dec = ccclass('CollisionHandler'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CollisionHandler, _Component);
        function CollisionHandler() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "bottleNode", _descriptor, _assertThisInitialized(_this));
          _this._isTouching = false;
          _this._currentOtherCollider = null;
          _this._shouldCheck = false;
          _this._delayTime = 1;
          _this._scoreManager = null;
          _this._originalBottlePosition = new Vec3();
          _this._bottleBody = null;
          return _this;
        }
        var _proto = CollisionHandler.prototype;
        _proto.start = function start() {
          var collider = this.getComponent(Collider2D);
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
        };
        _proto.update = function update(dt) {
          var _this2 = this;
          if (this._shouldCheck && this._isTouching && this._currentOtherCollider) {
            var tag = this._currentOtherCollider.tag;
            if (tag === 8) {
              // Bottle hits bottom
              console.log('🍾 Bottle hit bottom. Will reset after 0.5s...');
              this._shouldCheck = false;
              Events.emit('BottleScored'); // 📈 Emit score event

              // ⏳ Delay before resetting
              this.scheduleOnce(function () {
                _this2.resetBottle();
                Events.emit('IncreaseSliderSpeed'); // 🏎️ Increase slider speed
              }, 0.5); // adjust delay as needed
            } else if (tag === 1) {
              // Hit wall
              console.log('💥 Hit wall. Game Over in 1 sec...');
              this._shouldCheck = false;
              this.scheduleOnce(function () {
                Events.emit('GameOver');
              }, 1);
            }
          }
        };
        _proto.onBeginContact = function onBeginContact(self, other) {
          this._isTouching = true;
          this._currentOtherCollider = other;
        };
        _proto.onEndContact = function onEndContact() {
          this._isTouching = false;
          this._currentOtherCollider = null;
        };
        _proto.startChecking = function startChecking() {
          var _this3 = this;
          this.scheduleOnce(function () {
            console.log('⏳ Start collision check!');
            _this3._shouldCheck = true;
          }, this._delayTime);
        };
        _proto.resetBottle = function resetBottle() {
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
        };
        return CollisionHandler;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "bottleNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Events.ts", ['cc'], function (exports) {
  var cclegacy, EventTarget;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6a2fbWMzPNK9pnXNaZbYJ1O", "Events", undefined);
      var Events = exports('Events', new EventTarget());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, director, Component, Events;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      Events = module.Events;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "3c38dtzT/NLgqdKHb0RD5b3", "GameManager", undefined);
      var property = _decorator.property,
        ccclass = _decorator.ccclass;
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);
        function GameManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "gameOverPanel", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = GameManager.prototype;
        _proto.start = function start() {
          // Listen for the GameOver event
          Events.on('GameOver', this.onGameOver, this);
        }

        // Function to restart the game (called when a reset occurs)
        ;

        _proto.restartGame = function restartGame() {
          console.log('[GameManager] Restarting game...');

          // Dispatch a "Restart" event that other components (like Charge) can listen to
          Events.emit('Restart');

          // Reset UI
          if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
          }
          director.resume();

          // You can also manually reset player, score, enemies, etc here
        }

        // Function to go to the main menu
        ;

        _proto.goToMainMenu = function goToMainMenu() {
          console.log('[GameManager] Going to Main Menu...');
          director.loadScene('mainmenu');
          director.resume();
        }

        // Function to go back to the game (usually called from the main menu)
        ;

        _proto.gotoGame = function gotoGame() {
          console.log('[GameManager] Going to the Game...');
          director.loadScene('game');
          director.resume();
        }

        // Clean up event listeners when this object is destroyed
        ;

        _proto.onDestroy = function onDestroy() {
          Events.off('GameOver', this.onGameOver, this);
        }

        // Handle the GameOver event
        ;

        _proto.onGameOver = function onGameOver() {
          console.log('[GameManager] Game Over!');

          // Pause the game and show the Game Over panel
          if (this.gameOverPanel) {
            this.gameOverPanel.active = true; // Show the Game Over UI
          }

          director.pause();
        };
        return GameManager;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameOverPanel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./AudioManager.ts', './BottleSpawner.ts', './Camera.ts', './CameraBoundaries.ts', './Charge.ts', './CollisionHandler.ts', './Events.ts', './GameManager.ts', './Player.ts', './ScoreManager.ts', './movers.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/movers.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "31d0cm715tJho5Zh3vYmXxy", "movers", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var movers = exports('movers', (_dec = ccclass('movers'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(movers, _Component);
        function movers() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = movers.prototype;
        // Function to go to the main menu
        _proto.goToMainMenu = function goToMainMenu() {
          console.log('[GameManager] Going to Main Menu...');
          director.loadScene('mainmenu');
          director.resume();
        }

        // Function to go back to the game (usually called from the main menu)
        ;

        _proto.gotoGame = function gotoGame() {
          console.log('[GameManager] Going to the Game...');
          director.loadScene('game');
          director.resume();
        };
        return movers;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Player.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec2, RigidBody2D, Component, Events;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec2 = module.Vec2;
      RigidBody2D = module.RigidBody2D;
      Component = module.Component;
    }, function (module) {
      Events = module.Events;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "d82d1tClE5KbLTq3kwKbUyt", "Player", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Player = exports('Player', (_dec = ccclass('Player'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Player, _Component);
        function Player() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "direction", _descriptor, _assertThisInitialized(_this));
          // Upward direction
          _initializerDefineProperty(_this, "forceMultiplier", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spinMultiplier", _descriptor3, _assertThisInitialized(_this));
          _this.body = null;
          _this.startPos = new Vec2();
          return _this;
        }
        var _proto = Player.prototype;
        // 📌 Remember start position
        _proto.start = function start() {
          this.body = this.getComponent(RigidBody2D);
          if (this.body) {
            this.body.linearDamping = 0.2;
            this.body.angularDamping = 0.05;
          }

          // Save initial position
          this.startPos.set(this.node.position.x, this.node.position.y);

          // 🔁 Listen for Restart event
          Events.on('Restart', this.onRestart, this);
        };
        _proto.applyChargeForce = function applyChargeForce(forceValue) {
          if (!this.body) return;
          var impulse = this.direction.clone().multiplyScalar(forceValue * this.forceMultiplier);
          var worldCenter = new Vec2();
          this.body.getWorldCenter(worldCenter);
          this.body.applyLinearImpulse(impulse, worldCenter, true);
          var rotationForce = forceValue * this.spinMultiplier;
          this.body.applyAngularImpulse(rotationForce, true);
          console.log('Applied force:', impulse, 'Rotation:', rotationForce);
        }

        // 🔁 Reset on restart
        ;

        _proto.onRestart = function onRestart() {
          if (this.body) {
            this.body.linearVelocity = new Vec2(0, 0);
            this.body.angularVelocity = 0;
          }
          this.node.setPosition(this.startPos.x, this.startPos.y);
          this.node.angle = 0;
          console.log('Player reset!');
        };
        _proto.onDestroy = function onDestroy() {
          Events.off('Restart', this.onRestart, this);
        };
        return Player;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "direction", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0, 1);
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "forceMultiplier", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spinMultiplier", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.05;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Events.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, Events;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      Events = module.Events;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "5d8e0CGZDlIZKUPFToQhBHx", "ScoreManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ScoreManager = exports('ScoreManager', (_dec = ccclass('ScoreManager'), _dec2 = property(Label), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScoreManager, _Component);
        function ScoreManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "scoreLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "finalScoreLabel", _descriptor2, _assertThisInitialized(_this));
          // 🏁 New: for game over screen
          _this._score = 0;
          return _this;
        }
        var _proto = ScoreManager.prototype;
        _proto.start = function start() {
          Events.on('BottleScored', this.addScore, this);
          Events.on('GameOver', this.resetScore, this);
        };
        _proto.addScore = function addScore() {
          this._score += 1;
          if (this.scoreLabel) {
            this.scoreLabel.string = "" + this._score;
          }
          console.log('🎯 Score increased:', this._score);
        };
        _proto.resetScore = function resetScore() {
          // ✨ Update final score label BEFORE resetting
          if (this.finalScoreLabel) {
            this.finalScoreLabel.string = "" + this._score;
            console.log('🏁 Final score displayed on game over screen:', this._score);
          }
          this._score = 0;
          if (this.scoreLabel) {
            this.scoreLabel.string = "" + this._score;
          }
          console.log('🎯 Score has been reset.');
        };
        _proto.onDestroy = function onDestroy() {
          Events.off('BottleScored', this.addScore, this);
          Events.off('GameOver', this.resetScore, this);
        };
        return ScoreManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "finalScoreLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});