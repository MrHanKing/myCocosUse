var MenuScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.log("载入MenuScene")
        this.ui = ccs.load(res.Menu_json);
        this.addChild(this.ui.node)
    },
    
    onEnter:function (params) {
        this._super();
        cc.log("onEnter MenuScene")
        var btn = ccui.helper.seekWidgetByName(this.ui.node, "btn_start");
        btn.addClickEventListener(function(event) {
            cc.director.runScene(new GameScene())
        })
        var e = new cc.ParticleFireworks();
        e.x = cc.winSize.width/2;
        e.y = cc.winSize.height/2;
        this.ui.node.addChild(e)
        cc.log(this.ui.node)
    }
})