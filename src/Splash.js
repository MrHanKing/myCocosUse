var SplashScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        this.duration = 0.5;
        this.splashList = [];
        this.init();
    },

    init:function() {
        var size = cc.winSize;
        cc.log(size);

        var mainScene = ccs.load(res.ToTry_json);
        var img = ccui.helper.seekWidgetByName(mainScene.node, "haha");
        img.setPosition(size.width / 2, size.height / 2);
        img.setOpacity(0);
        // img.loadTexture(res.Player_png);
        this.addChild(mainScene.node);

        this.img = img;

        this.createSplashList();

        this.playSplash(img);
    },
    createSplashList:function () {
        var s = {}
        s["res"] = res.HelloWorld_png;
        s["time"] = 2;
        s["duration"] = 1;
        this.splashList.push(s);
        this.splashList.push(s);
    },

    onEnter:function(params) {
        this._super();
    },

    playSplash:function(node) {
        var s = this.splashList[0];
        cc.log("splash")
        cc.log(s)    
        if (s == undefined) {
            this.end();
            return;
        }
        this.img.loadTexture(s.res)
        this.duration = s.duration
   
        node.setOpacity(0);
        var ac1 = cc.fadeIn(this.duration);
        var ac2 = cc.fadeOut(this.duration);
        node.runAction(cc.sequence(ac1,
            cc.delayTime(s.time),
            ac2, 
            cc.callFunc(function() {
                this.onPlayingEnd();
            },this)
        ));
        
    },

    onPlayingEnd:function() {
        this.splashList.shift();
        this.playSplash(this.img)
    },
    
    end:function() {
        cc.director.runScene(new MenuScene())
    }
})
