import {obj} from './renderer.js';
const O=obj;
const C={cream:'#fff9ef',sheet:'#f5f0e7',pink:'#e8b2c6',rose:'#d989a9',mint:'#bde5d6',teal:'#4d9d9c',lav:'#bcb0ea',purple:'#7b73b5',ink:'#41445f',gold:'#ffcd77',wood:'#bc9676',dark:'#3b394e',sky:'#ddebf0'};
function box(a,x,y,z,sx,sy,sz,c,extra={}){a.push(O('box',x,y,z,sx,sy,sz,c,{material:extra.material??(sy<.6&&sx>2&&sz>2?2:0),...extra}))}
function ball(a,x,y,z,sx,sy,sz,c,extra){a.push(O('sphere',x,y,z,sx,sy,sz,c,extra))}
function cyl(a,x,y,z,r,h,c,extra){a.push(O('cylinder',x,y,z,r,h,r,c,extra))}
function cone(a,x,y,z,r,h,c,extra){a.push(O('cone',x,y,z,r,h,r,c,extra))}
function plank(a,x,z,w,l,top,c,th=.28){box(a,x,top-th,z,w,th,l,c);box(a,x,top+.015,z,w*.96,.02,l*.96,C.cream,{alpha:.07})}
function surface(s,x,z,w,l,y=1.2){s.push({xmin:x-w,xmax:x+w,zmin:z-l,zmax:z+l,y})}
function platform(a,s,x,z,w,l,y,c){plank(a,x,z,w,l,y,c);surface(s,x,z,w,l,y)}
function star(a,x,y,z,c=C.gold,size=.12){ball(a,x,y,z,size,size,size,c,{glow:.9});cone(a,x,y+size*.5,z,size*.5,size*1.3,c,{glow:.35})}
function rings(a,x,y,z,c=C.gold){cyl(a,x,y,z,.58,.045,c,{glow:.35});ball(a,x,y+.23,z,.2,.2,.2,c,{glow:.38})}
function card(a,x,y,z,c='#ffffff'){box(a,x,y,z,.9,.06,.55,c,{rotZ:-.08});box(a,x,y+.08,z,.35,.02,.10,C.lav)}
function pillow(a,x,y,z,c=C.cream,sx=1.8,sz=1.2){
 ball(a,x,y,z,sx,.36,sz,c,{material:2});ball(a,x,y+.13,z,sx*.89,.23,sz*.85,c,{material:2});
 // Piped seams follow the four corners of the pillow.
 for(const side of [-1,1]){ball(a,x+side*sx*.88,y-.03,z,.065,.075,sz*.83,'#e6e0d8',{material:2});}
}
function plant(a,x,y,z){cyl(a,x,y+.55,z,.42,.44,'#d2b8a1');for(let i=0;i<6;i++){let angle=i*Math.PI/3;ball(a,x+Math.cos(angle)*.34,y+1.25+i%2*.18,z+Math.sin(angle)*.3,.24,.65,.20,i%2?'#6daba1':'#83c5ac',{rotZ:Math.cos(angle)*.6})}}
function cat(a,x,y,z,small=false,rotate=0){
 // Ragdoll-like colourpoint cat, inspired by the actual cat on the right-hand side of the bed.
 const k=small?.72:1,co=Math.cos(rotate),si=Math.sin(rotate);
 const at=(dx,dy,dz)=>[x+k*(dx*co+dz*si),y+k*dy,z+k*(dz*co-dx*si)];
 const fluff='#f5eee2',cream='#fff9ed',point='#8b7d7b',dark='#6b6065',blue='#8bc6df';
 a.push(O('sphere',...at(0,.10,.20),1.5*k,.045*k,1.55*k,'#5e5360',{alpha:.15}));
 function b(dx,dy,dz,sx,sy,sz,color,extra={}){const pos=at(dx,dy,dz);a.push(O('sphere',...pos,sx*k,sy*k,sz*k,color,{material:6,anim:'cat-breathe',rest:pos.slice(),catPhase:dx*.7+dz*.31,...extra}));}
 function c(dx,dy,dz,sx,sy,sz,color,extra={}){const pos=at(dx,dy,dz);a.push(O('cone',...pos,sx*k,sy*k,sz*k,color,{material:6,anim:'cat-breathe',rest:pos.slice(),catPhase:dx*.7+dz*.31,...extra}));}
 // Lying fluffy body and fur tufts, with paws tucked beneath chest.
 b(0,.69,.34,1.35,.70,1.48,fluff);
 b(0,.43,-.45,1.08,.38,.85,cream);
 for(let i=0;i<11;i++){let ang=i*2*Math.PI/11;b(Math.cos(ang)*1.02,.68+Math.sin(i*2)*.1,.32+Math.sin(ang)*1.02,.34,.35,.42,i%2?fluff:cream);}
 for(let side of [-1,1]){b(side*.65,.27,-.94,.39,.25,.58,point);b(side*.65,.27,-1.31,.34,.20,.25,'#9c8d88');}
 // Thick tail curling up to the right, distinct darker tip.
 for(let i=0;i<5;i++){const pos=at(1.18+i*.17,.73+i*.17,1.12+i*.15);a.push(O('sphere',...pos,(.39-i*.025)*k,(.38-i*.02)*k,(.44-i*.03)*k,i>2?point:fluff,{anim:'cat-tail',tailIndex:i,rest:pos.slice()}));}
 // Broad cheeks, facial colourpoint mask, bright blue eyes.
 b(0,1.30,-.82,.90,.76,.82,cream);
 b(0,1.25,-1.30,.70,.56,.40,point);
 b(-.54,1.06,-1.27,.38,.37,.34,fluff);b(.54,1.06,-1.27,.38,.37,.34,fluff);
 for(let side of [-1,1]){
   c(side*.59,1.94,-.91,.34,.47,.29,point,{rotZ:-side*.16});
   c(side*.59,2.02,-1.08,.19,.27,.11,'#d8b6b5',{rotZ:-side*.16,anim:'cat-ear',rest:at(side*.59,2.02,-1.08)});
   b(side*.31,1.44,-1.63,.22,.24,.10,dark);
   b(side*.31,1.44,-1.72,.165,.19,.065,blue,{glow:.15,anim:'cat-eye',rest:at(side*.31,1.44,-1.72)});
   b(side*.31,1.44,-1.78,.065,.13,.035,'#283c4d');
   b(side*.27,1.53,-1.81,.042,.045,.02,'#ffffff',{glow:.3});
   // whiskers fan outward from muzzle
   for(let w=0;w<3;w++)b(side*(.52+w*.16),1.06+(w-1)*.08,-1.57,.17,.018,.018,'#eee9e5',{rotZ:side*(w-1)*.18});
 }
 b(0,1.10,-1.68,.18,.11,.09,'#d5a2a7');b(0,.99,-1.67,.075,.07,.025,'#695c62');
 // Small ear tufts and mane around cheeks.
 for(let side of [-1,1])for(let j=0;j<3;j++)b(side*(.74+j*.12),1.05+j*.12,-.98,.22,.25,.27,fluff);
}
function bedroom(a,l){
 // Hand-modelled stylised reconstruction: desk and curtain LEFT, white bed RIGHT.
 const wall='#f0efec',wood='#b78d68',sheet='#f1eee7',white='#f9f9f6',charcoal='#292b32';
 box(a,0,-.63,-13,36,.6,55,wood,{material:1});
 // Translucent sunlight pools from the left window, soft rather than hard shadows.
 ball(a,-10.7,-.285,-24.0,3.7,.012,5.8,'#ffe6bf',{alpha:.12});
 ball(a,-6.3,-.283,-18.0,2.3,.011,3.9,'#fff1d6',{alpha:.09});
 for(let i=0;i<22;i++){let x=-17+i*1.58;box(a,x,-.32,-13,.008,.006,54,i%3?'#aa886e':'#cba482',{material:1});}
 // Avoid long cross-floor seams: they bleed through platforms in Canvas fallback.
 for(let i=0;i<15;i++){let z=-38+i*3.2;box(a,-12,-.315,z,4.6,.012,.015,'#a5836d');box(a,12,-.315,z,4.6,.012,.015,'#a5836d');}
 box(a,0,9.0,-39.5,36,12.5,.3,wall,{material:3});
 box(a,-17.5,8,-18,.28,12,44,'#e6e4e1',{material:3});
 box(a,17.5,8,-18,.28,12,44,'#ebe9e6',{material:3});
 box(a,0,3.6,-39.2,35,.065,.1,'#ffffff');
 // Window, grey full-height curtain with individual pleats and bright slit.
 box(a,-15.8,6.0,-30.0,.1,5.9,5.7,'#c8d6dd');
 box(a,-15.7,6.0,-29.6,.13,5.7,.35,'#fbfcf7',{glow:.18});
 for(let i=0;i<13;i++){let z=-36.8+i*.75;const pos=[-15.0+(i%3)*.10,6.0,z];box(a,...pos,.23,5.8,.43,i%2?'#92949e':'#a6a7b1',{material:2,anim:'curtain',rest:pos.slice(),curtainIndex:i});}
 box(a,-15.15,11.95,-32,.24,.08,10.2,'#777985');
 box(a,-16.2,1.6,-30,.34,.6,10.3,'#f6f5f1');
 // White desk on left; double display (black monitor + open laptop).
 box(a,-8.8,2.05,-31.0,6.0,.20,3.2,white);
 box(a,-8.8,1.06,-32.35,5.8,.91,.14,'#eeecea');
 for(let xx of [-14.2,-3.4])box(a,xx,.95,-31,.18,.98,2.9,'#f4f2f0');
 box(a,-8.8,2.22,-31,5.85,.035,3.0,'#ffffff');
 // Monitor on stand and its slightly reflective dark screen.
 box(a,-6.0,4.2,-32.1,2.6,1.48,.13,'#252b34');
 box(a,-6.0,4.2,-31.99,2.38,1.27,.03,'#111922',{material:5});
 box(a,-6.6,4.68,-31.96,.45,.018,.012,'#303d49',{alpha:.5});
 box(a,-6.0,2.85,-32.15,.10,.27,.10,'#2a2c32');
 box(a,-6.0,2.58,-32.15,.8,.05,.45,'#37383d');
 // Laptop, open at a slant, keyboard and colourful keycaps.
 box(a,-10.2,2.23,-30.15,1.35,.06,.87,'#393d46');
 box(a,-10.2,3.30,-30.95,1.35,1.0,.07,'#2b3039',{rotX:-.10});
 box(a,-10.2,3.30,-30.85,1.23,.87,.025,'#0d1620',{rotX:-.10,material:5});
 for(let i=0;i<6;i++)for(let j=0;j<3;j++)box(a,-10.72+i*.20,2.29,-30.47+j*.18,.078,.012,.045,(i+j)%4===0?'#a87991':'#727985');
 // Papers, notebooks, pens and mug on desk.
 for(let i=0;i<4;i++)box(a,-5.0+i*.16,2.29+i*.03,-29.8,.62,.025,.41,i%2?'#dcd6d4':'#ffffff',{rotY:.13*i});
 cyl(a,-12.2,2.43,-30.2,.26,.25,'#f7f3f0');
 for(let i=0;i<5;i++)box(a,-12.4+i*.15,2.31,-32.0,.07,.05,.35,['#e6ad9f','#9caec8','#e7c9a0'][i%3]);
 // Upper white floating shelf, books and storage.
 box(a,-9.1,7.25,-35.8,5.5,.12,1.15,'#ffffff');
 for(let i=0;i<10;i++){let x=-13.5+i*.62;box(a,x,7.63,-35.9,.22,.35+(i%4)*.10,.56,['#ba8f92','#e7c8c2','#b0b4bb','#d9c5b2'][i%4]);}
 box(a,-5.3,7.65,-35.7,1.1,.40,.72,'#403a39');
 // Mesh-backed swivel chair, 5-spoke base, wheels, armrests.
 cyl(a,-10.8,.6,-24.5,.15,.70,'#292b32');
 for(let i=0;i<5;i++){let t=i*2*Math.PI/5;box(a,-10.8+Math.sin(t)*.82,.18,-24.5+Math.cos(t)*.82,.11,.09,.84,charcoal,{rotY:t});ball(a,-10.8+Math.sin(t)*1.5,.15,-24.5+Math.cos(t)*1.5,.18,.18,.18,'#1d2026');}
 ball(a,-10.8,-.27,-24.5,2.0,.035,1.55,'#5c4e51',{alpha:.18});ball(a,-10.8,1.52,-24.5,1.55,.27,1.15,'#272a31');
 ball(a,-10.8,3.12,-25.4,1.36,1.55,.28,'#25272d');
 ball(a,-10.8,3.15,-25.14,1.08,1.31,.08,'#454b52');
 for(let side of [-1,1]){box(a,-10.8+side*1.4,2.15,-24.4,.14,.08,.8,'#25272d');box(a,-10.8+side*1.4,1.75,-24.5,.10,.42,.12,'#2c3037');}
 // White headboard and large low bed, aligned on RIGHT as in photo.
 box(a,7.8,2.4,-35.5,7.65,1.6,.25,'#fafaf8');
 ball(a,7.8,-.26,-28.3,7.6,.035,8.9,'#6f5e58',{alpha:.13});box(a,7.8,1.0,-28.3,7.55,.85,8.8,'#ece8e1');
 box(a,7.8,1.55,-28.3,7.58,.25,8.65,sheet,{material:2});
 box(a,7.8,1.70,-28.3,7.3,.12,8.35,'#f6f3ed',{material:2});
 for(let i=0;i<4;i++)box(a,4.8+i*2,1.78,-28.3,.02,.012,8.1,'#e1ddd5');
 // Pillows against headboard and rumpled white/blue duvet in foreground.
 pillow(a,5.2,1.94,-33.5,'#f7f5ee',1.48,1.10);
 pillow(a,8.0,1.95,-33.8,'#f8f7f1',1.50,1.12);
 pillow(a,10.6,1.95,-33.5,'#f8f5ed',1.45,1.15);
 for(let i=0;i<7;i++){let x=4.9+i*.8,z=-27.5+Math.sin(i*1.7)*1.0;ball(a,x,2.02+Math.sin(i*.8)*.19,z,.75,.39,1.52,i%2?'#e2e5e9':'#f0f1f1',{rotZ:Math.sin(i)*.13,material:2});}
 // The signature pink blanket at right foot of bed.
 for(let i=0;i<5;i++)ball(a,9.2+i*.55,2.0+Math.sin(i*1.6)*.17,-26.0+i*.45,.85,.28,1.0,i%2?'#dca6b0':'#e8b5bf',{rotZ:.15*i,material:2});
 // Narrow seams on the pink blanket and blue-edged duvet.
 for(let i=0;i<6;i++){
  const z=-25.0+i*.38;
  ball(a,10.0+i*.24,2.18+Math.sin(i)*.13,z,.40,.025,.045,'#f4cbd1',{alpha:.65,material:2});
 }
 for(let i=0;i<6;i++)ball(a,5.0+i*.86,2.24+Math.sin(i*.8)*.12,-26.5+Math.sin(i*1.7)*.9,.27,.04,.055,'#d5dbe0',{alpha:.62,material:2});
 // Black upright floor lamp at far right.
 cyl(a,15.6,3.0,-35.7,.075,3.0,'#242528');
 cyl(a,15.6,.15,-35.7,.57,.08,'#26272a');
 cyl(a,15.6,6.3,-35.7,.50,.75,'#e4ded2',{alpha:.75});
 cyl(a,15.6,5.5,-35.7,.14,.18,'#302b29');
 // Gentle rug edge and photo-like low sunlight.
 box(a,-1.2,-.27,-23.0,2.1,.025,6.1,'#d5b29a',{alpha:.32});
}
function caveBackdrop(a){box(a,0,-1,-8,28,.85,46,'#4b536f');box(a,0,9,-39,27,8,.5,'#585678');for(let j=0;j<26;j++){let x=Math.sin(j*31.7)*8,z=-32+(j%13)*3;ball(a,x,.4+(j%4)*2,z,.15,.15,.15,j%3?'#b8b5ef':'#ffe5b2',{glow:.7})}for(let k=0;k<9;k++){let x=k%2===0?-5.2:5.2,z=4-k*3.6;ball(a,x,3.1,z,1.4,3.4,1.8,'#8885a5',{alpha:.74});ball(a,x*1.08,4.3,z,.6,1.0,.9,'#a1a0c5',{alpha:.48})}}
function digitalBackdrop(a){box(a,0,-1,-6,32,.7,45,'#344a68');box(a,0,9,-39,27,8,.4,'#29395b');for(let i=0;i<23;i++){let x=Math.sin(i*77)*9,y=.4+(i%4)*1.25,z=-26+(i%12)*2.9;box(a,x,y,z,.4,.18,.34,i%2?'#8f94de':'#62c8cc',{rotY:i*.3,glow:.18})}for(let i=0;i<10;i++){let x=i%2?-5:5,z=6-i*4.1;box(a,x,2.7,z,.3,1.8,.06,'#89cadd',{alpha:.45,rotZ:i*.12})}}
export const titles={1:'level1',2:'level2',3:'level3',4:'level4',5:'level5'};
export function initialFlags(){return {slopeOpen:false,pawMoved:false,runeDiscs:[2,0,1],runeSolved:false,bridgeOpen:false,scaleButtonOwned:false,catToy:false,catFree:false,catTrustUnlocked:false,blanketRampOpen:false,clothFreed:false,chairRampOpen:false,chairAngleIndex:0,chairLocked:false,computerAwake:false,keySeq:0,portalUnlocked:false,screenEntered:false,mirrors:[0,0],mirrorsSolved:false,leverSeq:0,catHelp:false,deviceFixed:false,gameCompleted:false}}
export function scene(level,flags,time=0){const a=[],s=[],interact=[],collect=[],glyphs=[];function point(id,x,z,y=1.2,help){interact.push({id,x,z,y,help});rings(a,x,y+.48,z)}
 const addStars=(positions)=>positions.slice(0,1).forEach(([x,z],i)=>{star(a,x,1.9+Math.sin(i)*.15,z,'#fff1b1',.15);collect.push({id:`L${level}-${i}`,x,z})});
 if(level===1){bedroom(a); // Giant close-up blanket top
 box(a,0,.55,-7.8,4.75,.48,17.8,'#faf9f5');platform(a,s,0,2.0,4.15,5.1,1.35,'#f2e5e5');platform(a,s,0,-7.5,3.85,3.15,1.76,'#f1d1d7');platform(a,s,0,-16.7,4.25,5.5,1.76,'#efe6e8');
 for(let i=0;i<8;i++){
 const z=1.2-i*2.9;
 ball(a,Math.sin(i*1.9)*2.0,1.81,z,1.2,.07,.20,i%2?'#f8f2ef':'#e7d9dd',{alpha:.48,material:2});
 }
 pillow(a,3.0,1.75,-8.3,'#ffffff',1.1,2.4);pillow(a,-2.8,1.85,-16.8,'#fffaf5',1.15,1.65);ball(a,-3.6,1.95,1.9,1.4,.17,3.1,'#dccad7');
 if(flags.slopeOpen){platform(a,s,0,-3.4,1.55,1.7,1.76,'#dce5df');box(a,-1.1,1.5,-2.7,.13,.13,2,'#e6bca4',{rotY:.45})}else{ball(a,0,1.35,-4,2.6,.9,1.1,'#efe1e9');box(a,-1.7,1.83,-1.2,.75,.055,.05,'#e6aa89',{rotY:.24})}
 if(flags.slopeOpen){box(a,0,1.37,-11.5,1.2,.20,1.5,C.mint,{rotX:-.09});surface(s,0,-11.5,1.2,1.5,1.56)}
 else{box(a,0,1.15,-11.6,2,.14,.6,'#dac8e5')}
 point('thread',-2.0,-1.5,1.35,'thread');
 const b=flags.pawMoved?[-1.8,-19.0]:[2.2,-15.0];ball(a,b[0],2.22,b[1],.56,.56,.56,'#e1a8a7');for(let k=0;k<3;k++)ball(a,b[0]+Math.sin(k*2)*.38,2.54,b[1]+Math.cos(k*2)*.34,.12,.13,.11,'#fce6b2');
 box(a,-1.8,1.84,-19,.83,.045,.73,'#f7d58f');cyl(a,-1.8,2.02,-19,.46,.1,'#d6a06a');
 cat(a,2.2,1.75,-20.6,false);if(!flags.pawMoved){ball(a,.3,2.07,-20.6,1,.38,.62,'#fff5eb');box(a,0,1.9,-21,.7,.6,.45,'#998a9c')}else{ball(a,0,2.20,-21,.66,.8,.48,'#9f87be',{glow:.2});star(a,0,3.15,-21,'#ffdb8f',.2)}
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