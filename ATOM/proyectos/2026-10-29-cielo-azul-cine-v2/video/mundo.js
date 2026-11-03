import * as k from '#kit';
import {loadImage,createCanvas} from '@napi-rs/canvas';
import {beat,cues,major,ramp,track,hit,mix,clamp,pulse,ease,STEP} from './beat.js';
const W=1080,H=1920,TAU=Math.PI*2;
const rand=k.azar(903);
const stars=Array.from({length:240},()=>({x:rand()*W,y:rand()*H,z:.3+rand(),s:.5+rand()*1.5}));
const dust=Array.from({length:70},()=>[rand()*TAU,80+rand()*900,rand(),.7+rand()*2]);
const RGB=(a,b,u)=>a.map((v,i)=>Math.round(mix(v,b[i],u)));
const rgba=(c,a=1)=>`rgba(${c.join(',')},${clamp(a)})`;
function poly(g,ps,c,stroke){if(ps.some(p=>!p))return;g.beginPath();ps.forEach((p,i)=>i?g.lineTo(p.x??p[0],p.y??p[1]):g.moveTo(p.x??p[0],p.y??p[1]));g.closePath();g.fillStyle=c;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=1;g.stroke();}}
function line(g,ps,c,w=2){if(ps.some(p=>!p))return;g.beginPath();ps.forEach((p,i)=>i?g.lineTo(p.x??p[0],p.y??p[1]):g.moveTo(p.x??p[0],p.y??p[1]));g.lineWidth=w;g.strokeStyle=c;g.lineCap='round';g.lineJoin='round';g.stroke();}
function glow(g,x,y,r,c,a=.5){if(a<.002)return;g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,rgba(c,a));gr.addColorStop(.25,rgba(c,a*.4));gr.addColorStop(1,rgba(c,0));g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);g.restore();}
function text(g,s,x,y,size=26,c='#b8c7d3'){g.save();g.font=`500 ${size}px Figtree`;g.fillStyle=c;g.textAlign='center';g.fillText(s,x,y);g.restore();}
function bg(g,t,blue=.2){g.fillStyle='#03070e';g.fillRect(0,0,W,H);const gr=g.createLinearGradient(0,500,0,H);gr.addColorStop(0,'#050b16');gr.addColorStop(1,'#19110e');g.fillStyle=gr;g.fillRect(0,0,W,H);glow(g,600,1070,950,[32,81,130],blue);for(const p of stars){g.fillStyle=rgba([185,205,225],.12+.22*p.z);g.beginPath();g.arc(p.x+Math.sin(t*.025)*p.z*15,p.y,p.s,0,TAU);g.fill();}}
function streak(g,ps,col,t,offset=0,w=4,a=1){g.save();g.globalAlpha=a;line(g,ps,rgba(col,.22),w*.5);const lengths=[0];for(let i=1;i<ps.length;i++)lengths.push(lengths.at(-1)+Math.hypot((ps[i].x??ps[i][0])-(ps[i-1].x??ps[i-1][0]),(ps[i].y??ps[i][1])-(ps[i-1].y??ps[i-1][1])));const total=lengths.at(-1),u=((t/STEP+offset)%2+2)%2/2;const lo=Math.max(0,u-.22),hi=u;
 const seg=[];for(let i=1;i<ps.length;i++){const a0=lengths[i-1]/total,b=lengths[i]/total;if(b<lo||a0>hi)continue;for(const z of [Math.max(a0,lo),Math.min(b,hi)]){const f=(z-a0)/(b-a0);seg.push([mix(ps[i-1].x??ps[i-1][0],ps[i].x??ps[i][0],f),mix(ps[i-1].y??ps[i-1][1],ps[i].y??ps[i][1],f)]);}}if(seg.length>1){line(g,seg,rgba(col,.28),w*3);line(g,seg,rgba(col,.9),w);const p=seg.at(-1);glow(g,p[0],p[1],w*7,col,.2);}g.restore();}
