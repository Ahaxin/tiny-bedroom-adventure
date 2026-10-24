import {obj} from './renderer.js';
const O=obj;
const C={cream:'#fff9ef',sheet:'#f5f0e7',pink:'#e8b2c6',rose:'#d989a9',mint:'#bde5d6',teal:'#4d9d9c',lav:'#bcb0ea',purple:'#7b73b5',ink:'#41445f',gold:'#ffcd77',wood:'#bc9676',dark:'#3b394e',sky:'#ddebf0'};
function box(a,x,y,z,sx,sy,sz,c,extra){a.push(O('box',x,y,z,sx,sy,sz,c,extra))}
function ball(a,x,y,z,sx,sy,sz,c,extra){a.push(O('sphere',x,y,z,sx,sy,sz,c,extra))}
function cyl(a,x,y,z,r,h,c,extra){a.push(O('cylinder',x,y,z,r,h,r,c,extra))}
function cone(a,x,y,z,r,h,c,extra){a.push(O('cone',x,y,z,r,h,r,c,extra))}
function plank(a,x,z,w,l,top,c,th=.28){box(a,x,top-th,z,w,th,l,c);box(a,x,top+.015,z,w*.96,.02,l*.96,C.cream,{alpha:.07})}
function surface(s,x,z,w,l,y=1.2){s.push({xmin:x-w,xmax:x+w,zmin:z-l,zmax:z+l,y})}
function platform(a,s,x,z,w,l,y,c){plank(a,x,z,w,l,y,c);surface(s,x,z,w,l,y)}
function star(a,x,y,z,c=C.gold,size=.12){ball(a,x,y,z,size,size,size,c,{glow:.9});cone(a,x,y+size*.5,z,size*.5,size*1.3,c,{glow:.35})}
function rings(a,x,y,z,c=C.gold){cyl(a,x,y,z,.58,.045,c,{glow:.35});ball(a,x,y+.23,z,.2,.2,.2,c,{glow:.38})}
function card(a,x,y,z,c='#ffffff'){box(a,x,y,z,.9,.06,.55,c,{rotZ:-.08});box(a,x,y+.08,z,.35,.02,.10,C.lav)}
function pillow(a,x,y,z,c=C.cream,sx=1.8,sz=1.2){ball(a,x,y,z,sx,.38,sz,c);ball(a,x,y+.16,z,sx*.85,.23,sz*.8,c)}
function plant(a,x,y,z){cyl(a,x,y+.55,z,.42,.44,'#d2b8a1');for(let i=0;i<6;i++){let angle=i*Math.PI/3;ball(a,x+Math.cos(angle)*.34,y+1.25+i%2*.18,z+Math.sin(angle)*.3,.24,.65,.20,i%2?'#6daba1':'#83c5ac',{rotZ:Math.cos(angle)*.6})}}
function cat(a,x,y,z,small=false,rotate=0){let scale=small?.7:1;let g=(dx,dy,dz)=>[x+dx*scale,y+dy*scale,z+dz*scale];function b(dx,dy,dz,sx,sy,sz,c){let p=g(dx,dy,dz);ball(a,...p,sx*scale,sy*scale,sz*scale,c,{rotY:rotate})}b(0,.94,0,1.35,.93,1.65,'#fff7ed');b(0,1.63,-.72,.91,.82,.84,'#fefbf8');b(-.59,2.17,-.88,.32,.41,.27,'#d6a8a5');b(.59,2.17,-.88,.32,.41,.27,'#d6a8a5');b(-.56,2.17,-.88,.21,.30,.21,'#fff9f4');b(.56,2.17,-.88,.21,.30,.21,'#fff9f4');b(-.37,1.73,-1.41,.15,.23,.07,'#5d99ae');b(.37,1.73,-1.41,.15,.23,.07,'#5d99ae');b(-.34,1.73,-1.47,.061,.10,.04,'#25394b');b(.34,1.73,-1.47,.061,.10,.04,'#25394b');b(0,1.42,-1.52,.16,.105,.08,'#d894a5');b(-.64,.28,-1.13,.35,.3,.48,'#fff9ef');b(.64,.28,-1.13,.35,.3,.48,'#fff9ef');b(1.35,.8,1.02,.32,.32,.50,'#fff9ef');b(1.65,1.1,1.40,.28,.27,.37,'#d8b0ab')}
function bedroom(a,l){ // unmistakable relative furniture: bed right, desk/office chair left, grey curtains at window
 box(a,0,-.52,-7.5,36,.48,44,'#caa989');for(let z=-30;z<15;z+=3.3){box(a,0,-.28,z,36,.009,.018,'#a67b64')}
 box(a,0,12,-41,37,13,.42,'#e9e6e2');box(a,-18,10,-15,.38,13,35,'#dfd5cd');
 box(a,-11.9,7.5,-37,.11,4.1,3.8,'#b9c8cf');box(a,-11.9,7.5,-37.1,.15,.12,3.8,'#f7f8fa');
 for(let i=0;i<5;i++)box(a,-12.25+i*.25,7.5,-36.7+i*.2,.20,4.35,.30,'#aaa9b3');
 box(a,7.0,1.2,-25,5.5,.7,14.6,'#f7f7f6');box(a,7,2.2,-33,5.8,1.6,.28,'#fafafb');pillow(a,5,2.35,-30,'#f6f1ed',1.5,.8);pillow(a,8.4,2.35,-30,'#fbf9f4',1.4,.9);
 box(a,7,1.8,-24.5,5.4,.14,5.5,C.pink,{rotZ:.02});
 box(a,-7.5,1.8,-31,5.2,.25,2.7,'#f7f7f7');for(let x of [-11.4,-3.7])box(a,x,.65,-31,.19,1.0,.23,'#f8f8f8');
 box(a,-8.4,2.25,-31.7,1.7,.9,.14,'#343946');box(a,-8.4,2.1,-31.7,1.5,.72,.16,'#788996');box(a,-6.5,2.07,-30.6,1.6,.05,.5,'#d4d7d8');
 box(a,-7.4,2.7,-34,4.4,.10,1.0,'#ffffff');box(a,-7.5,1,-26,1.4,.32,1.2,'#343342');cyl(a,-7.5,.35,-26,.24,.48,'#3c3846');
 for(let d of [-1,1]){box(a,-7.5+d*1.1,.06,-26,.72,.10,.11,'#31313f');box(a,-7.5,.20,-26+d*1.1,.10,.10,.72,'#343342')}
 plant(a,14,0,-29);cyl(a,15,2.8,-37,.08,2.8,'#d8c6ac');ball(a,15,5.6,-37,.68,.7,.68,'#ffe9b7',{glow:.22});
}
function caveBackdrop(a){box(a,0,-1,-8,28,.85,46,'#4b536f');box(a,0,9,-39,27,8,.5,'#585678');for(let j=0;j<26;j++){let x=Math.sin(j*31.7)*8,z=-32+(j%13)*3;ball(a,x,.4+(j%4)*2,z,.15,.15,.15,j%3?'#b8b5ef':'#ffe5b2',{glow:.7})}for(let k=0;k<9;k++){let x=k%2===0?-5.2:5.2,z=4-k*3.6;ball(a,x,3.1,z,1.4,3.4,1.8,'#8885a5',{alpha:.74});ball(a,x*1.08,4.3,z,.6,1.0,.9,'#a1a0c5',{alpha:.48})}}
function digitalBackdrop(a){box(a,0,-1,-6,32,.7,45,'#344a68');box(a,0,9,-39,27,8,.4,'#29395b');for(let i=0;i<23;i++){let x=Math.sin(i*77)*9,y=.4+(i%4)*1.25,z=-26+(i%12)*2.9;box(a,x,y,z,.4,.18,.34,i%2?'#8f94de':'#62c8cc',{rotY:i*.3,glow:.18})}for(let i=0;i<10;i++){let x=i%2?-5:5,z=6-i*4.1;box(a,x,2.7,z,.3,1.8,.06,'#89cadd',{alpha:.45,rotZ:i*.12})}}
export const titles={1:'level1',2:'level2',3:'level3',4:'level4',5:'level5'};
export function initialFlags(){return {slopeOpen:false,pawMoved:false,runeDiscs:[2,0,1],runeSolved:false,bridgeOpen:false,scaleButtonOwned:false,catToy:false,catFree:false,catTrustUnlocked:false,blanketRampOpen:false,clothFreed:false,chairRampOpen:false,chairAngleIndex:0,chairLocked:false,computerAwake:false,keySeq:0,portalUnlocked:false,screenEntered:false,mirrors:[0,0],mirrorsSolved:false,leverSeq:0,catHelp:false,deviceFixed:false,gameCompleted:false}}
export function scene(level,flags,time=0){const a=[],s=[],interact=[],collect=[],glyphs=[];function point(id,x,z,y=1.2,help){interact.push({id,x,z,y,help});rings(a,x,y+.48,z)}
 const addStars=(positions)=>positions.slice(0,1).forEach(([x,z],i)=>{star(a,x,1.9+Math.sin(i)*.15,z,'#fff1b1',.15);collect.push({id:`L${level}-${i}`,x,z})});
 if(level===1){bedroom(a); // Giant close-up blanket top
 box(a,0,.55,-7.8,4.75,.48,17.8,'#faf9f5');platform(a,s,0,2.0,4.15,5.1,1.35,'#f2e5e5');platform(a,s,0,-7.5,3.85,3.15,1.76,'#f1d1d7');platform(a,s,0,-16.7,4.25,5.5,1.76,'#efe6e8');
 pillow(a,3.0,1.75,-8.3,'#ffffff',1.1,2.4);pillow(a,-2.8,1.85,-16.8,'#fffaf5',1.15,1.65);ball(a,-3.6,1.95,1.9,1.4,.17,3.1,'#dccad7');
 if(flags.slopeOpen){platform(a,s,0,-3.4,1.55,1.7,1.76,'#dce5df');box(a,-1.1,1.5,-2.7,.13,.13,2,'#e6bca4',{rotY:.45})}else{ball(a,0,1.35,-4,2.6,.9,1.1,'#efe1e9');box(a,-1.7,1.83,-1.2,.75,.055,.05,'#e6aa89',{rotY:.24})}
 if(flags.slopeOpen){box(a,0,1.37,-11.5,1.2,.20,1.5,C.mint,{rotX:-.09});surface(s,0,-11.5,1.2,1.5,1.56)}
 else{box(a,0,1.15,-11.6,2,.14,.6,'#dac8e5')}
 point('thread',-2.0,-1.5,1.35,'thread');
 const b=flags.pawMoved?[-1.8,-19.0]:[2.2,-15.0];ball(a,b[0],2.22,b[1],.56,.56,.56,'#e1a8a7');for(let k=0;k<3;k++)ball(a,b[0]+Math.sin(k*2)*.38,2.54,b[1]+Math.cos(k*2)*.34,.12,.13,.11,'#fce6b2');
 box(a,-1.8,1.84,-19,.83,.045,.73,'#f7d58f');cyl(a,-1.8,2.02,-19,.46,.1,'#d6a06a');
 cat(a,2.2,1.75,-20.6,true);if(!flags.pawMoved){ball(a,.3,2.07,-20.6,1,.38,.62,'#fff5eb');box(a,0,1.9,-21,.7,.6,.45,'#998a9c')}else{ball(a,0,2.20,-21,.66,.8,.48,'#9f87be',{glow:.2});star(a,0,3.15,-21,'#ffdb8f',.2)}
 point('ball',2.2,-15.0,1.76,'ball');point('cave',0,-21,1.76,'cave');addStars([[3,3],[-2.8,-8],[3,-18]])
 }else if(level===2){caveBackdrop(a);platform(a,s,0,1.4,4.2,5.7,1.2,'#9892ae');platform(a,s,0,-7.8,4.2,3.3,1.2,'#a8a5c3');platform(a,s,0,-17.2,4.2,5.8,1.2,'#b3a8c5');
 box(a,0,2.7,3.4,.9,1.6,.5,'#efd8bd');ball(a,0,4.1,3.4,.86,.42,.46,'#ddc3ad');for(let i=0;i<4;i++)ball(a,-2.8+i*1.7,3.5,-1,.24,.7,.28,'#c3c2dc',{glow:.08});
 ['☾','✦','☀'].forEach((_,i)=>{let x=(i-1)*2.2;const disc=flags.runeDiscs[i];cyl(a,x,1.5,-4.3,.86,.19,['#8d9cc0','#ddb6c3','#cbb0e9'][disc],{glow:.25});for(let k=0;k<4;k++)ball(a,x+Math.cos(k*1.57)*.53,1.77,-4.3+Math.sin(k*1.57)*.53,.10,.10,.10,'#fff8e9');point('disc'+i,x,-4.3,1.2,'disc');glyphs.push({x,y:2.3,z:-4.3,text:['☾','✦','☀'][disc]})});glyphs.push({x:0,y:3.8,z:-6.2,text:'☾   ✦   ☀',size:'large'});
 if(flags.runeSolved){star(a,0,2.8,-5.5,'#ffe6a0',.3)}
 cyl(a,0,1.6,-8.3,.9,.64,flags.runeSolved?'#ddae83':'#746b89');point('spool',0,-8.3,1.2,'spool');
 if(flags.bridgeOpen){platform(a,s,0,-12.1,1.35,2.4,1.2,'#d9b9cf');box(a,0,1.25,-12.1,1.28,.06,2.2,'#fae5d8')}else{box(a,0,.3,-12,4,.2,2,'#4d4d76')}
 for(let j=0;j<4;j++)ball(a,(j-1.5)*1.8,1.9,-17.3,.4,.55,.4,'#e0c8cf');cyl(a,0,1.55,-19.1,1.4,.42,'#e2c7a5');ball(a,0,2.28,-19.1,.58,.24,.58,flags.scaleButtonOwned?'#998ab9':'#ffdfa1',{glow:.5});point('altar',0,-19.1,1.2,'altar');
 ball(a,0,2.1,-22.4,1,.9,.7,'#99b9ca',{glow:.18});point('exit',0,-22.4,1.2,'exit');addStars([[-3,2],[3,-9],[-2.8,-18]])
 }else if(level===3){bedroom(a);platform(a,s,0,1,4.5,6.1,1.35,'#e9b6c7');platform(a,s,0,-10.3,4.5,5.6,1.35,'#e6b2c3');platform(a,s,0,-20.2,4.6,4.7,1.35,'#f2d1db');
 pillow(a,-3,1.6,-5.5,'#f8ecf0',1.3,1.0);cat(a,0.4,1.35,-11,false);
 const toy=flags.catToy?[-2.1,-9.4]:[2.2,-3.9];ball(a,toy[0],1.85,toy[1],.58,.55,.58,'#e3ab80');
 box(a,-2.2,1.44,-9.5,1.1,.035,1.0,'#f7dbc4');
 box(a,2.1,1.65,-13.6,1.3,.21,.86,flags.catFree?'#f3deea':'#dca0c6',{rotZ:flags.catFree?.28:-.12});
 if(flags.blanketRampOpen){platform(a,s,0,-15.8,2.2,1.35,1.35,'#fff2ee');box(a,2.9,1,-22,1.7,1.2,2.1,'#d7bb96');}
 box(a,0,1.2,-16.8,4.7,.14,.95,'#e8b7be');
 point('toy',2.2,-3.9,1.35,'toy');point('cloth',2.1,-13.6,1.35,'cloth');point('catcall',-2.1,-16.5,1.35,'catcall');point('exit',0,-23.1,1.35,'exit');addStars([[-3,1],[3,-11],[-3,-20]]);
 }else if(level===4){bedroom(a);
 platform(a,s,0,2,4.2,5.9,1.25,'#ddc2ad');platform(a,s,0,-8.7,3.8,4.6,1.25,'#d7c6ca');platform(a,s,0,-15.6,3.5,2.5,1.25,'#bdb8c8');platform(a,s,0,-23.5,4.2,3.5,1.25,'#e2c8b7');
 // Chair: feet, pedestal, seat and rotatable back
 cyl(a,0,.7,-12.5,.25,1.1,'#343744');for(let k=0;k<5;k++){let t=k*2*Math.PI/5;box(a,Math.sin(t)*1.1,.25,-12.5+Math.cos(t)*1.1,.12,.12,.99,'#3a3d47',{rotY:t})}
 ball(a,0,1.30,-12.5,2.5,.32,2.05,'#393a4b');ball(a,0,3.12,-13.7,2.05,1.9,.46,'#444554');
 box(a,-1.5,2.1,-12.4,.18,.18,1.1,'#4c4b5b',{rotY:flags.chairAngleIndex*.52});box(a,1.5,2.1,-12.4,.18,.18,1.1,'#4c4b5b',{rotY:flags.chairAngleIndex*.52});
 card(a,-2.8,1.42,1.7,'#e3d0bf');ball(a,-1.8,1.34,0,.5,.13,.8,flags.clothFreed?'#f3e4de':'#bdabc5');
 if(flags.chairRampOpen){platform(a,s,0,-5.25,1.25,1.6,1.25,'#e8d5a9');box(a,0,1.29,-5.2,1.2,.08,1.4,'#c9a5a0')}
 if(flags.chairLocked){platform(a,s,0,-19.2,1.25,1.65,1.25,'#d9dddc');box(a,0,1.30,-19.1,1.28,.08,1.4,'#faf4dc')}else{ball(a,0,1,-19.2,1.65,.15,.65,'#4f576c')}
 box(a,0,1.6,-23.5,2.9,.33,2.5,'#f1f1ef');box(a,0,3,-25.2,2.4,1.35,.22,'#3e465b');box(a,0,3,-24.92,2.15,1.09,.065,flags.computerAwake?'#9fdcd9':'#5b6274',{glow:flags.computerAwake?.2:0});
 point('wheelcloth',-1.8,1,1.25,'wheelcloth');point('ruler',1.8,-4.1,1.25,'ruler');point('turn',0,-12.1,1.25,'turn');point('brake',2.3,-15.5,1.25,'brake');point('power',0,-23.5,1.25,'power');point('exit',0,-26.2,1.25,'exit');addStars([[3,3],[-3,-11],[2.6,-23]]);
 }else if(level===5){digitalBackdrop(a);if(!flags.screenEntered){
 platform(a,s,0,1.8,4.4,6.3,1.25,'#d4cdd7');platform(a,s,0,-9,4.4,4.5,1.25,'#bfcbd9');
 for(let i=0;i<3;i++){let x=(i-1)*2.25;box(a,x,1.5,-3.1,.9,.22,.8,flags.keySeq>i?'#b6e6d4':'#f4e9ea');ball(a,x,1.85,-3.1,.18,.12,.2,['#cfbddb','#d5acb1','#f7e0a5'][i]);point('key'+i,x,-3.1,1.25,'key');glyphs.push({x,y:2.09,z:-3.1,text:['☾','🐾','✦'][i]})}glyphs.push({x:0,y:5.0,z:-8.7,text:'☾   🐾   ✦',size:'large'});
 box(a,0,3,-9.0,3.3,2.25,.28,'#414967');box(a,0,3,-8.7,2.95,1.95,.12,flags.portalUnlocked?'#a4e8dd':'#7981b3',{glow:flags.portalUnlocked?.18:0});
 for(let i=0;i<7;i++)star(a,Math.sin(i*2)*1.1,2.1+i*.28,-8.5,'#ffebc4',.11);point('portal',0,-8.3,1.25,'portal');addStars([[3,2],[-3,-6],[2.8,-10]]);
 }else{
 platform(a,s,0,2.5,4.2,5.0,1.25,'#9dbcd1');platform(a,s,0,-5.0,4.2,3.0,1.25,'#9ebac9');platform(a,s,0,-17,4.2,4.7,1.25,'#b5c0d9');platform(a,s,0,-23.7,4.0,3.4,1.25,'#b5c7dd');
 if(flags.mirrorsSolved){platform(a,s,0,-11.2,1.6,3.3,1.25,'#aee6da');for(let i=0;i<6;i++)ball(a,0,1.62,-11.2+(i-2.5)*.8,.16,.15,.16,'#f1fff0',{glow:.75})}
 for(let i=0;i<2;i++){let x=i===0?-2.1:2.1,z=i===0?-3.1:-6.5;box(a,x,1.7,z,.86,.86,.12,'#d9f6ed',{rotY:flags.mirrors[i]*.8,glow:.13});point('mirror'+i,x,z,1.25,'mirror')}
 for(let i=0;i<3;i++){let x=(i-1)*2.2;box(a,x,1.7,-17,.45,1.1,.32,flags.leverSeq>i?'#c3eccb':'#d6bfdc');ball(a,x,2.55,-17,.4,.35,.38,['#a9b8e0','#e9cf98','#efaab0'][i]);point('lever'+i,x,-17,1.25,'lever');glyphs.push({x,y:3.05,z:-17,text:['☾','✦','☀'][i]})};
 box(a,0,1.78,-23.7,1.8,.4,1.9,'#777eaa');ball(a,0,2.6,-23.7,.76,.9,.8,flags.deviceFixed?'#f5dd97':'#a7c7df',{glow:.35});for(let k=0;k<7;k++){let ang=k*Math.PI*2/7;star(a,Math.sin(ang)*1.6,3.0+Math.cos(ang)*1.4,-23.7,'#e6dafa',.12)}
 point('catlight',-2.5,-21.2,1.25,'catlight');point('device',0,-23.7,1.25,'device');addStars([[-3,1],[3,-14],[2.6,-23]]);
 }
 }
 return {objects:a,surfaces:s,interactables:interact,collectibles:collect,glyphs};
}