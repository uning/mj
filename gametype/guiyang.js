
//贵阳麻将玩法配置
exports = module.exports = gt = {
    //mjType: ['wan','tong','tiao'] //有几种麻将,万同条智能放前面
    //,mjTypeNum: [9,9,9]  //每一种麻将有几颗
    //,mjOneNum: 4         //同一颗麻将有多少张
    ,mjHandNum: 13       //一手麻将多少张
    ,mjTotalNum:108      //总的牌数目
    ,handTypeFan:{//牌型对应的番数
        qidui:[10,  '七对'],
        lqidui:[20, '龙七对'],
        qqidui:[20, '清七对'],
        dadui:[5, '大队'],
        qdadui:[15, '清大队'],
        qys:[10,'清一色'],
        dandiao:[10,'单调'],
        qdandiao:[20,'清单调']
    }
}


//检查手牌叫牌类型,叫什么牌
const hc = {};
exports.handCheck = hc;


//handMjs 手上麻将已经排好序了
//tableMjs 碰了的麻将
hc.qidui = function(handMjs,tableMjs,huMjs){
    //桌子上有牌
    let pk = pv =-1,ct = 0,cv = 0;
    let t1s = t2s = t3s =-1;//能连的3种牌起始位置

    let nhandMjs = new Array(handMjs.length);
    handMjs.forEach(function(v,k){
        cv = parseInt(v/4);//麻将
        nhandMjs[k] = cv ;

        //3种能连的牌起始位置
        if(t1s < 0 && cv < 9)
            t1s = k;
        if(t2s < 0 && cv >= 9 && cv < 18 )
            t2s = k;
        if(t3s < 0 && cv >= 18 && cv < 27 )
            t3s = k;


        if(pk<0){
            pk = k;
            pv = parseInt(v/4);//麻将
        }
    });
}
