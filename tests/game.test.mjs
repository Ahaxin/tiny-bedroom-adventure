import assert from 'node:assert/strict';
import {scene,initialFlags} from '../src/levels.js';
import {Game} from '../src/game.js';
const game=Object.create(Game.prototype);
game.level=1;game.flags=initialFlags();game.stars=[];game.player={x:0,y:1.35,z:5,vy:0,onGround:true};game.audio={effect:()=>{}};game.paused=false;game.started=true;game.hintN=0;game.say=(k)=>{game.lastMessage=k};game.updateUI=()=>{};game.save=()=>{};game.makeScene=function(){this.world=scene(this.level,this.flags)};game.stageTo=function(n){this.level=n;this.player.x=0;this.player.z=5;this.makeScene()};game.showVictory=()=>{game.won=true};game.makeScene();
function touch(id){const o=game.world.interactables.find(x=>x.id===id);assert.ok(o,`missing ${id} in L${game.level}`);game.player.x=o.x;game.player.z=o.z;game.interact()}
function actual(msg){console.log(` ✓ ${msg}`)}
assert.equal(game.world.surfaces.length>=3,true);touch('cave');assert.equal(game.level,1);touch('thread');assert.equal(game.flags.slopeOpen,true);touch('ball');assert.equal(game.flags.pawMoved,true);touch('cave');assert.equal(game.level,2);actual('L1 line, ball, cat paw, cave transition');
for(let i=0;i<3;i++)touch('disc'+i);assert.equal(game.flags.runeSolved,true);touch('spool');assert.equal(game.flags.bridgeOpen,true);touch('altar');assert.equal(game.flags.scaleButtonOwned,true);touch('exit');assert.equal(game.level,3);actual('L2 rune puzzle, bridge, scale button');
touch('toy');touch('cloth');touch('catcall');assert.equal(game.flags.blanketRampOpen,true);touch('exit');assert.equal(game.level,4);actual('L3 toy, cloth, cat companion');
touch('wheelcloth');touch('ruler');touch('turn');touch('turn');assert.equal(game.flags.chairAngleIndex,2);touch('brake');assert.equal(game.flags.chairLocked,true);touch('power');touch('exit');assert.equal(game.level,5);actual('L4 chair, brake, power, transition');
touch('key0');touch('key1');touch('key2');assert.equal(game.flags.portalUnlocked,true);touch('portal');assert.equal(game.flags.screenEntered,true);touch('mirror0');touch('mirror1');touch('mirror1');assert.equal(game.flags.mirrorsSolved,true);touch('lever0');touch('lever1');touch('lever2');touch('catlight');touch('device');assert.equal(game.flags.gameCompleted,true);assert.equal(game.won,true);actual('L5 keyboard, portal, mirrors, levers, cat, finale');
const src=await import('../src/i18n.js');for(const key of ['level1','level2','level3','level4','level5','l5.device','label.device','msg.device'])assert.ok(src.LANG['nl-BE'][key]);actual('Chinese / Dutch core UI strings');
console.log('All 5-stage gameplay smoke tests passed.');