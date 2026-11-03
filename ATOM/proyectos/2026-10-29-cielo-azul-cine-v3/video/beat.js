export const BPM=100, STEP=60/BPM;
export const beat=n=>n*STEP;
export const cues={reveal:2,sun:9,prism:11,spectrum:16,air:19,scatter:26,compare:32,blue:40,sky:44,sunset:50,orange:64,return:67,final:74};
export const major=Object.values(cues);
export const clamp=x=>Math.max(0,Math.min(1,x));
export const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+x*6));};
export const ramp=(t,a,b)=>ease((t-beat(a))/(beat(b)-beat(a)));
export const mix=(a,b,u)=>a+(b-a)*u;
export function track(t,keys){let i=0;while(i<keys.length-2&&t>beat(keys[i+1][0]))i++;const [a,x]=keys[i],[b,y]=keys[i+1];return mix(x,y,ramp(t,a,b));}
export const hit=(t,b,w=.17)=>Math.exp(-(((t-beat(b))/w)**2));
export function pulse(t){const b=Math.floor(t/STEP),u=t-b*STEP;return Math.exp(-u*9)*(b%4===0?1:.45);}
