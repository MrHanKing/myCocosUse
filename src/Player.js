var Player = cc.Sprite.extend({
    ctor:function(filename) {
        this._super();
        this.setProperty(filename);
    },

    setProperty:function(filename) {
        this.setTexture(filename);
        this.setRotation(90);
        this.toUp = false;
        this.toDown = false;
        this.toLeft = false;
        this.toRight = false;
        this.speed = config.playerSpeed;
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