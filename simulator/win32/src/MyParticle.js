var MyParticle = cc.ParticleFireworks.extend({
    ctor:function(pos) {
        this._super();
        this.showTime = 10;
        this.pos = pos
    },

    onEnter:function(params) {
        this._super();
        this.setPosition(this.pos);
    },
})