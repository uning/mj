
var mt = require('../mjtool.js');
var gy = require('../gametype/guiyang.js');
var should = require('should');

describe('shuffle(gt) test/mjtool.test.js', function () {
    var mjHeap = mt.shuffle(108);
    it('洗牌后 108颗洗好后还是108颗', function () {
            mjHeap.length.should.equal(108);
    });

    var ken = new Array(gy.mjTotalNum/4).fill(0);
    it('洗牌后每颗牌有且只有4颗', function () {
        mjHeap.forEach(function(v){
            //should.equal(ken[mjHeap[i]], undefined);
            ken[v] += 1 ;
        })
        for(i = 0 ; i < ken.length; i += 1){
            should.equal(ken[i], 4);

        }
    });
});
