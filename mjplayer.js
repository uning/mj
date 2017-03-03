
//玩家
class MjPlayer{


    constructor(gt){
        this.gt = gt;
        this.newgame();
    }

    newgame(){
        this.wan = [];//手牌
        this.tong = [];//手牌
        this.tiao = [];//手牌
        this.other = [];//手牌
        this.table = [];//所有人出的牌
        this.peng = new Map();//
        this.gang = new Map();//杠的牌
        this.out = [];//出了的牌
    }

    //初始摸牌
    doInit(mjs){
        var me = this;
        mjs.forEach(function(v){
            if(v<9)
                me.wan.push(v);
            else if(v<18)
                me.tong.push(v);
            else if(v<27)
                me.tiao.push(v);
            else
                me.other.push(v);
        });
        me.wan.sort();
        me.tiao.sort();
        me.tong.sort();
        me.other.sort();
    }

    //碰牌
    //mj  -- 碰的麻将
    //pid -- 玩家id
    doPeng(mj,pid){


    }
}

module.exports = MjPlayer;
