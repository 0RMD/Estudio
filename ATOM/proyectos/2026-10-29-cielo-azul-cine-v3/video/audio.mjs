import {readFileSync,writeFileSync} from 'node:fs';
import {escribirWav,leerAudio} from 'file:///C:/ATOM/motor/lib/comun.mjs';
import {beat,major,STEP,cues} from './beat.js';
const root='C:/ATOM/proyectos/2026-10-29-cielo-azul-cine-v2',SR=48000,TAU=Math.PI*2;
const timing=JSON.parse(readFileSync(root+'/voz/tiempos.json','utf8')),voice=leerAudio(root+'/voz/voz.wav',SR),a=new Float32Array(voice.length);
let seed=418;const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/2147483648-1;};
const chords=[[164.81,196,246.94],[130.81,164.81,196],[196,246.94,293.66],[146.83,185,220]];
// Original harmonic bed, quietly sidechained to speech. No stock music or voice regeneration.
for(let i=0;i<a.length;i++){const t=i/SR,b=t/STEP,c=Math.floor(b/8)%4,p=chords[c],old=chords[(c+3)%4],blend=Math.min(1,(t%(8*STEP))/.24),env=Math.min(1,t/1.2)*Math.min(1,(timing.duracion-t)/.8);let tone=0;for(let j=0;j<3;j++){const phase=Math.sin(t*.31+j)*.12;tone+=(Math.sin(2*Math.PI*p[j]*t+phase)*blend+Math.sin(2*Math.PI*old[j]*t+phase)*(1-blend))*.0066;}const pulse=.75+.25*Math.cos(b*Math.PI);a[i]=tone*env*pulse;}
const eventLog=[];
for(let b=0;beat(b)<timing.duracion-.3;b++){
 const t0=beat(b),start=Math.round(t0*SR),strong=major.includes(b),down=b%4===0;
 // Low cinematic kick and soft clock impulse share the exact frame timestamp.
 let ph=0;for(let j=0;j<SR*.42&&start+j<a.length;j++){const t=j/SR;ph+=2*Math.PI*(47+66*Math.exp(-t*35))/SR;const attack=Math.min(1,t/.004),tail=Math.exp(-t*12);a[start+j]+=Math.sin(ph)*attack*tail*(strong?.10:down?.06:.029);}
 const note=chords[Math.floor(b/8)%4][b%3]*2;
 for(let j=0;j<SR*.7&&start+j<a.length;j++){const t=j/SR,env=(1-Math.exp(-t*500))*Math.exp(-t*6.5);a[start+j]+=(Math.sin(TAU*note*t)+.18*Math.sin(TAU*note*2.002*t))*env*(strong?.030:.018);}
 // Quiet alternate beat texture. The strongest accents coincide with cue keyframes.
 let low=0;for(let j=0;j<SR*.07&&start+j<a.length;j++){const t=j/SR;const n=noise();low=.65*low+.35*n;a[start+j]+=(n-low)*Math.exp(-t*75)*Math.min(1,t/.002)*(down?.009:.004);}
 if(strong){const rise=.45;let lp=0;for(let j=0;j<SR*rise;j++){const pos=start-Math.round(rise*SR)+j;if(pos<0||pos>=a.length)continue;const f=j/(SR*rise);lp=.93*lp+.07*noise();a[pos]+=lp*.075*Math.pow(f,2)*Math.sin(Math.PI*f);}}
 eventLog.push({beat:b,second:t0,frame60:Math.round(t0*60),audioSample:start,major:strong});
}
// Smooth voice ducking with 10 ms energy, 80 ms attack/release.
let rms=0,duck=1;for(let i=0;i<a.length;i++){rms=.999*rms+.001*voice[i]*voice[i];const target=rms>.0003?.62:1;duck+=(target-duck)*.00025;a[i]*=duck;}
let peak=0,sum=0;for(const x of a){peak=Math.max(peak,Math.abs(x));sum+=x*x;}
escribirWav(root+'/sonidos/efectos.wav',a,SR);
writeFileSync(root+'/beat-map.json',JSON.stringify({bpm:100,secondsPerBeat:STEP,cues,events:eventLog,peakDb:20*Math.log10(peak),rmsDb:10*Math.log10(sum/a.length)},null,2));
console.log(JSON.stringify({duration:timing.duracion,bpm:100,events:eventLog.length,major:major.length,peakDb:20*Math.log10(peak),rmsDb:10*Math.log10(sum/a.length)}));

