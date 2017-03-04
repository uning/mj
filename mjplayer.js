

let logger = require('./log.js').getLogger();
//玩家
class MjPlayer{

    constructor(gt){
        this.gt = gt;
        this.newgame();
    }

    newgame(){
        let me = this;
        this.hand = [];//new Array(this.gt.mjType.length);//手牌
        this.handNeed = [];//new Array(this.gt.mjType.length);//手牌

        this.artree = [];//把有效的叶子节点放数组里
        this.gt.mjType.forEach(function(v){
            me.hand.push([]);
            me.artree.push(new Map());
            me.handNeed.push(new Set());

        });
        this.table = [];//所有人出的牌
        this.peng = new Map();//
        this.gang = new Map();//杠的牌
        this.out = [];//出了的牌

        //出结果
        this.utnums = new Array(3).fill(0);
        this.canHuMjs = new Set();
        this.canOut = new Set();//当前看要出掉的牌
    }

    print(){
        console.log("0 artreemap: ");
        let prf = function(v,k){v.print();};
        this.artree[0].forEach(prf);
        console.log("1 artreemap: ");
        this.artree[1].forEach(prf);
        console.log("2 artreemap: ");
        this.artree[2].forEach(prf);
        console.log("hand",this.hand);
        console.log("table",this.table);
    }


    //获取麻将手上存放位置
    getHandIdx(mj){
        let i = 0, t = 0;
        let tnum = this.gt.mjTypeNum;
        for(; i < tnum.length ; i += 1 ){
            t += tnum[i];
            if(mj < t)
                break;
        }
        return i;
    }

    //初始摸牌,第一次摸牌
    //mjs麻将数组
    firstHand(mjs){
        var me = this;
        mjs.forEach(function(v){
            var idx = me.getHandIdx(v);
            me.hand[idx].push(v);
        });
        me.hand.forEach(function(v){
            v.sort();
        })
    }

    //碰牌
    //mj  -- 碰的麻将
    //pid -- 玩家id
    doPeng(mj,pid){


    }
}


//分析树结构,叶子节点记录需要的牌,中间节点有每种类型有多少
class ARtree{
    //aaaa不是7对以外的胡牌牌型,所以不处理
    //utype 3 abc(lian)
    //utype 2 aaa(santiao)
    //utype 1 aa(dui)
    //utype 0 a,ab,ac,bc(danpai) 需要一张pai
    constructor(parent = null,mj = -1,utype = 0,mj1 = -1){
        this.parent = parent;
        this.mj   = mj;
        this.mj1   = mj1;
        this.pnum = 0;
        this.utype = utype;
        if(parent){
            this.utnums = Array.from(parent.utnums);//
            this.utnums[utype] += 1 ;// + parent.utnums[utype];
            this.pnum = parent.pnum + 1;
            //this.canHuMjs = parent.canHuMjs; //
        }else{
            this.utnums = new Array(4).fill(0);
           // this.canHuMjs = new Set(); //
        }

    }

    print(pre=""){
        console.log(pre+"nodedata(mj:",this.mj," mj1:",this.mj1," utype:",this.utype," utnums:",this.utnums);
        if(this.parent && this.parent.mj !=-1 ){
            pre = pre +"parent|=>";
            this.parent.print(pre);
        }else{
            console.log("============");
        }
    }


    //获取key,需要去重吗?
    getKey(){
        return this.mj + this.utype*1000;
    }

    addCanhu(mj){
        this.canHuMjs.add(mj);
    }

}



//原地去除oarr数组rids里的下标的元素,返回剩下的
function filterArr(oarr,rids){
    var ret  = [];
    oarr.forEach(function(v,k){
        if(rids.indexOf(k) == -1){
            ret.push(v);
        }
    })
    //console.log("rids",rids,"ret:",ret)
    return ret;
}