function sphere(g,p,r,col=[81,128,153],a=1){if(!p||r<1)return;g.save();g.globalAlpha*=a;const gr=g.createRadialGradient(p.x-r*.35,p.y-r*.42,r*.05,p.x,p.y,r);gr.addColorStop(0,rgba(RGB(col,[255,255,255],.8)));gr.addColorStop(.18,rgba(RGB(col,[237,242,246],.35)));gr.addColorStop(.5,rgba(col));gr.addColorStop(.88,rgba(col.map(x=>x*.18)));gr.addColorStop(1,'#030811');g.fillStyle=gr;g.beginPath();g.arc(p.x,p.y,r,0,TAU);g.fill();g.strokeStyle=rgba([127,187,230],.6);g.lineWidth=1.5;g.stroke();g.restore();}
const project=(cam,p)=>k.proyecta(cam,p);
function sphere3(g,cam,p,r,c,a=1){const q=project(cam,p);if(q)sphere(g,q,k.F*r/q.z,c,a);}
const texImage=await loadImage(new URL('../assets/earth-nasa.jpg',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
const texCanvas=createCanvas(2048,1024),tg=texCanvas.getContext('2d');tg.drawImage(texImage,0,0,2048,1024);const texture=tg.getImageData(0,0,2048,1024).data;
const N=720,planet=createCanvas(N,N),pg=planet.getContext('2d'),pixels=pg.createImageData(N,N);
const normals=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++){const nx=(x+.5-N/2)/(N/2),ny=-(y+.5-N/2)/(N/2),r2=nx*nx+ny*ny;if(r2<=1){const nz=Math.sqrt(1-r2);normals.push([4*(y*N+x),nx,ny,nz,Math.atan2(nx,nz),Math.asin(ny)]);}}
function globe(g,t,x,y,r){const rot=track(t,[[0,-.25],[2,.05],[6,.25],[11,.5],[67,.1],[74,.3],[80,.5]]);for(const [i,nx,ny,nz,lon,lat] of normals){const u=((lon+rot)/(TAU)+.5+1)%1,v=.5-lat/Math.PI;const q=4*(Math.min(1023,Math.floor(v*1024))*2048+Math.floor(u*2048));const light=.065+.94*Math.max(0,-nx*.61+ny*.33+nz*.64);const fres=Math.pow(1-nz,3)*.75;for(let c=0;c<3;c++)pixels.data[i+c]=Math.min(255,texture[q+c]*light+(c===0?25:c===1?115:228)*fres);pixels.data[i+3]=255;}
 pg.putImageData(pixels,0,0);glow(g,x-r*.18,y-r*.1,r*1.3,[38,116,243],.32);g.drawImage(planet,x-r,y-r,r*2,r*2);for(let i=6;i>0;i--){g.strokeStyle=rgba([81,162,255],.035+(6-i)*.018);g.lineWidth=i*4;g.beginPath();g.arc(x,y,r+2,0,TAU);g.stroke();}g.strokeStyle='rgba(181,222,255,.6)';g.lineWidth=2;g.beginPath();g.arc(x,y,r+2,Math.PI,Math.PI*1.85);g.stroke();}
function orbital(g,t){bg(g,t,.35);const r=track(t,[[0,1020],[2,450],[6,440],[9,470],[11,580]]),cy=track(t,[[0,1510],[2,1030],[6,1050],[11,1120]]);g.save();g.translate(540,cy);g.rotate(track(t,[[0,-.27],[2,-.1],[9,.06],[11,.12]]));globe(g,t,0,0,r);g.restore();
 const sun=ramp(t,6,9);glow(g,70,660,450,[255,169,74],sun*.8);for(let i=0;i<3;i++)streak(g,[[0,650+i*32],[430,840+i*27],[790,1060+i*18]],[255,211,145],t,i*.2,6,sun*.7);
 const impact=hit(t,9,.3);glow(g,400,860,400,[127,191,255],impact*.5);text(g,'UNA CAPA DE AIRE. TODO UN CIELO.',540,1510,25);}
const prismVertices=[[-195,-195,-130],[195,-195,-130],[0,285,-130],[-195,-195,130],[195,-195,130],[0,285,130]];
function prismScene(g,t){bg(g,t,.22);const yaw=track(t,[[11,.65],[13,.25],[16,-.3],[19,-.58]]),dist=track(t,[[11,1250],[13,1150],[16,1080],[19,900]]);const cam=k.mira(k.orbita(yaw,dist,270),[0,0,0]);const pts=prismVertices.map(p=>project(cam,p));glow(g,540,1240,650,[247,161,75],.13);
 const ground=[[-1300,-190,-1000],[1300,-190,-1000],[1300,-190,1000],[-1300,-190,1000]].map(p=>project(cam,p));poly(g,ground,'#11141a');const shadow=project(cam,[0,-185,0]);if(shadow){g.fillStyle='rgba(0,0,0,.55)';g.beginPath();g.ellipse(shadow.x,shadow.y,240,55,-.1,0,TAU);g.fill();}
 const input=[project(cam,[-900,20,0]),project(cam,[-70,20,0])];streak(g,input,[255,244,216],t,0,11);poly(g,[project(cam,[-850,8,-14]),project(cam,[-70,8,-14]),project(cam,[-70,38,14]),project(cam,[-850,38,14])],'rgba(255,246,216,.10)');
 const expand=ramp(t,14,16),cols=[[235,105,65],[245,166,65],[227,215,99],[88,189,162],[82,152,250],[154,114,233]];
 for(let i=0;i<6;i++){const z=(i-2.5)*110*expand,yy=(2.5-i)*100*expand;const a=project(cam,[100,10,0]),b=project(cam,[760,yy,z]);poly(g,[project(cam,[100,6,-3]),project(cam,[760,yy-22,z-7]),project(cam,[760,yy+22,z+7]),project(cam,[100,15,3])],rgba(cols[i],.16*expand));line(g,[a,b],rgba(cols[i],.48*expand),3);streak(g,[a,b],cols[i],t,i*.15,7,.2+.8*expand);if(a&&b){glow(g,b.x,b.y,130,cols[i],.14*expand);}}
 const faces=[[0,1,2],[3,5,4],[0,3,4,1],[1,4,5,2],[2,5,3,0]].map((ix,i)=>({ix,i,z:ix.reduce((s,j)=>s+pts[j].z,0)/ix.length})).sort((a,b)=>b.z-a.z);
 for(const f of faces){poly(g,f.ix.map(i=>pts[i]),f.i%2?'rgba(135,198,233,.14)':'rgba(207,232,245,.08)','rgba(199,231,255,.5)');}
 for(const [a,b] of [[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5]]){line(g,[pts[a],pts[b]],'rgba(103,183,245,.13)',12);line(g,[pts[a],pts[b]],'rgba(227,247,255,.9)',1.8);}
 const flare=hit(t,16,.25);glow(g,540,1000,500,[146,199,255],flare*.5);text(g,'LA LUZ BLANCA CONTIENE TODOS ESTOS COLORES',540,1510,23);}
const molecules=Array.from({length:90},()=>({p:[(rand()-.5)*2200,(rand()-.5)*1400,(rand()-.5)*2700],r:10+rand()*18,a:rand()*TAU}));
function mol(g,cam,p,r,ang,a=1){const off=[Math.cos(ang)*r*.8,Math.sin(ang)*r*.8,Math.sin(ang*.7)*r*.35],a3=k.sum(p,off),b3=k.res(p,off),pa=project(cam,a3),pb=project(cam,b3);if(!pa||!pb)return;const rr=k.F*r/((pa.z+pb.z)/2);g.save();g.globalAlpha=a;line(g,[pa,pb],'#698393',rr*.55);const balls=[{p:pa,c:[69,124,162]},{p:pb,c:[115,149,169]}].sort((a,b)=>b.p.z-a.p.z);for(const b of balls)sphere(g,b.p,rr*.75,b.c);g.restore();}
function gasScene(g,t){bg(g,t,.45);const yaw=track(t,[[19,-.65],[22,-.25],[26,.35],[30,.15],[32,-.1],[36,.18],[40,.3],[44,.5]]),dist=track(t,[[19,1520],[22,1120],[26,1000],[30,1200],[32,1450],[40,1300],[44,1000]]);const cam=k.mira(k.orbita(yaw,dist,110),[0,0,0]);
 const travel=track(t,[[19,0],[22,160],[26,260],[32,350],[40,420],[44,500]]);
 const objects=molecules.map(m=>({...m,p:[m.p[0],m.p[1],m.p[2]+travel]})).map(m=>({...m,z:project(cam,m.p)?.z??-1})).filter(m=>m.z>150).sort((a,b)=>b.z-a.z);
 for(const m of objects){const q=project(cam,m.p);if(q.x<-150||q.x>1230||q.y<500||q.y>1650)continue;mol(g,cam,m.p,m.r,m.a+t*.08,.12+Math.min(.42,300/m.z));}
 const compare=ramp(t,31,33),top=150*compare;mol(g,cam,[0,top,0],150-compare*35,track(t,[[19,-.8],[22,-.3],[26,.7],[30,1],[33,.45],[40,.6],[44,.7]]));
 const center=project(cam,[0,top,0]);glow(g,center.x,center.y,300,[85,165,244],.13+hit(t,26,.25)*.6);
 const incoming=project(cam,[-850,top,0]);streak(g,[incoming,center],[232,244,255],t,0,9,1-compare);
 const dispersed=ramp(t,25,26)*(1-compare);for(let i=0;i<12;i++){const a=i*TAU/12,b=project(cam,[Math.cos(a)*700,top+Math.sin(a)*480,Math.sin(a*2)*200]);streak(g,[center,b],[83,164,255],t,i*.1,5,dispersed);}
 if(compare>.001){mol(g,cam,[0,-180,0],95,-.4,compare);const blue=project(cam,[0,150,0]),red=project(cam,[0,-180,0]);for(const [pos,col,waveLength] of [[150,[104,180,255],100],[-180,[239,142,94],250]]){const ps=[];for(let x=-700;x<=760;x+=15)ps.push(project(cam,[x,pos+Math.sin((x-t/STEP*100)*TAU/waveLength)*27,0]));streak(g,ps,col,t,0,5,compare);}
  for(let i=0;i<7;i++){const a=-1.4+i*.48,b=project(cam,[Math.cos(a)*650,150+Math.sin(a)*430,90]);streak(g,[blue,b],[93,173,255],t,i*.13,5,compare*(.3+.7*ramp(t,39,40)));}
  text(g,'CORTAS',225,655,23,'#95caff');text(g,'LARGAS',225,1315,23,'#f5b18b');
 }
 text(g,'MOLÉCULAS Y TRAYECTORIAS AMPLIADAS',540,1510,23);}
// Real perspective landscape: orbiting camera, relief, volumetric atmosphere.
const terrainHeight=(x,z)=>Math.max(0,270*Math.exp(-((x+230)**2+(z+140)**2)/52000)+360*Math.exp(-((x-130)**2+(z+230)**2)/44000)+170*Math.exp(-((x-350)**2+(z-60)**2)/32000)-20)+(Math.sin(x*.029)*Math.cos(z*.02)+1)*9;
const mesh=[];const step=55;for(let z=-480;z<480;z+=step)for(let x=-480;x<480;x+=step){const pts=[[x,terrainHeight(x,z),z],[x+step,terrainHeight(x+step,z),z],[x+step,terrainHeight(x+step,z+step),z+step],[x,terrainHeight(x,z+step),z+step]];mesh.push({p:[pts[0],pts[1],pts[2]],shade:rand()});mesh.push({p:[pts[0],pts[2],pts[3]],shade:rand()});}
const treePositions=Array.from({length:35},()=>[(rand()-.5)*800,(rand()-.5)*800]);
function terrain(g,cam,warm){const obs=[120,terrainHeight(120,240),240];const faces=[];const light=k.uni([-mix(.4,-.7,warm),.9,.4]);for(const f of mesh){const n=k.uni(k.cruz(k.res(f.p[2],f.p[0]),k.res(f.p[1],f.p[0])));const lit=.35+.65*Math.abs(k.pto(n,light));const c=RGB([37,95,100],[132,93,56],warm).map(v=>Math.round(v*lit*(.86+f.shade*.23)));const pp=f.p.map(p=>project(cam,p));if(pp.every(Boolean))faces.push({ps:pp,z:pp.reduce((s,p)=>s+p.z,0)/3,c:rgba(c)});}
 const corners=[[-480,0,-480],[510,0,-480],[510,0,510],[-480,0,510]];for(let i=0;i<4;i++){let a=corners[i],b=corners[(i+1)%4];const pp=[a,b,[b[0],-75,b[2]],[a[0],-75,a[2]]].map(p=>project(cam,p));poly(g,pp,'#172127');}
 faces.sort((a,b)=>b.z-a.z).forEach(f=>poly(g,f.ps,f.c,f.c));
 const river=[];for(let z=-350;z<480;z+=15){const x=-190+Math.sin(z/150)*80;river.push(project(cam,[x,terrainHeight(x,z)+3,z]));}line(g,river,rgba(RGB([71,146,191],[236,165,78],warm),.65),10);line(g,river,'rgba(219,232,240,.22)',2);
 const trees=treePositions.map(([x,z])=>({x,z,y:terrainHeight(x,z),dep:project(cam,[x,0,z]).z})).sort((a,b)=>b.dep-a.dep);for(const a of trees){const trunk=project(cam,[a.x,a.y,a.z]),top=project(cam,[a.x,a.y+82,a.z]);line(g,[trunk,top],'#8d6e49',3);const c=[a.x,a.y+25,a.z];for(const [dx,dz] of [[-23,-18],[23,-18],[23,18],[-23,18]]){const nxt=dx<0?[23,dz]:[-23,-dz];poly(g,[project(cam,[c[0]+dx,c[1],c[2]+dz]),top,project(cam,[c[0]+nxt[0],c[1],c[2]+nxt[1]])],warm>.5?'#64704b':'#3c7163');}}
 const p=project(cam,obs),head=project(cam,k.sum(obs,[0,62,0])),r=k.F*10/head.z;sphere(g,head,r,[204,166,128]);line(g,[project(cam,k.sum(obs,[0,48,0])),project(cam,k.sum(obs,[0,20,0]))],'#c5533f',r*2.1);for(const x of [-7,7])line(g,[project(cam,k.sum(obs,[x,22,0])),project(cam,k.sum(obs,[x,0,0]))],'#d6d1bd',r*.6);return {world:k.sum(obs,[0,60,0]),screen:head};}
function skyScene(g,t){bg(g,t,.3);const warm=ramp(t,50,64)*(1-ramp(t,67,72));const yaw=track(t,[[44,-.55],[48,-.18],[50,0],[58,.35],[64,.65],[67,.65],[72,.2],[74,0],[79,-.3]]);const dist=track(t,[[44,1700],[48,1480],[50,1500],[58,1760],[64,1650],[67,1600],[72,1500],[74,1600],[79,1900]]);const height=track(t,[[44,850],[48,700],[50,720],[58,550],[64,530],[67,620],[72,730],[79,950]]);const cam=k.mira(k.orbita(yaw,dist,height),[0,150,0]);
 const skyColor=RGB([72,148,255],[255,163,67],warm);const center=project(cam,[0,250,0]);glow(g,center.x,center.y,650,skyColor,.22);
 // Translucent hemisphere with perspective meridians and illuminated silhouette.
 const dome=[];for(let j=0;j<=12;j++){const a=j/12*TAU;const path=[];for(let i=0;i<=32;i++){const b=i/32*Math.PI/2;path.push(project(cam,[560*Math.cos(b)*Math.cos(a),560*Math.sin(b),560*Math.cos(b)*Math.sin(a)]));}dome.push(path);}
 for(const ps of dome)line(g,ps,rgba(skyColor,.09),1.3);
 const top=project(cam,[0,560,0]);glow(g,top.x,top.y,420,skyColor,.2);
 const observer=terrain(g,cam,warm);
 const sunworld=[mix(300,-800,warm),mix(720,100,warm),-280],sun=project(cam,sunworld);glow(g,sun.x,sun.y,260,[255,174,78],.65);sphere(g,sun,24,[255,207,121]);
 for(let i=0;i<9;i++){const a=Math.PI*.12+i*Math.PI*.1;const p=project(cam,[500*Math.cos(a),300+240*Math.sin(a),-80+Math.sin(a*2)*250]);streak(g,[p,observer.screen],[101,179,255],t,i*.12,3,(1-warm*.88)*.7);}
 if(warm>.001){streak(g,[sun,observer.screen],[255,175,88],t,0,7,warm);for(let i=0;i<5;i++){const w=k.mezV(sunworld,observer.world,.2+i*.13);streak(g,[project(cam,w),project(cam,k.sum(w,[30,280,70]))],[94,167,251],t,i*.12,4,warm*.7);}}
 for(const [a,r,z,s] of dust){const x=540+Math.cos(a+t*.035)*r,y=1050+Math.sin(a)*r*.5;g.fillStyle=rgba(skyColor,.1*z);g.beginPath();g.arc(x,y,s,0,TAU);g.fill();}
 text(g,warm>.6?'UN CAMINO MÁS LARGO A TRAVÉS DEL AIRE':'EL CIELO ES LUZ QUE LLEGA A TUS OJOS',540,1510,23);}
const layers=[createCanvas(W,H),createCanvas(W,H)];
const scenes=[orbital,prismScene,gasScene,skyScene],changes=[beat(11),beat(19),beat(44)];
export const desde=0;
export function dibuja(g,t){let s=changes.filter(x=>t>=x).length;const near=changes.findIndex(x=>Math.abs(t-x)<.45);if(near>=0){const c=changes[near],u=ease((t-(c-.45))/.9);for(let j=0;j<2;j++){const gg=layers[j].getContext('2d');gg.setTransform(1,0,0,1,0,0);gg.globalAlpha=1;gg.clearRect(0,0,W,H);scenes[near+j](gg,t);}
 g.drawImage(layers[0],0,0);g.globalAlpha=u;g.drawImage(layers[1],0,0);g.globalAlpha=1;
 const f=Math.sin(Math.PI*u);glow(g,540,1000,650,[101,169,235],f*.18);line(g,[[0,1000-100*f],[1080,1000+100*f]],rgba([167,212,255],f*.15),3);
 }else scenes[s](g,t);
 // Keep upper subtitle zone clean and retain full 9:16 framing.
 const veil=g.createLinearGradient(0,200,0,600);veil.addColorStop(0,'rgba(2,6,12,.75)');veil.addColorStop(1,'rgba(2,6,12,0)');g.fillStyle=veil;g.fillRect(0,0,W,600);text(g,'C I N E   N O C T U R N O',540,180,23,'#92a7bb');k.vineta(g,.25);k.grano(g,t,.025);
}
