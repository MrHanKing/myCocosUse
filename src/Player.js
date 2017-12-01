var Player = cc.Sprite.extend({
    ctor:function(filename, scene) {
        this._super();
        this.setProperty(filename);
        this.scene = scene;
    },

    setProperty:function(filename) {
        this.setTexture(filename);
        this.setRotation(90);

        // 飞机类型，1为玩家，2为敌人
        this.planeType = 1;
        this.toUp = false;
        this.toDown = false;
        this.toLeft = false;
        this.toRight = false;
        this.speed = config.playerSpeed;

        this.resetFireCD();
    },

    onEnter:function() {
        this._super();
        this.scheduleUpdate();
        this.creatEventListener();
    },

    onExit:function() {
        this.removeEventListener();
        this.unscheduleUpdate();
        this._super();
    },

    update:function(dt) {
        this._super();
        this.fireCD--;
        if (this.toUp) {
            this.y += this.speed;
        }
        if (this.toDown) {
            this.y -= this.speed;
        }
        if (this.toLeft) {
            this.x -= this.speed;
        }
        if (this.toRight) {
            this.x += this.speed;
        }
    },

    fire:function() {
        if (this.fireCD > 0) {
            return;
        }
        this.resetFireCD();
        var bullt = this.scene.bulletsPool.pop() || new Bullet(this);
        cc.log("haha",bullt);
        this.scene.ui.addChild(bullt, 10);
        this.scene.playerBullets.push(bullt);
    },

    resetFireCD:function() {
        this.fireCD = config.playerFireCD;
    },

    creatEventListener:function() {
        this.listener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                // cc.log(keyCode,event.key,keyCode == 65);
                switch (keyCode) {
                    case 65:
                        this.toLeft = true;
                        this.toRight = false;
                        break;
                    case 68:
                        this.toLeft = false;
                        this.toRight = true;   
                        break;
                    case 87:
                        this.toUp = true;
                        this.toDown = false;
                        break;
                    case 83:
                        this.toUp = false;
                        this.toDown = true;
                        break;
                    case 32:
                        this.fire();
                        break;

                    default:
                        break;
                }
            }.bind(this),
            onKeyReleased: function (keyCode, event) {
                switch (keyCode) {
                    case 65:
                        this.toLeft = false;
                        break;
                    case 68:
                        this.toRight = false;   
                        break;
                    case 87:
                        this.toUp = false;
                        break;
                    case 83:
                        this.toDown = false;
                        break;
                    
                    default:
                        break;
                }
            }.bind(this),
        });
        cc.eventManager.addListener(this.listener, this);
    },

    removeEventListener:function() {
        cc.eventManager.removeListener(this.listener);
    }
})