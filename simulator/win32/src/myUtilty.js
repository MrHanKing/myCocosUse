var myUtility = {
    rectCollect:function(node1, node2) {
        if ((!node1) || (!node2)) {
            return false;
        }
        var rect1 = node1.getBoundingBox();
        var rect2 = node2.getBoundingBox();
        return cc.rectIntersectsRect(rect1, rect2);
    },
}