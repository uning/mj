

var gt = require('./gametype/guiyang');
//生成麻将牌数组
let {mjTypeNum,mjType,mjOneNum,mjTotalNum} = gt;
console.log(gt);
for([i,v] in mjType){
    console.log(i,v);
}
process.exit(0);
var mjHeap = new Array(mjTotalNum);
for( let i = 0 ; i < mjTotalNum ; ++i ){
    let j = parseInt(Math.random()*1000)%mjTotalNum;
    if(mjHeap[i] === undefined){
        mjHeap[i] = i;
    }
    if(mjHeap[j] === undefined){
        mjHeap[j] = j;
    }
    [mjHeap[i],mjHeap[j]] = [mjHeap[j],mjHeap[i]]
}
console.log(mjHeap)

process.exit(0);
for( i in mjType ){
    for(let j = 0 ; j < mjTypeNum[i] ; ++j){
        for(let k = 0; k < mjOneNum ; ++k ){
           // console.log(i,j,mjType[i]);
        }
    }
}
