

let MjPlayer = require('../mjplayer.js');
let gt = require('../gametype/guiyang.js');
let should = require('should');

let player = new MjPlayer(gt);
describe(' constructor test/mjplayer.test.js', function () {
    //console.log(player);
    it('初始化后,手牌hand长度等于 gt.mjType.length', function () {
        player.hand.should.be.instanceof(Array).and.have.lengthOf(player.gt.mjType.length);
        player.hand[0].should.be.instanceof(Array).and.have.lengthOf(0);
    });

});

describe('20 getHandIdx(mj)  test/mjplayer.test.js', function () {
    it('获取麻将8存放位置 应该为0', function () {
            player.getHandIdx(8).should.equal(0);
    });

    it('获取麻将18存放位置 应该为2', function () {
            player.getHandIdx(18).should.equal(2);
    });

    it('获取麻将26存放位置 应该为2', function () {
            player.getHandIdx(26).should.equal(2);
    });
    it('获取麻将17存放位置 应该为1', function () {
            player.getHandIdx(17).should.equal(1);
    });
});


describe('33 firstHand(mjs)  test/mjplayer.test.js', function () {
    let mjs = [5,8,11,26,25,23,0,1,2,0,17,18,19];
    let player = new MjPlayer(gt);
    player.firstHand(mjs);
    let pai =mjs.join();
    it(pai+' init 数目不变', function () {
            player.hand[0].length.should.equal(6);
            player.hand[1].length.should.equal(2);
            player.hand[2].length.should.equal(5);
    });

});




