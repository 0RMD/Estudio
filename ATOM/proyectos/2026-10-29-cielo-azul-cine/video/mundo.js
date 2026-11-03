import * as k from '#kit';
import {v} from '#voz';
const TAU=Math.PI*2;
export const S=n=>v.frase(n).inicio;
export const E=n=>v.frase(n).fin;
const mix=k.mez, smooth=(t,a,b)=>k.suave(k.tramo(t,a,b));
const rng=k.azar(81);
const dust=Array.from({length:90},()=>[rng()*1080,rng()*1920,rng()*1.8+.5,rng()]);
function poly(g,ps,fill,stroke){g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fillStyle=fill;g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=1.5;g.stroke();}}
function line(g,ps,color,w=2){g.beginPath();ps.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.strokeStyle=color;g.lineWidth=w;g.lineJoin='round';g.lineCap='round';g.stroke();}
function glow(g,x,y,r,color,opacity=.5){g.save();g.globalCompositeOperation='lighter';const a=g.createRadialGradient(x,y,0,x,y,r);a.addColorStop(0,`rgba(${color},${opacity})`);a.addColorStop(.35,`rgba(${color},${opacity*.35})`);a.addColorStop(1,`rgba(${color},0)`);g.fillStyle=a;g.fillRect(x-r,y-r,r*2,r*2);g.restore();}
function ball(g,x,y,r,color='blue',alpha=1){g.save();g.globalAlpha*=alpha;const gr=g.createRadialGradient(x-r*.36,y-r*.45,r*.03,x,y,r);const col=color==='blue'?['#dceaf2','#778e9a','#22343d','#10151a']:color==='amber'?['#fff1c7','#e0a259','#685036','#15110e']:['#e0bfb2','#97776a','#42332e','#130f0e'];[0,.28,.75,1].forEach((a,i)=>gr.addColorStop(a,col[i]));g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();g.strokeStyle='rgba(235,211,180,.35)';g.lineWidth=1;g.stroke();g.restore();}
function label(g,txt,x,y,size=26,color='#c7b6a5'){g.save();g.font=`500 ${size}px Figtree`;g.fillStyle=color;g.textAlign='center';g.fillText(txt,x,y);g.restore();}
function start(g,t,chapter){k.nocheCine(g);for(const [x,y,r,a] of dust){g.globalAlpha=.08+a*.15;g.fillStyle='#edd4af';g.beginPath();g.arc(x+Math.sin(t*.09+a*8)*5,y,r,0,TAU);g.fill();}g.globalAlpha=1;label(g,'C I N E   N O C T U R N O',540,190,23,'#947d67');label(g,chapter,540,1510,27,'#a69788');}
function end(g,t){k.vineta(g,.3);k.grano(g,t,.035);}
function ray(g,a,b,color,t,phase=0,width=4,alpha=1){g.save();g.globalAlpha=alpha;line(g,[a,b],color,width*.45);const u=(t*.48+phase)%1;const tail=Math.max(0,u-.12);line(g,[[mix(a[0],b[0],tail),mix(a[1],b[1],tail)],[mix(a[0],b[0],u),mix(a[1],b[1],u)]],color,width);g.restore();}
// A faceted Earth with continuous lighting and an exaggerated atmospheric shell.
function earth(g,t,x,y,r){
 glow(g,x-100,y-50,r*1.2,'72,133,220',.3);
 const base=g.createRadialGradient(x-r*.4,y-r*.45,0,x,y,r);base.addColorStop(0,'#346278');base.addColorStop(.55,'#153a52');base.addColorStop(1,'#030a10');g.fillStyle=base;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();
 g.save();g.beginPath();g.arc(x,y,r-.6,0,TAU);g.clip();
 const rot=.1+t*.045, N=50,M=28,faces=[];
 for(let j=0;j<M;j++)for(let i=0;i<N;i++){
  const lat=-Math.PI/2+(j+.5)*Math.PI/M,lon=(i+.5)*TAU/N;
  const zz=Math.cos(lat)*Math.cos(lon+rot);if(zz<-.05)continue;
  const xx=Math.cos(lat)*Math.sin(lon+rot),yy=Math.sin(lat);
  const land=Math.sin(lon*2.6+Math.sin(lat*4)*1.7)+Math.cos(lon*4-lat*3)*.56+Math.sin(lat*7+lon)>.63;
  const lit=.15+.85*Math.max(0,-xx*.55-yy*.55+zz*.62);
  const c=land?[85,111,88]:[28,74,107];
  const ps=[[i,j],[i+1,j],[i+1,j+1],[i,j+1]].map(([a,b])=>{const la=-Math.PI/2+b*Math.PI/M,lo=a*TAU/N+rot;return [x+r*Math.cos(la)*Math.sin(lo),y+r*Math.sin(la)];});
  faces.push({z:zz,ps,c:`rgb(${c.map(n=>Math.round(n*lit)).join(',')})`});
 }
 faces.sort((a,b)=>a.z-b.z).forEach(f=>poly(g,f.ps,f.c,f.c));
 // Thin curving cloud belts, lit on the sunward side.
 for(let j=0;j<10;j++){const lat=-.9+j*.19;g.beginPath();for(let i=0;i<55;i++){let lon=-1.48+i/54*2.96;const px=x+r*Math.cos(lat+.035*Math.sin(lon*7+j+t*.06))*Math.sin(lon),py=y+r*Math.sin(lat+.035*Math.sin(lon*7+j+t*.06));i?g.lineTo(px,py):g.moveTo(px,py);}g.strokeStyle=`rgba(211,219,211,${j%3===0?.15:.07})`;g.lineWidth=r*.013;g.stroke();}g.restore();
 for(let i=10;i>0;i--){g.strokeStyle=`rgba(96,163,246,${.025+(10-i)*.006})`;g.lineWidth=i*2.3;g.beginPath();g.arc(x,y,r+3,0,TAU);g.stroke();}
 g.strokeStyle='rgba(196,222,250,.65)';g.lineWidth=2;g.beginPath();g.arc(x,y,r+3,Math.PI*.95,Math.PI*1.8);g.stroke();
}
export function orbit(g,t){
 start(g,t,'01  /  UNA PREGUNTA COTIDIANA');
 const pull=k.entra(k.tramo(t,0,2.1)),r=mix(1050,355,pull),y=mix(1660,1000,pull);
 earth(g,t,540,y,r);
 const u=smooth(t,S(2),E(2)-.5);glow(g,180,650,250,'242,166,90',u*.6);
 g.save();g.globalAlpha=u;ray(g,[130,630],[360,760],'#f5d4a0',t,0,8);ray(g,[125,670],[320,800],'#eadac3',t,.3,4);g.restore();
 label(g,'ATMÓSFERA',540,1390,25,'#91b5d1');end(g,t);
}
export function prism(g,t){
 start(g,t,'02  /  LA LUZ LLEVA LOS COLORES');
 const u=smooth(t,S(3),E(3)-.3);const zoom=1.25+.045*u;
 g.save();g.translate(540,1040);g.scale(zoom,zoom);g.translate(-540,-1040);
 // Warm pool on dark tabletop.
 glow(g,580,1140,700,'168,110,57',.16);poly(g,[[0,930],[650,650],[1080,980],[1080,1550],[0,1550]],'#191514');
 for(let i=0;i<18;i++)line(g,[[0,950+i*35],[1080,1200+i*35]],'rgba(135,103,76,.035)',2);
 const split=smooth(t,v.frase(3).t('pero')-.1,v.frase(3).t('colores'));
 const cols=['#db6c50','#e3a057','#d6bc73','#65a997','#5a99db','#8c83bf'];
 g.save();g.globalCompositeOperation='lighter';
 for(let i=0;i<6;i++){const yy=780+i*94;poly(g,[[570,1000],[630,982+i*7],[1040,yy-10],[1040,yy+34]],cols[i]+'22');ray(g,[590,1005],[1030,yy+12],cols[i],t,i*.14,6,split);}
 poly(g,[[40,900],[40,939],[522,1021],[526,995]],'rgba(255,241,213,.18)');ray(g,[40,917],[535,1008],'#fff2d4',t,0,9);g.restore();
 const A=[470,1100],B=[585,810],C=[700,1110],D=[410,1030],F=[525,740],H=[640,1040];
 poly(g,[D,F,H],'rgba(97,135,147,.17)','rgba(199,218,221,.2)');poly(g,[F,B,C,H],'rgba(193,219,224,.12)','rgba(229,237,231,.65)');poly(g,[D,A,B,F],'rgba(228,216,189,.13)','rgba(252,230,192,.8)');poly(g,[A,B,C],'rgba(101,158,182,.13)','rgba(227,240,245,.7)');
 line(g,[A,B],'#fff0d0',3);glow(g,560,1000,140,'213,228,230',.12);g.restore();
 label(g,'UN PRISMA REVELA LA MEZCLA',540,1390,25);end(g,t);
}
const mols=Array.from({length:19},()=>({x:(rng()-.5)*1600,y:(rng()-.5)*1000,z:rng()*1.5+.6,a:rng()*TAU}));
function molecule(g,x,y,r,angle,alpha=1){const dx=Math.cos(angle)*r*.72,dy=Math.sin(angle)*r*.72;g.save();g.globalAlpha=alpha;line(g,[[x-dx,y-dy],[x+dx,y+dy]],'#c3b09a',r*.55);ball(g,x-dx,y-dy,r*.75,'blue');ball(g,x+dx,y+dy,r*.75,'amber');g.restore();}
function wave(g,y,color,wavelength,t,x0=60,x1=1010,alpha=1){g.save();g.globalAlpha=alpha;const pts=[];for(let x=x0;x<=x1;x+=5)pts.push([x,y+Math.sin((x-t*130)*TAU/wavelength)*30]);line(g,pts,color,4);g.restore();}
export function air(g,t){
 start(g,t,'03  /  DENTRO DEL AIRE');
 const local=t-S(4),compare=smooth(t,S(6),E(6)),scatter=smooth(t,v.frase(5).t('dispersan'),E(5));
 const z=mix(.72,1,smooth(t,S(4),E(4)));
 for(const q of mols){const x=540+q.x/q.z*z,y=1020+q.y/q.z*z;if(x<-100||x>1180||y<560||y>1470)continue;molecule(g,x,y,24/q.z,q.a+local*.035,.15+.15/q.z);}
 const mainY=mix(1020,850,compare);molecule(g,550,mainY,mix(155,110,compare),-.65+Math.sin(local*.1)*.12);
 glow(g,490,mainY-60,260,'242,166,90',.16);
 const arrive=smooth(t,S(4)+.4,E(4));g.save();g.globalAlpha=arrive*(1-compare);ray(g,[0,mainY],[485,mainY],'#e9e5dc',t,0,7);
 for(let i=0;i<8;i++){let a=(i/8)*TAU;ray(g,[550,mainY],[550+440*Math.cos(a),mainY+310*Math.sin(a)],'#7dadd8',t,i*.12,4,scatter*.8);}g.restore();
 if(compare>0){
  wave(g,850,'#73aff0',90,t,55,495,compare);wave(g,1170,'#e18b69',230,t,55,1000,compare);
  molecule(g,550,1170,85,-.3,.8*compare);
  const blue=smooth(t,v.frase(7).t('dispersa')-.7,E(7)-.2);
  for(let i=0;i<5;i++){let a=-1.15+i*.52;ray(g,[565,850],[565+430*Math.cos(a),850+300*Math.sin(a)],'#6da6df',t,i*.16,5,compare*(.18+.82*blue));}
  label(g,'ONDA CORTA',250,750,24,'#87b2de');label(g,'ONDA LARGA',250,1305,24,'#dba088');
 }
 label(g,'REPRESENTACIÓN AMPLIADA · NO A ESCALA',540,1410,21,'#8e847b');end(g,t);
}
// An isometric terrain maquette under a luminous, transparent atmosphere.
const hills=[];
const height=(x,z)=>Math.max(0,180*Math.exp(-((x+230)**2+(z-170)**2)/65000)+260*Math.exp(-((x-170)**2+(z-280)**2)/56000)+85*Math.exp(-((x-330)**2+(z+110)**2)/26000)-20);
const proj=(x,y,z)=>[540+x*.83+z*.26,1180+z*.36-x*.11-y];
for(let z=-420;z<440;z+=65)for(let x=-430;x<430;x+=65){const p=[[x,z],[x+65,z],[x+65,z+65],[x,z+65]];const av=p.reduce((s,[a,b])=>s+height(a,b),0)/4;hills.push({x,z,av,points:p.map(([a,b])=>proj(a,height(a,b),b)),tone:rng()});}
hills.sort((a,b)=>(a.z-a.x*.1)-(b.z-b.x*.1));
function terrain(g,t,warm,scale=1){g.save();g.translate(540,1080);g.scale(scale,scale);g.translate(-540,-1080);
 const corners=[proj(-430,0,-420),proj(480,0,-420),proj(480,0,490),proj(-430,0,490)];
 poly(g,[corners[1],corners[2],[corners[2][0],corners[2][1]+48],[corners[1][0],corners[1][1]+48]],'#161c1b');poly(g,[corners[2],corners[3],[corners[3][0],corners[3][1]+48],[corners[2][0],corners[2][1]+48]],'#202321');
 for(const f of hills){const c=f.av>135?[59,77,76]:[31,53,48];const l=.7+f.tone*.4;const col=c.map((n,i)=>Math.round((n+(i===0?warm*32:i===1?warm*6:-warm*6))*l));poly(g,f.points,`rgb(${col})`);}
 // A river winds through the foreground; warm sky reflects in the water.
 const river=[];for(let i=0;i<=55;i++){const z=-390+i*14;river.push(proj(-180+Math.sin(z/150)*85,3,z));}line(g,river,k.mezColor('#345c6f','#906d42',warm),13);line(g,river,'rgba(224,214,188,.12)',3);
 // Small trees are part of the landscape, with volume and amber rim lighting.
 for(let i=0;i<15;i++){const x=-350+(i*131)%730,z=-220+(i*97)%500;const [px,py]=proj(x,height(x,z),z);line(g,[[px,py],[px,py-43]],'#5b4936',5);poly(g,[[px,py-79],[px-20,py-29],[px+20,py-29]],'#28483f');poly(g,[[px,py-79],[px,py-29],[px+20,py-29]],warm>.4?'#5b6348':'#395c50');}
 // A tiny human observer, seen from behind, looking upward.
 const [ox,oy]=proj(120,1,-235);g.fillStyle='#c1a58a';g.beginPath();g.arc(ox,oy-53,11,0,TAU);g.fill();poly(g,[[ox-14,oy-40],[ox+13,oy-40],[ox+18,oy-7],[ox-18,oy-7]],'#aa4938');line(g,[[ox-8,oy-8],[ox-9,oy+15]],'#b7ad9c',7);line(g,[[ox+8,oy-8],[ox+9,oy+15]],'#b7ad9c',7);
 g.restore();return [ox,oy-50];}
