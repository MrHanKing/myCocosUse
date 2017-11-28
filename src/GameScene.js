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

        this.player = ccui.helper.seekWidgetByName(this.ui, "player");
        var playerSize = this.player.getContentSize();
        this.player.setPosition(cc.p(playerSize.height / 2 + 20, bgSize.height / 2));
        this.player.setLocalZOrder(2);
        
        this.hahaha();
    },

    hahaha:function() {
        var listener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                cc.log("keyPressed keyCode:", keyCode);
                cc.log("keyPressed:", event);
            },
            onKeyReleased: function (keyCode, event) {
                cc.log("KeyReleased keyCode:", keyCode);
                cc.log("KeyReleased:", event);
            },
        });
        cc.eventManager.addListener(listener, this.player);
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
    }
})