describe('149 checkUnit(mjs)  test/mjplayer.test.js', function () {

    var testCheckUnit = function( nodenum,mjs,mj = -1 ,t0 = -1,t1 = -1,mj1 = -1){
        var tmap = new Map();
        MjPlayer.checkUnit(tmap,mjs);
        tmap.size.should.equal(nodenum);
        if(nodenum > 0){
            var leaf1 = tmap.values().next().value;
            leaf1.print();

            if(mj > -1)
                leaf1.mj.should.equal(mj);
            if(t0>-1)
                leaf1.utnums[1].should.equal(t0);
            if(t1>-1)
                leaf1.utnums[0].should.equal(t1);
            if(mj1> -1)
                leaf1.mj1.should.equal(mj1);
        }
    };

    var mjs = [1],pai =mjs.join(),nodenum = 1,mj=1;
    it(pai + ' 有'+ nodenum+'个节点,且首节点mj 为' + mj, function () {
        var mjs = [1],pai =mjs.join(),nodenum = 1,mj=1;
        testCheckUnit( nodenum,mjs,mj );
    });




    var mjs = [1,2],pai =mjs.join(),nodenum = 1,mj=1,t0 = -1,t1 = -1,mj1=2;
    it(pai + ' 有'+ nodenum+'个节点,且首节点mj 为' + mj, function () {
        var mjs = [1,2],pai =mjs.join(),nodenum = 1,mj=1,t0 = -1,t1 = -1,mj1=2;
        testCheckUnit( nodenum,mjs,mj,t0,t1,mj1 );
    });



    var mjs = [1,3],pai =mjs.join(),nodenum = 1,mj=1,t0 = -1,t1 = -1,mj1=3;
    it(pai + ' 有'+ nodenum+'个节点,且首节点mj 为' + mj, function () {
        var mjs = [1,3],pai =mjs.join(),nodenum = 1,mj=1,t0 = -1,t1 = -1,mj1=3;
        testCheckUnit( nodenum,mjs,mj,t0,t1,mj1 );
    });

    var mjs = [1,5],pai =mjs.join(),nodenum = 0,mj=1,t0 = -1,t1 = -1,mj1=3;
    it(pai + ' 有'+ nodenum+'个节点,且首节点mj 为' + mj, function () {
        var mjs = [1,5],pai =mjs.join(),nodenum = 0,mj=1,t0 = -1,t1 = -1,mj1=3;
        testCheckUnit( nodenum,mjs,mj,t0,t1,mj1 );
    });


    var mjs = [1,1],pai =mjs.join(),nodenum = 1,mj=1,t0 = -1,t1 = 1 ,mj1=-1;
    it(pai + ' 有'+ nodenum+'个节点,且首节点mj 为' + mj+" 对子:"+t1+"  缺一:"+t0+'  mj1:' + mj1, function () {
        var mjs = [1,1],pai =mjs.join(),nodenum = 1,mj=1,t0 = -1,t1 = -1,mj1=-1;
        testCheckUnit( nodenum,mjs,mj,t0,t1,mj1 );
    });



    var mjs = [1,2,3];
    var pai =mjs.join();
    it(pai+' 只有一个节点,且首节点mj 为1,出现abc', function () {
        var tmap = new Map();
        var mjs = [1,2,3];
        MjPlayer.checkUnit(tmap,mjs);
        var leaf1 = tmap.values().next().value;
        leaf1.print();
        tmap.size.should.equal(1);
        leaf1.mj.should.equal(1);
        leaf1.utnums[3].should.equal(1);
        leaf1.utnums[0].should.equal(0);
    });

    var mjs = [1,1,1];
    var pai =mjs.join();
    it(pai+' 出现2个节点,且首节点mj 为1,出现aa', function () {
        var tmap = new Map();
        var mjs = [1,1,1];
        MjPlayer.checkUnit(tmap,mjs);
        var leaf1 = tmap.values().next().value;
        leaf1.print();
        tmap.size.should.equal(2);
        leaf1.mj.should.equal(1);
        leaf1.utnums[1].should.equal(1);
        leaf1.utnums[0].should.equal(1);
    });



    var mjs = [2,2,1];
    var pai =mjs.join();
    it(pai+' 出现1个节点,且首节点mj 为1,出现aab', function () {
        var tmap = new Map();
        var mjs = [2,2,1];
        MjPlayer.checkUnit(tmap,mjs);
        var leaf1 = tmap.values().next().value;
        leaf1.print();
        tmap.size.should.equal(1);
        leaf1.mj.should.equal(1);
        leaf1.utnums[1].should.equal(1);
        leaf1.utnums[0].should.equal(1);
    });


    var mjs = [1,2,2];
    var pai =mjs.join();
    it(pai+' 出现1个节点,且首节点mj 为1,出现abb', function () {
        var tmap = new Map();
        var mjs = [1,2,2];
        MjPlayer.checkUnit(tmap,mjs);
        var leaf1 = tmap.values().next().value;
        leaf1.print();
        tmap.size.should.equal(1);
        leaf1.mj.should.equal(1);
        leaf1.utnums[1].should.equal(1);
        leaf1.utnums[0].should.equal(1);
    });

    var mjs = [1,1,1,1];
    var pai =mjs.join();
    it(pai+' 出现2个节点,且首节点mj 为1,出现aaaa', function () {
        var tmap = new Map();
        var mjs = [1,1,1,1];
        MjPlayer.checkUnit(tmap,mjs);
        var leaf1 = tmap.values().next().value;
        leaf1.print();
        tmap.size.should.equal(2);
        leaf1.mj.should.equal(1);
        leaf1.utnums[1].should.equal(2);
    });


    var mjs = [1,1,1,3];
    var pai =mjs.join();
    it(pai+' 出现2个节点,且首节点mj 为1,出现aaac', function () {
        var tmap = new Map();
        var mjs = [1,1,1,3];
        MjPlayer.checkUnit(tmap,mjs);
        var leaf1 = tmap.values().next().value;
        leaf1.print();
        tmap.size.should.equal(2);
        leaf1.mj.should.equal(1);
        leaf1.utnums[1].should.equal(1);
    });


    var mjs = [1,1,1,4];
    var pai =mjs.join();
    it(pai+' 出现1个节点,且首节点mj 为1,出现aaad', function () {
        var tmap = new Map();
        var mjs = [1,1,1,3];
        MjPlayer.checkUnit(tmap,mjs);
        var leaf1 = tmap.values().next().value;
        leaf1.print();
        tmap.size.should.equal(2);
        leaf1.mj.should.equal(1);
        leaf1.utnums[1].should.equal(1);
    });



    var mjs = [1,1,1,2,4],pai =mjs.join(),nodenum = 1,mj= 2,t0 = -1,t1 = -1,mj1=-1;
    it(pai + ' 有'+ nodenum+'个节点,且首节点mj 为' + mj+" 对子:"+t1+"  缺一:"+t0+'  mj1:' + mj1, function () {
    var mjs = [1,1,1,2,4],pai =mjs.join(),nodenum = 1,mj= 2,t0 = -1,t1 = -1,mj1=-1;
        testCheckUnit( nodenum,mjs,mj,t0,t1,mj1 );
    });


});