export function landscape(g,t,opening=false){
 const dayStart=opening?0:S(8);const dusk=opening?0:smooth(t,S(9),E(10));const recap=opening?0:smooth(t,S(11),E(11));const warm=dusk*(1-recap);const settle=opening?0:smooth(t,S(12),E(12)-.3);
 start(g,t,opening?'01  /  UNA PREGUNTA COTIDIANA':warm>.5?'04  /  EL MISMO AIRE, OTRA LUZ':'04  /  LA LUZ QUE REPARTE EL AIRE');
 const cam=opening?mix(1.6,1,k.entra(k.tramo(t,0,2))):mix(1,.94,settle);
 g.save();g.translate(540,1050);g.scale(cam,cam);g.translate(-540,-1050);
 const dome=g.createRadialGradient(540,1110,40,540,1050,580);dome.addColorStop(0,`rgba(${k.mezRgb('49,102,170','196,112,54',warm)},.19)`);dome.addColorStop(.75,`rgba(${k.mezRgb('66,126,199','222,144,65',warm)},.32)`);dome.addColorStop(1,'rgba(20,30,40,0)');g.fillStyle=dome;g.beginPath();g.ellipse(540,1090,490,520,0,Math.PI,TAU);g.lineTo(1030,1170);g.ellipse(540,1170,490,165,0,0,Math.PI);g.closePath();g.fill();
 g.strokeStyle=`rgba(${k.mezRgb('124,166,209','230,175,116',warm)},.4)`;g.lineWidth=2;g.beginPath();g.ellipse(540,1090,490,520,0,Math.PI,TAU);g.stroke();
 const sunX=mix(830,45,dusk)*(1-recap)+830*recap,sunY=mix(680,1010,dusk)*(1-recap)+680*recap;
 glow(g,sunX,sunY,180,'242,166,90',.55);ball(g,sunX,sunY,29,'amber');
 const observer=terrain(g,t,warm);
 const blue=1-warm*.8;
 for(let i=0;i<7;i++){const a=Math.PI+.35+i*.39,pt=[540+470*Math.cos(a),1090+480*Math.sin(a)];ray(g,pt,observer,'#79a9d9',t,i*.17,3,blue*.42);}
 if(dusk>.03){ray(g,[sunX-30,sunY+15],observer,k.mezColor('#e3d6b2','#e69a59',warm),t,0,5,dusk);for(let i=0;i<3;i++){const x=mix(sunX,observer[0],.2+i*.18),y=mix(sunY,observer[1],.2+i*.18);ray(g,[x,y],[x-60,y-200],'#6ca1d3',t,i*.27,3,warm*.65);}}
 g.restore();if(!opening)label(g,warm<.3?'LUZ SOLAR DISPERSADA':'MÁS AIRE EN EL CAMINO',540,1410,25,warm<.3?'#92b1cb':'#dbb081');end(g,t);
}
