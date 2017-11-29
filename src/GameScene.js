var GameScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        this.init();
    },

    init:function () {
        this.ui = ccs.load(res.Game_json).node;
        this.addChild(this.ui);
        this.bg = ccui.helper.seekWidgetByName(this.ui, "bg");
        this.bg.setTexture(res.HelloWorld_png);
        this.bg.setAnchorPoint(cc.p(0, 0));
        this.bg.setPosition(cc.p(0, 0));
        var bgSize = this.bg.getContentSize();

        this.bg1 = new cc.Sprite(res.HelloWorld_png);
        this.bg1.setAnchorPoint(cc.p(0, 0));
        this.bg1.setPosition(cc.p(bgSize.width, 0));
        this.ui.addChild(this.bg1, 1);

        this.speed = 1;

        this.player = new Player(res.Player_png);
        var playerSize = this.player.getContentSize();
        this.player.setPosition(cc.p(playerSize.height / 2 + 20, bgSize.height / 2));
        this.ui.addChild(this.player, 2)

        this.creatEnemys(5);
    },

    onEnter:function(params) {
        this._super();
        this.scheduleUpdate();
    },

    update:function(dt) {
        this._super();
        this.bg.x -= this.speed;
        this.bg1.x -= this.speed;

        if (this.bg.x + this.bg.width <= 0) {
            this.setSprite1AfterSprite2(this.bg, this.bg1);
        }
        if (this.bg1.x + this.bg1.width <= 0) {
            this.setSprite1AfterSprite2(this.bg1, this.bg);
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
            cc.log(resName,filename)
            var enemy = new Enemy(filename)
            enemy.setPosition(cc.p(cc.winSize.width, index * 120 + 50))
            this.ui.addChild(enemy, 3);
        }
    }
})

