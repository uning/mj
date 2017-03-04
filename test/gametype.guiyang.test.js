
var gy = require('../gametype/guiyang.js');
var should = require('should');

describe('test/gametype.guiyang.test.js', function () {
    it('麻将类型有3种', function () {
            gy.mjType.length.should.equal(3);
    });

    it('同一麻将牌有4颗', function () {
            gy.mjOneNum.should.equal(4);
    });
});



