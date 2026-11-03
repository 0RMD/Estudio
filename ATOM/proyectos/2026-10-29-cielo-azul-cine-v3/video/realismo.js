import * as k from '#kit';
import {createCanvas,loadImage} from '@napi-rs/canvas';
const TAU=Math.PI*2, mix=(a,b,t)=>a+(b-a)*t, clamp=(v)=>Math.max(0,Math.min(1,v));
const RGB=(a,b,t)=>a.map((v,i)=>mix(v,b[i],t));
const rgba=(c,a=1)=>`rgba(${c.map(v=>Math.round(Math.max(0,Math.min(255,v)))).join(',')},${clamp(a)})`;
const project=(c,p)=>k.proyecta(c,p);
function line(g,ps,c,w=2){if(ps.some(p=>!p))return;g.beginPath();ps.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.lineCap='round';g.lineWidth=w;g.strokeStyle=c;g.stroke();}
function poly(g,ps,fill){if(ps.some(p=>!p))return;g.beginPath();ps.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.fillStyle=fill;g.fill();}
function noise(x,z){const ix=Math.floor(x),iz=Math.floor(z);let u=x-ix,v=z-iz;u=u*u*(3-2*u);v=v*v*(3-2*v);const h=(a,b)=>{let n=Math.imul(a,374761393)^Math.imul(b,668265263);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;};return mix(mix(h(ix,iz),h(ix+1,iz),u),mix(h(ix,iz+1),h(ix+1,iz+1),u),v);}
function fbm(x,z){return .55*noise(x,z)+.27*noise(x*2.07+17,z*2.07+41)+.13*noise(x*4.13+80,z*4.13+5)+.05*noise(x*8.29,z*8.29);}
// Smooth, physically shaded molecular models. Atlas is immutable and reused per frame.
const atomTextures=[];
for(const base of [[57,104,147],[137,69,63]]){
 const n=384,c=createCanvas(n,n),g=c.getContext('2d'),im=g.createImageData(n,n);
 const light=k.uni([-.48,.62,.83]),half=k.uni(k.sum(light,[0,0,1]));
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){
  const nx=(x+.5-n/2)/(n/2),ny=-(y+.5-n/2)/(n/2),d=nx*nx+ny*ny;if(d>=1)continue;
  const nz=Math.sqrt(1-d),normal=[nx,ny,nz],diff=Math.max(0,k.pto(normal,light)),spec=Math.pow(Math.max(0,k.pto(normal,half)),34),broad=Math.pow(Math.max(0,k.pto(normal,half)),9),rim=Math.pow(1-nz,4),warm=Math.pow(Math.max(0,nx*.8-ny*.1+nz*.22),8);
  const i=(y*n+x)*4;for(let j=0;j<3;j++){const sky=[25,49,76][j]*(.4+.6*(ny+1)/2);im.data[i+j]=Math.min(255,base[j]*(.14+.71*diff)+sky+spec*95+broad*18+rim*[24,73,116][j]+warm*[100,61,23][j]);}im.data[i+3]=255*clamp((1-d)*170);
 }
 g.putImageData(im,0,0);atomTextures.push(await loadImage(c.toBuffer('image/png')));
}
export function moleculeReal(g,cam,p,r,ang,a=1){
 const off=[Math.cos(ang)*r*.71,Math.sin(ang)*r*.71,Math.sin(ang*.7)*r*.35],pa=project(cam,k.sum(p,off)),pb=project(cam,k.res(p,off));if(!pa||!pb)return;
 const species=a<.8&&Math.sin(p[0]*.03+p[2]*.017)>.64?1:0;
 const balls=[{p:pa,r:k.F*r*.84/pa.z},{p:pb,r:k.F*r*.84/pb.z}].sort((a,b)=>b.p.z-a.p.z);
 g.save();g.globalAlpha=a;
 // Space-filling overlap and shaded contact replace the uniformly glossy beads.
 for(let i=0;i<balls.length;i++){const b=balls[i];if(b.r<.7)continue;g.drawImage(atomTextures[species],b.p.x-b.r,b.p.y-b.r,b.r*2,b.r*2);if(i===0){const other=balls[1],dx=other.p.x-b.p.x,dy=other.p.y-b.p.y,dist=Math.hypot(dx,dy)||1;const cx=b.p.x+dx/dist*b.r*.65,cy=b.p.y+dy/dist*b.r*.65;g.save();g.beginPath();g.arc(b.p.x,b.p.y,b.r,0,TAU);g.clip();const shadow=g.createRadialGradient(cx,cy,0,cx,cy,b.r*.76);shadow.addColorStop(0,'rgba(0,3,10,.43)');shadow.addColorStop(1,'rgba(0,3,10,0)');g.fillStyle=shadow;g.fillRect(cx-b.r,cy-b.r,b.r*2,b.r*2);g.restore();}}
 g.restore();
}
const riverX=z=>-190+Math.sin(z/150)*80;
function height(x,z){
 const warp=(fbm(x*.009+10,z*.009)-.5)*70;
 const base=Math.max(0,280*Math.exp(-((x+230+warp*.3)**2+(z+140)**2)/47000)+365*Math.exp(-((x-130)**2+(z+230+warp*.5)**2)/40000)+165*Math.exp(-((x-350)**2+(z-60)**2)/29000)-14);
 const ridge=(1-Math.abs(noise(x*.027,z*.027)*2-1));
 const rough=(fbm(x*.024,z*.024)-.5)*55+ridge*19;
 const valley=Math.exp(-(((x-riverX(z))/33)**2));
 const edge=clamp((510-Math.max(Math.abs(x),Math.abs(z)))/65);
 return Math.max(0,(base+rough*(.25+base/360)+7)*(1-valley*.71))*Math.pow(edge,.4);
}
const vertices=[],triangles=[],grid=56,span=990,origin=-480;
function vertex(x,z){const y=height(x,z),dx=(height(x+3,z)-height(x-3,z))/6,dz=(height(x,z+3)-height(x,z-3))/6,n=k.uni([-dx,1,-dz]),slope=1-n[1],rock=clamp((slope-.2)*2.5+(y-140)/160),fine=fbm(x*.09+3,z*.09+9);
 const grass=RGB([34,64,47],[61,83,54],fine),stone=RGB([78,83,83],[151,144,129],fine);let base=RGB(grass,stone,rock);
 const snow=clamp((y-318)/80)*clamp(.7-slope)*clamp((noise(x*.045,z*.045)-.25)*2);base=RGB(base,[177,189,192],snow*.85);
 // Horizon shadows sampled once, then smoothly interpolated with the sun's motion.
 const shadows=[];for(const sun of [[300,720,-280],[-800,100,-280]]){const dir=k.uni(k.res(sun,[x,y,z]));let sh=1;if(dir[1]>.01){for(let d=15;d<440;d+=24){if(height(x+dir[0]*d,z+dir[2]*d)>y+dir[1]*d+3){sh=.36;break;}}}shadows.push(sh);}
 return {p:[x,y,z],n,base,shadows,slope};}
