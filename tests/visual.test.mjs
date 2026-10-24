import assert from 'node:assert/strict';
import {avatarObjects} from '../src/avatar.js';
import {scene,initialFlags} from '../src/levels.js';
const p={x:0,y:1.35,z:5,step:0,heading:0,motion:1,onGround:true,impact:0};
const idle=avatarObjects({...p,motion:0},0);
const walking=avatarObjects({...p,step:Math.PI/2},0);
const jumping=avatarObjects({...p,onGround:false},0);
assert.ok(idle.length>25,'Avatar has articulated body parts');
assert.ok(walking.length===idle.length && jumping.length===idle.length);
assert.ok(walking.some((part,i)=>Math.abs(part.pos[2]-idle[i].pos[2])>.08),'Walking moves limbs in depth');
assert.ok(jumping.some((part,i)=>Math.abs(part.pos[1]-walking[i].pos[1])>.08),'Jumping changes limb pose');
for(const pose of [idle,walking,jumping])for(const part of pose){
 assert.ok(part.pos.every(Number.isFinite));assert.ok(part.size.every(Number.isFinite));
}
const room=scene(1,initialFlags());
assert.ok(room.objects.length>150,'Detailed bedroom geometry loaded');
assert.ok(room.objects.some(o=>o.anim==='cat-tail'),'Cat tail is animated');
for(const l of [1,2,3,4,5])assert.ok(scene(l,initialFlags()).surfaces.length>0);
console.log(' ✓ V0.2 articulated avatar, bedroom details, animated colourpoint cat');