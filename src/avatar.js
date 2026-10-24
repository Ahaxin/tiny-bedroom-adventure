import {obj} from "./renderer.js";
// Articulated miniature explorer. No external model, textures or runtime dependency.
// Local forward is -Z; all joint positions are rotated together by player heading.
export function avatarObjects(p,time){
 const parts=[],phase=p.step||0,motion=Math.min(1,p.motion||0),air=!p.onGround;
 const walk=motion*(air?.22:1),swing=Math.sin(phase),bounce=air?0:walk*.055*(1-Math.cos(phase*2));
 const impact=Math.max(0,p.impact||0),squash=impact*.095;
 const y=p.y+bounce-squash,heading=p.heading||0,cs=Math.cos(heading),sn=Math.sin(heading);const lean=walk*.065*Math.sin(phase),counter=walk*.06*Math.cos(phase);
 const local=(x,dy,z)=>[p.x+x*cs+z*sn,y+dy,p.z+z*cs-x*sn];
 const add=(kind,x,dy,z,sx,sy,sz,color,more={})=>parts.push(obj(kind,...local(x,dy,z),sx,sy,sz,color,{rotY:heading,...more}));
 const segment=(a,b,r,color)=>{
   const dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],len=Math.hypot(dx,dy,dz);
   const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,mz=(a[2]+b[2])/2;
   // Rotation about local X and Z, then facing rotation about world Y.
   const rotX=Math.atan2(dz,dy),rotZ=-Math.atan2(dx,Math.hypot(dy,dz));
   add('sphere',mx,my,mz,r,len/2+r*.12,r,color,{rotX,rotZ});
 };
 add('sphere',0,.025,.0,.52,.038,.36,'#655c74',{alpha:.20});
 // Boots and two-segment legs: opposite-phase steps, flexed knees and foot lift.
 for(const side of [-1,1]){
   const ph=phase+(side===1?Math.PI:0),stride=walk*Math.sin(ph),lift=air?.21:walk*Math.max(0,Math.cos(ph))*.16;
   const hip=[side*.16,.43,0],knee=[side*.17,.25,-stride*.18-.055],ankle=[side*.17,.09+lift,-stride*.37];
   if(air){knee[1]=.32;knee[2]=-.18;ankle[1]=.22;ankle[2]=-.32;}
   segment(hip,knee,.113,'#576f91');segment(knee,ankle,.102,'#526986');
   add('sphere',ankle[0],ankle[1]-.035,ankle[2]-.095,.16,.095,.24,'#544b60',{rotX:air?-.25:stride*.22});add('sphere',ankle[0],ankle[1]-.076,ankle[2]-.18,.13,.038,.16,'#383847');
   add('sphere',hip[0],hip[1],hip[2],.15,.16,.14,'#6783a4');
 }
 // Torso and tunic, with a separate backpack and a scarf.
 add('sphere',lean,.65,0,.32,.40,.235,'#e5a87e',{rotZ:walk*.085*swing});
 add('sphere',lean,.79,-.10,.34,.105,.25,'#f6d58c');
 add('sphere',lean,.62,.245,.23,.30,.14,'#b39ac3');
 add('sphere',0,.57,.38,.11,.13,.06,'#d8c5dd');
 // Arms counter-swing with legs, with elbows and hands.
 for(const side of [-1,1]){
   const stride=walk*Math.sin(phase+(side===1?0:Math.PI));
   const shoulder=[side*.35,.82,-.005],elbow=[side*.41,.61,-stride*.19-.03],wrist=[side*.42,.41,-stride*.36-.08];
   if(air){elbow[2]=-.18;elbow[1]=.73;wrist[2]=-.37;wrist[1]=.66;}
   add('sphere',...shoulder,.15,.17,.15,'#e5a87e');
   segment(shoulder,elbow,.095,'#e5a87e');segment(elbow,wrist,.085,'#f2c3a2');
   add('sphere',...wrist,.105,.11,.105,'#f3c9a8');
 }
 const breath=.014*Math.sin(time*2.4)+walk*.022*Math.cos(phase*2);
 add('sphere',counter,1.20+breath,-.012,.32,.33,.29,'#f4caa9');
 add('sphere',counter,1.44+breath,.04,.34,.15,.31,'#514452');
 add('sphere',counter-.20,1.38+breath,-.12,.16,.12,.22,'#514452');
 add('sphere',counter+.18,1.40+breath,-.13,.14,.12,.20,'#514452');
 for(const side of [-1,1]){
   add('sphere',side*.12,1.22+breath,-.285,.045,.055,.022,'#323847');
   add('sphere',side*.13,1.245+breath,-.306,.016,.018,.008,'#ffffff');
   add('sphere',side*.32,1.17+breath,0,.06,.11,.075,'#efb99c');
 }
 add('sphere',counter,1.075+breath,-.287,.083,.035,.018,'#ca888e');
 add('sphere',counter,1.14+breath,-.315,.045,.035,.014,'#e7a996');
 // Coat hem and a fluttering scarf add readable secondary motion at tiny scale.
 add('sphere',lean,.40,.01,.34,.12,.27,'#d89178',{rotZ:-lean*.3});
 add('sphere',lean,.86,-.06,.33,.07,.25,'#ffe0a2');
 add('sphere',lean+.21,.80,.22+.08*Math.sin(time*3.4+phase),.10,.065,.29,'#f7d39a',{rotX:.17+walk*.25*swing});
 // Eyes have catchlights; an occasional blink softens the expression.
 const blink=(time%5.1)>4.98;
 for(const side of [-1,1]){
   add('sphere',counter+side*.12,1.22+breath,-.302,.045,blink?.007:.055,.022,'#323847');
   if(!blink)add('sphere',counter+side*.10,1.246+breath,-.324,.013,.014,.008,'#ffffff',{glow:.25});
 }
 return parts;
}