import assert from 'node:assert/strict';
import {scene,initialFlags} from '../src/levels.js';
import {avatarObjects} from '../src/avatar.js';
import {readFileSync} from 'node:fs';
const room=scene(1,initialFlags());
assert.ok(room.objects.some(o=>o.material===1),'floor has wood grain material');
assert.ok(room.objects.some(o=>o.material===2),'linen and curtains have fabric material');
assert.ok(room.objects.some(o=>o.material===3),'wall has plaster material');
assert.ok(room.objects.some(o=>o.material===6),'cat has procedural fur material');
for(const animation of ['cat-eye','cat-ear','cat-tail','cat-breathe','curtain']){
 assert.ok(room.objects.some(o=>o.anim===animation),`${animation} secondary animation is present`);
}
const player={x:0,y:1.35,z:5,step:0,heading:0,motion:1,onGround:true,impact:0};
const a=avatarObjects(player,0),b=avatarObjects({...player,step:Math.PI/2},.5);
assert.ok(a.length>=40,'articulated character has costume and face detail');
assert.equal(a.length,b.length,'pose topology stays stable across animation frames');
assert.ok(b.some((o,i)=>Math.abs(o.pos[1]-a[i].pos[1])>.03),'walk cycle has vertical weight shift');
const shader=readFileSync(new URL('../src/renderer.js',import.meta.url),'utf8');
assert.match(shader,/uMaterial/);assert.match(shader,/uEye/);assert.match(shader,/float hash/);
assert.match(shader,/prefers-reduced-motion|material/);
console.log(' ✓ V0.3 material shading, articulated motion, cat blink/breathe, curtains');