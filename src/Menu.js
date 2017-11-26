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
        var listener1 = new cc.EventListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event) {        //实现 onTouchBegan 事件处理回调函数
                var target = event.getCurrentTarget();    // 获取事件所绑定的 target, 通常是cc.Node及其子类 
    
                // 获取当前触摸点相对于按钮所在的坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
    
                if (cc.rectContainsPoint(rect, locationInNode)) {        // 判断触摸点是否在按钮范围内
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onMouseUp: function(event) {            //实现onTouchMoved事件处理回调函数, 触摸移动时触发
                // 移动当前按钮精灵的坐标位置
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();              //获取事件数据: delta
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {            // 实现onTouchEnded事件处理回调函数
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
                if (target == sprite2) {                    
                    sprite1.setLocalZOrder(100);            // 重新设置 ZOrder，显示的前后顺序将会改变
                } else if (target == sprite1) {
                    sprite1.setLocalZOrder(0);
                }
            }
        });

        var node = ccui.helper.seekWidgetByName(this.ui.node, "btn_start");
        cc.eventManager.addListener(listener1, node);
    }
})