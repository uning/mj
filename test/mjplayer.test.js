

var MjPlayer = require('../mjplayer.js');
var should = require('should');

describe(' constructor test/mjplayer.test.js', function () {
    var player = new MjPlayer();
    //console.log(player);
    it('初始化后,手牌wan是空数组', function () {
        player.wan.should.be.instanceof(Array).and.have.lengthOf(0);

    });

});
