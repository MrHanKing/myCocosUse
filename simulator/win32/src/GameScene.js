var GameScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        this.init();
    },

    init:function () {
        this.ui = ccs.load(res.Game_json).node;
        this.enemysPool = [];
        this.bulletsPool = [];
        this.enemys = [];
        this.enemysBullets = [];
        this.playerBullets = [];
        this.gameOver = false;
        this.scoreNum = 0;
        this.score = ccui.helper.seekWidgetByName(this.ui, "Text_1");

        this.playerLife = ccui.helper.seekWidgetByName(this.ui, "Text_2");
        
        
        this.addChild(this.ui);
        this.bg = ccui.helper.seekWidgetByName(this.ui, "bg");
        this.bg.setTexture(res.HelloWorld_png);
        this.bg.setAnchorPoint(cc.p(0, 0));
        this.bg.setPosition(cc.p(0, 0));
        var bgSize = this.bg.getContentSize();

        this.bg1 = new cc.Sprite(res.HelloWorld_png);
        this.bg1.setAnchorPoint(cc.p(0, 0));
        this.bg1.setPosition(cc.p(bgSize.width, 0));
        this.ui.addChild(this.bg1, -1);

        this.speed = 1;

        this.player = new Player(res.Player_png, this);
        var playerSize = this.player.getContentSize();
        this.player.setPosition(cc.p(playerSize.height / 2 + 20, bgSize.height / 2));
        this.ui.addChild(this.player, 2)

        this.creatEnemys(5);
    },

    onEnter:function(params) {
        this._super();
        this.scheduleUpdate();
        this.addScore(0);
        this.refreshShowLife();
    },

    update:function(dt) {
        this._super();
        if (this.gameOver) {
            this.toMenu();
            return;
        }
        this.bg.x -= this.speed;
        this.bg1.x -= this.speed;

        if (this.bg.x + this.bg.width <= 0) {
            this.setSprite1AfterSprite2(this.bg, this.bg1);
        }
        if (this.bg1.x + this.bg1.width <= 0) {
            this.setSprite1AfterSprite2(this.bg1, this.bg);
        }

        if (this.enemys.length < 5) {
            cc.log("创造敌人")
            this.creatEnemys(5 - this.enemys.length);
        }
    },

    onExit:function() {
        this.unscheduleUpdate();
        this._super();
    },

    setSprite1AfterSprite2:function(Sprite1 ,Sprite2) {
        Sprite1.x = Sprite2.getPosition().x + Sprite2.getContentSize().width;
    },

    creatEnemys:function(num) {
        for (var index = 0; index < num; index++) {
            var resName = "enemy" + Math.ceil(Math.random() * 5) + "_png";
            var filename = res[resName];
            if (this.enemysPool.length > 0) {
                var enemy = this.enemysPool.pop();
                enemy.refreshEnemy(filename);
            } else {
                var enemy = new Enemy(filename, this);
            }
            // cc.log(resName,filename)
            this.ui.addChild(enemy, 3);
            this.enemys.push(enemy);
        }
    },

    removeElement:function(object) {
        if (object.planeType == 2) {
            this.enemys = this.enemys.filter(function(element) {
                return !(object.__instanceId == element.__instanceId)
            })
            return;
        }
        if (object.plane.planeType == 1) {
            this.playerBullets = this.playerBullets.filter(function(element) {
                return !(object.__instanceId == element.__instanceId)
            })
            return;
        }
        if (object.plane.planeType == 2) {
            this.enemysBullets = this.enemysBullets.filter(function(element) {
                return !(object.__instanceId == element.__instanceId)
            })
            return;
        }
    },

    toMenu:function() {
        cc.director.runScene(new MenuScene());
    },

    
    refreshShowLife:function() {
        this.playerLife.string = "剩余生命：" + this.player.life;
    },

    
    addScore:function(addscore) {
        this.scoreNum += addscore;
        this.score.string = "获得分数：" + this.scoreNum;
    }
})

