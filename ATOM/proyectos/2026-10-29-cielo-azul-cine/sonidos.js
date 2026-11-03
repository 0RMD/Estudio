import {v} from '#voz';
const fx=[];
for(let i=1;i<=12;i++){const f=v.frase(i);fx.push({sonido:'aire',t:f.inicio+.18,ancla:'empieza',db:-19,vel:.65,corta:f.fin,que:'recorrido de la luz o cámara'});}
fx.push({sonido:'cristal',t:v.frase(3).t('colores'),db:-21,corta:v.frase(3).fin,que:'se abre el espectro del prisma'});
fx.push({sonido:'toque',t:v.frase(5).t('dispersan'),db:-19,que:'el pulso llega a la molécula'});
export default fx;