for(let j=0;j<=grid;j++)for(let i=0;i<=grid;i++)vertices.push(vertex(origin+i*span/grid,origin+j*span/grid));
for(let j=0;j<grid;j++)for(let i=0;i<grid;i++){const a=j*(grid+1)+i,b=a+1,c=a+grid+2,d=a+grid+1;triangles.push([a,b,c],[a,c,d]);}
function surfaceHeight(x,z){const sx=(x-origin)/span*grid,sz=(z-origin)/span*grid,i=Math.max(0,Math.min(grid-1,Math.floor(sx))),j=Math.max(0,Math.min(grid-1,Math.floor(sz))),u=clamp(sx-i),v=clamp(sz-j),a=j*(grid+1)+i;const A=vertices[a].p[1],B=vertices[a+1].p[1],C=vertices[a+grid+2].p[1],D=vertices[a+grid+1].p[1];return v<=u?A*(1-u)+B*(u-v)+C*v:A*(1-v)+C*u+D*(v-u);}
// Conifer atlas: layered radial branches and thousands of fine needles, with cool and warm lighting.
const treeAtlas=[];
for(let variant=0;variant<4;variant++){
 const pair=[];
 for(const warm of [0,1]){
  const c=createCanvas(256,512),g=c.getContext('2d'),rng=k.azar(510+variant*61),branches=[];
  const trunk=g.createLinearGradient(121,0,139,0);trunk.addColorStop(0,'#211d19');trunk.addColorStop(.35,warm?'#8b6f43':'#635d4a');trunk.addColorStop(.7,'#463b2e');trunk.addColorStop(1,'#201c19');
  g.fillStyle=trunk;g.beginPath();g.moveTo(124,495);g.lineTo(128,24);g.lineTo(132,495);g.fill();
  for(let layer=0;layer<23;layer++){const u=layer/23,y=38+u*411,width=(.08+u*.92)*102*(.82+rng()*.18);for(let arm=0;arm<9;arm++){const angle=arm*TAU/9+layer*.67,depth=Math.cos(angle),dx=Math.sin(angle)*width*(.8+rng()*.2);branches.push({x:128,y,dx,depth,dy:17+u*24+rng()*13,w:width,u,seed:rng()});}}
  branches.sort((a,b)=>a.depth-b.depth);
  for(const b of branches){const ex=b.x+b.dx,ey=b.y+b.dy;g.strokeStyle=warm?'#655738':'#343f32';g.lineWidth=.6+b.u*1.3;g.beginPath();g.moveTo(b.x,b.y);g.quadraticCurveTo(b.x+b.dx*.5,b.y+b.dy*.9,ex,ey);g.stroke();
   const count=10+Math.floor(b.u*17);for(let n=0;n<count;n++){const u=n/count,xx=mix(b.x,ex,u),yy=mix(b.y,ey,u)+Math.sin(u*Math.PI)*4;const size=(3+11*b.u)*(1-u*.45)*(0.8+rng()*.4);const light=clamp(.25+.35*b.depth+(b.dx<0?.24:0)+rng()*.2);
    const col=RGB(warm?[25,43,27]:[17,39,31],warm?[106,112,63]:[69,103,76],light);g.fillStyle=rgba(col,.9);g.beginPath();g.ellipse(xx,yy-size*.16,size*.57,size*.32,b.dx>0?-.25:.25,0,TAU);g.fill();g.strokeStyle=rgba(col,.95);g.lineWidth=.65+(1-u)*.4;
    for(let q=0;q<4;q++){const theta=-Math.PI/2+(q-1.5)*.55+(b.dx>0?.35:-.35);g.beginPath();g.moveTo(xx,yy);g.lineTo(xx+Math.cos(theta)*size,yy+Math.sin(theta)*size);g.stroke();}
   }
  }
  pair.push(await loadImage(c.toBuffer('image/png')));
 }
 treeAtlas.push(pair);
}
const rngTrees=k.azar(980),trees=[];
for(let i=0;i<150;i++){const x=-440+rngTrees()*880,z=-390+rngTrees()*850,y=height(x,z);if(y>245||Math.abs(x-riverX(z))<30)continue;const n=vertex(x,z);if(n.slope>.53)continue;trees.push({x,z,y,h:58+rngTrees()*75,variant:i%4,width:.7+rngTrees()*.35});}
// Selected foreground trees make the branch structure readable on a phone.
for(const [x,z,h] of [[-320,320,145],[280,330,135],[350,190,122],[-60,390,117]])trees.push({x,z,y:height(x,z),h,variant:Math.abs(x)%4,width:.9});
function drawTree(g,cam,tr,warm){const bottom=project(cam,[tr.x,tr.y,tr.z]),top=project(cam,[tr.x,tr.y+tr.h,tr.z]);if(!bottom||!top)return;const h=Math.hypot(top.x-bottom.x,top.y-bottom.y),width=h*.59*tr.width;const angle=Math.atan2(top.x-bottom.x,-(top.y-bottom.y));const atlas=treeAtlas[tr.variant];g.save();g.translate(bottom.x,bottom.y);g.rotate(angle);g.globalAlpha=1;g.drawImage(atlas[0],0,0,256,495,-width/2,-h,width,h);if(warm>.001){g.globalAlpha=warm;g.drawImage(atlas[1],0,0,256,495,-width/2,-h,width,h);}g.restore();}
function drawObserver(g,cam,obs){const q=p=>project(cam,k.sum(obs,p));const head=q([0,62,0]),r=k.F*8/head.z;g.fillStyle='#c2a18a';g.beginPath();g.arc(head.x,head.y,r,0,TAU);g.fill();line(g,[q([0,49,0]),q([0,24,0])],'#a84c3b',r*2.1);line(g,[q([-7,46,0]),q([-13,26,0])],'#87402f',r*.55);line(g,[q([7,46,0]),q([13,26,0])],'#bf6750',r*.55);for(const x of [-6,6])line(g,[q([x,23,0]),q([x,0,0])],'#929387',r*.6);return head;}
export function terrainReal(g,cam,warm){
 const obs=[120,height(120,240),240],sun=[mix(300,-800,warm),mix(720,100,warm),-280];
 const projected=vertices.map(v=>project(cam,v.p));const colors=vertices.map(v=>{const light=k.uni(k.res(sun,v.p)),diff=Math.max(0,k.pto(v.n,light)),shadow=mix(v.shadows[0],v.shadows[1],warm),ambient=.4+.08*v.n[1];const tinted=RGB([.72,.92,1.05],[1.28,.95,.63],warm);return v.base.map((c,i)=>c*(ambient+diff*.88*shadow)*tinted[i]);});
 const faces=triangles.map(ix=>({ix,z:(projected[ix[0]].z+projected[ix[1]].z+projected[ix[2]].z)/3}));
 // Geological side wall, built from terrain's real perimeter, below the surface.
 const perimeter=[];for(let i=0;i<=grid;i++)perimeter.push(i);for(let j=1;j<=grid;j++)perimeter.push(j*(grid+1)+grid);for(let i=grid-1;i>=0;i--)perimeter.push(grid*(grid+1)+i);for(let j=grid-1;j>0;j--)perimeter.push(j*(grid+1));
 for(let i=0;i<perimeter.length;i++){const a=vertices[perimeter[i]].p,b=vertices[perimeter[(i+1)%perimeter.length]].p;poly(g,[project(cam,a),project(cam,b),project(cam,[b[0],-48,b[2]]),project(cam,[a[0],-48,a[2]])],'#1b2628');}
 // Depth-sorted vegetation and observer are interleaved with terrain to avoid drawing through ridges.
 const objects=faces.map(f=>({z:f.z,f}));for(const tr of trees)objects.push({z:project(cam,[tr.x,tr.y+tr.h*.28,tr.z]).z,tr});objects.push({z:project(cam,obs).z,observer:true});
 // River lies in a carved valley; narrow reflective ribbons follow the ground.
 for(let z=-420;z<470;z+=10){const x=riverX(z),xx=riverX(z+10);const ps=[[x-6,surfaceHeight(x-6,z)+3,z],[x+6,surfaceHeight(x+6,z)+3,z],[xx+6,surfaceHeight(xx+6,z+10)+3,z+10],[xx-6,surfaceHeight(xx-6,z+10)+3,z+10]].map(p=>project(cam,p));objects.push({z:ps.reduce((s,p)=>s+p.z,0)/4-15,river:ps});}
 objects.sort((a,b)=>b.z-a.z);
 for(const o of objects){if(o.f){const ix=o.f.ix,pp=ix.map(i=>projected[i]),cc=ix.map(i=>colors[i]);const brightness=cc.map(c=>c[0]+c[1]+c[2]);const a=brightness.indexOf(Math.max(...brightness)),b=brightness.indexOf(Math.min(...brightness));let fill;if(a!==b&&Math.hypot(pp[a].x-pp[b].x,pp[a].y-pp[b].y)>1){fill=g.createLinearGradient(pp[a].x,pp[a].y,pp[b].x,pp[b].y);fill.addColorStop(0,rgba(cc[a]));fill.addColorStop(1,rgba(cc[b]));}else fill=rgba(cc[0]);poly(g,pp,fill);g.strokeStyle=rgba(cc.map((_,i)=>(cc[0][i]+cc[1][i]+cc[2][i])/3));g.lineWidth=.42;g.stroke();}
  else if(o.tr)drawTree(g,cam,o.tr,warm);
  else if(o.observer)drawObserver(g,cam,obs);
  else if(o.river){poly(g,o.river,rgba(RGB([51,107,131],[151,137,93],warm),.9));line(g,[o.river[0],o.river[3]],rgba(RGB([132,185,205],[232,194,134],warm),.35),.8);}
 }
 return {world:k.sum(obs,[0,60,0]),screen:project(cam,k.sum(obs,[0,62,0]))};
}
