
//麻将洗牌,判断牌形,胡牌叫牌等实现
//mt 是麻将玩法类型
exports = module.exports;


//洗牌,深度打乱
//返回一个数组,含打乱的牌数组
exports.shuffle = function(mjTotalNum){
    var mjHeap = new Array(mjTotalNum);
    for( let i = 0 ; i < mjTotalNum ; ++i ){
        let j = parseInt(Math.random()*1000)%mjTotalNum;
        if(mjHeap[i] === undefined){
            mjHeap[i] = parseInt(i/4);
        }
        if(mjHeap[j] === undefined){
            mjHeap[j] = parseInt(j/4);
        }
        [mjHeap[i],mjHeap[j]] = [mjHeap[j],mjHeap[i]]
    }
    return mjHeap;
}




//返回叫牌数组
exports.checkJiao = function (handMjs,mt){
    var ret = [];
    //排序
    let {mjTypeNum,mjType,mjOneNum,mjTotalNum} = gt;
    handMjs.sort();
}