//检查同类型(可以连)基本牌型
// 根据牌张数判断,要成胡牌的基本牌型,分别差什么牌,
//  1 张牌,只能这1张牌单吊,aaa贡献0,aa为0
//  2 张牌,aa ab ac 3种有一张可以胡,aaa 贡献0,其余情况,若存在其他单牌,则不用继续判断
//  3 张牌,112,123,只用123分继续分析是否有胡牌情况,
function checkUnit(atreeleafmap,mjarr,parent = new ARtree(),pp=""){
    let len = mjarr.length;
    let utnums = parent.utnums;
    //let atreeleafmap = pl.artree[mjtype];
    //logger.debug(pp+"narr:",mjarr);
    //console.log(pp+"pai :",mjarr); pp += "|___";

    let mj1 = mjarr[0];
    let mj2 = mjarr[1];
    let mj3 = mjarr[2];
    let leaf = null;
    if(len == 1){
        //全局胡单吊,必须
        //pl.canHuMjs.add(mjarr[0]);
        if((utnums[3]>0 || utnums[2]>0 ) && utnums[1] > 0){
            //有aaa || abc  又有 aa 情况下,不能单吊
            return ;
        }
        leaf = new ARtree(parent,mjarr[0],0);
        atreeleafmap.set(leaf.getKey(),leaf);
        return ;
    }
    if(len == 2){
        if(mj1 == mj2){
            leaf = new ARtree(parent,mj1,1);
            atreeleafmap.set(leaf.getKey(),leaf);
        }else if(mj1 > mj2 -3){//相差1或2
            leaf = new ARtree(parent,mj1,0,mj2);
            atreeleafmap.set(leaf.getKey(),leaf);
        }
        return;
    }

    if(len == 3){
        let mj1 = mjarr[0];
        if(mj1 == mj2 -1 == mj3 -2 ){//abc
            leaf = new ARtree(parent,mj1,3);
            atreeleafmap.set(leaf.getKey(),leaf);
        }
        if(mj1 ==  mj3 ){//aaa

            //3条先来一对
            leaf = new ARtree(parent,mj1,1);
            checkUnit(atreeleafmap,[mj1],leaf,pp);

            //3tiao
            leaf = new ARtree(parent,mj1,2);
            atreeleafmap.set(leaf.getKey(),leaf);

        }else if(mj1 == mj2){//aab
            leaf = new ARtree(parent,mj1,1);
            checkUnit(atreeleafmap,[mj3],leaf,pp);
            //atreeleafmap.set(leaf.getKey(),leaf);
        }else if(mj2 == mj3){//baa
            leaf = new ARtree(parent,mj2,1);
            checkUnit(atreeleafmap,[mj1],leaf,pp);
            //atreeleafmap.set(leaf.getKey(),leaf);
        }
        return;
    }

    let viii = 0;
    for(let i = 0 ; i < len - 1 ; i += 1 ){
        viii = i; //fuck  where change i?
        mj1 = mjarr[i];
        mj2 = mjarr[i+1];
        //aa,aaa都要尝试
        if(mj1 == mj2){
            leaf = new ARtree(parent,mj1,1);
            checkUnit(atreeleafmap, filterArr(mjarr,[i,i+1]),leaf,pp);
        }
        if( i + 2 < len && mjarr[i + 2] == mj1  ){
            leaf = new ARtree(parent,mj1,2);
            checkUnit(atreeleafmap, filterArr(mjarr,[i,i+1,i+2]),leaf,pp);
        }
        let find1 = -1,find2 = -1;
        for(j = i; j < len; ++j){
            if(mjarr[j] == mj1 + 1)
                find1 = j;
            if(mjarr[j] == mj1 + 2){
                find2 = j;
                break;
            }
        }
        if(find1 > 0 && find2 >0){
            //console.log("find+1+2 ",find1,find2);
            leaf = new ARtree(parent,mj1,3);
            arr = filterArr(mjarr,[i,find1,find2]);
            checkUnit(atreeleafmap,arr,leaf,pp);
        }
        //i = viii + 1;
        //console.log("=====end", i,' ',len)
    }
}

MjPlayer.checkUnit = checkUnit;

module.exports = MjPlayer;
