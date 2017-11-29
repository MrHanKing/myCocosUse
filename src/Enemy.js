var Enemy = cc.Sprite.extend({
    ctor:function(filename) {
        this._super();
        this.setProperty(filename);
    },

    setProperty:function(filename) {
        this.setTexture(filename);
        this.setRotation(270);
        this.speed = Math.random() * (config.enemySpeedMax - config.enemySpeedMin) + config.enemySpeedMin;
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
        this.x -= this.speed;
    }
})