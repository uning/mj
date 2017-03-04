

let gt = require('./gametype/guiyang');
let MjPlayer = require('./mjplayer.js');
let loger = require('./log.js').getLogger();


let mjs = [5,8,11,26,25,23,0,1,2,0,17,18,19];
let player = new MjPlayer(gt);
player.firstHand(mjs);

let shoup = [1,2,3,4];
shoup = [1,2,3,3,3,4];
shoup = [1,1,1,2,3];
shoup = [1,1,1,2,3,4,5,6,7,8,9,9,9];
shoup = [0,0,0,1,2,3,4,5,6,7,8,8,8];
console.log("手牌  麻将:",shoup);
var tmap = new Map();
MjPlayer.checkUnit(tmap,shoup);
tmap.forEach(function(v,k){
    //console.log(k,v);
    v.print();
})


process.exit(0);
//生成麻将牌数组
let {mjTypeNum,mjType,mjOneNum,mjTotalNum} = gt;
console.log(gt);
for([i,v] in mjType){
    console.log(i,v);
}

console.log(filterArr([0,1,2,3,4,5],[1,3]));
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
