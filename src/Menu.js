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
    }
})