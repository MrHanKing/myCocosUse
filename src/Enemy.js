var Enemy = cc.Sprite.extend({
    ctor:function(filename, scene) {
        this._super();
        this.setProperty(filename);
        this.scene = scene;
    },

    setProperty:function(filename) {
        // 飞机类型，1为玩家，2为敌人
        this.planeType = 2;
        this.setRotation(270);
        this.refreshEnemy(filename);
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
        // cc.log(this.fireCD);
        if (this.fireCD > 0) {
            this.fireCD--;
        } else {
            this.fire();
        }

        if (this.isCollectwithBullet() || (this.x + this.width < 0)) {
            this.death();
        }
    },

    death:function() {
        cc.log("删除敌方飞机")
        // this.playBombParticle();
        this.scene.enemysPool.push(this);
        this.scene.removeElement(this);
        this.removeFromParent();
    },

    playBombParticle:function() {
        var e = new cc.ParticleSystemQuad("res/Default/defaultParticle.plist");
        e.x = cc.winSize.width/2;
        e.y = cc.winSize.height/2;
        // cc.log(this.getPosition(), e);
        this.scene.ui.addChild(e, 10);
        // cc.log(e);
    },

    fire:function() {
        this.resetFireCD();
        var bullt = this.scene.bulletsPool.pop() || new Bullet(this);
        this.scene.ui.addChild(bullt, 3);
        this.scene.enemysBullets.push(bullt);
    },

    resetFireCD:function() {
        this.fireCD = config.enemyFireCD;
    },

    isCollectwithBullet:function() {
        // cc.log(this.scene.playerBullets);
        // cc.log("---------------------------");
        for ( var node of this.scene.playerBullets) {
            // cc.log(node);
            if (myUtility.rectCollect(node, this)) {
                this.scene.removeElement(node);
                this.scene.addScore(this.score);
                node.remove();
                return true;
            }
        }
        return false;
    },

    refreshEnemy:function(filename) {
        this.score = 50;
        this.setTexture(filename);
        var index = Math.floor(Math.random() * 5)
        this.setPosition(cc.p(cc.winSize.width, index * 120 + 50));
        this.resetFireCD();
        this.speed = Math.random() * (config.enemySpeedMax - config.enemySpeedMin) + config.enemySpeedMin;
    }
})