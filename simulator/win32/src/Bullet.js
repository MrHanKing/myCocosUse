var Bullet = cc.Sprite.extend({
    ctor:function(plane) {
        this._super();
        var filename = res.Bullet_png;
        this.plane = plane;
        this.scene = plane.scene;
        this.setProperty(filename, plane);
    },

    setProperty:function(filename, plane) {
        this.speed = 10;
        this.setTexture(filename);
        this.setPosition(plane.getPosition())
        if (plane.planeType == 1) {
            this.setRotation(90);
            this.speed = Math.abs(this.speed);
            // cc.log("myBullet %d",this.speed);
        } else if (plane.planeType == 2) {
            this.setRotation(270);
            this.speed = -Math.abs(this.speed);
            // cc.log("emBullet %d",this.speed);
        } else {
            cc.log("warning Bullet.plane.planeType is undefined");
        }
    },

    onEnter:function() {
        this._super();
        this.scheduleUpdate();
    },

    onExit:function() {
        this.unscheduleUpdate();
        this._super();
    },

    update:function(dt) {
        this._super();
        this.x += this.speed;
        var rect = cc.rect(0, 0, cc.winSize.width, cc.winSize.height);
        if (!cc.rectContainsPoint(rect, this.getPosition())) {
            this.scene.removeElement(this);
            this.remove();
        }
    },

    remove:function() {
        this.removeFromParent();
    }
})