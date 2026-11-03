# Plan: Por qué el cielo es azul

**Estilo:** Cine Nocturno (`packs/estilos.md`, `ejemplo-estilos/cine-nocturno/estilo.md`).

Lo que cuenta: El cielo no es azul porque el aire tenga color; la luz blanca del Sol lleva todos los colores en ondas de distinto tamaño, y al chocar con el aire el azul rebota 9 veces más en todas direcciones mientras el rojo pasa de largo.

## Los sitios

1. **La carretera nocturna y la frontera del espacio (el hook):**
   - **Apertura A (`video/planos/01-cielo.js`):** Desde el fotograma 0, la cámara viaja sobre el coche rojo (`#C9372C`) por la carretera entre pinos mientras una bóveda azul gigante se abre en el cielo; en «aire que respiras no tiene color», se abre en rayos X una cápsula transparente mostrando el aire sin color (`0% color`, `?`). En «sales al espacio», la cámara sube disparada atravesando la atmósfera hasta el espacio exterior: el Sol brilla de lleno, pero todo el cielo se apaga a negro. En «¿de dónde sale ese azul?», la cámara baja hacia el borde de la atmósfera que vuelve a encenderse de azul.
   - **Apertura B (`video/aperturas/01-cupula.js`):** Desde el fotograma 0, un potente haz de luz cae sobre una gran cúpula de cristal junto a un telescopio rojo (`#C9372C`) en el observatorio nocturno e inunda toda la cúpula de azul; en «aire que respiras no tiene color», la cúpula pasa a modo rayos X enseñando el aire transparente (`0% color`, `?`). En «sales al espacio», la cúpula de cristal se levanta y, aunque el Sol brilla de lleno arriba, sin aire todo el fondo se apaga a negro. En «¿de dónde sale ese azul?», la cúpula baja y vuelve a encenderse de azul.
2. **El escritorio de cuero de 1871 (`02-estudio.js`):**
   - Mesa oscura de cuero y madera iluminada por charcos de luz cálida (`k.luzCalida`).
   - En «En 1871...»: aparece el rótulo `año / 1871` y entra el documento crema (*Philosophical Magazine, 1871 — Lord Rayleigh*) con subrayado naranja en «misterio».
   - Sin cortar, la cámara se desliza a la derecha por la misma mesa hacia un prisma 3D de cristal: un haz blanco entra y en «cristal se abre en todos los colores» despliega el abanico del arcoíris.
   - La cámara avanza siguiendo las dos ondas sobre la mesa: la ola roja (`#C9372C`, `700 nm`, larga y suave) y la ola azul (`450 nm`, corta y rápida).
3. **El aire por dentro en 3D (`03-rebote.js`):**
   - En el aire nocturno con moléculas de gas iluminadas: las olas rojas largas serpentean esquivando las moléculas y pasan de largo.
   - En «Pero las azules...»: las olas cortas chocan de lleno contra las moléculas y estallan rebotando en todas direcciones con el rótulo `rebota / 9x`, tiñendo todo el aire de azul.
4. **La linterna y el vaso en la mesa (`04-linterna.js`):**
   - Sobre la mesa oscura: una linterna roja (`#C9372C`) apunta su haz blanco a un vaso de agua; caen dos gotas de leche, se abren en nube y el vaso entero atrapa y reparte la luz azul.
5. **El horizonte al atardecer y el cielo entero (`05-atardecer.js`):**
   - Vista lateral de la atmósfera y la carretera: al atardecer el Sol baja al horizonte (`10x aire`), su luz cruza una capa larguísima de aire, todo el azul se pierde rebotando por el camino y al coche rojo solo le llega el haz rojo y ámbar.
   - En el remate y el cierre, la cámara se eleva sobre la Tierra y la carretera viendo cómo millones de rebotes de la luz del Sol encienden el cielo azul, quedando en reposo final.

## Frase a frase

| # | Frase (clave) | Lo que se ve, de su primera palabra a la última | Lo fuerte, en | Cámara | A la siguiente |
|---|---|---|---|---|---|
| 1 | ¿Por qué el cielo se ve **azul**, si el aire que respiras no tiene color? | Fotograma 0: la bóveda celeste se inunda de azul sobre el coche rojo (o el haz enciende la cúpula en la apertura B). En «aire que respiras», una cápsula en modo rayos X muestra el aire transparente con `0% color` y `?`. | «azul», «color» | viaja y enfoca el aire en rayos X | sigue |
| 2 | Si sales al espacio, con el mismo Sol brillando, todo alrededor se ve **negro**. | La cámara sube disparada fuera de la atmósfera (o se levanta la cúpula): el Sol brilla cálido a un lado, pero todo el azul se apaga de golpe a negro absoluto. | «espacio», «negro» | sube al espacio | sigue |
| 3 | Entonces, ¿de **dónde** sale ese azul? | La cámara baja hacia la fina capa de aire de la Tierra; al tocarla, un pulso azul recorre toda la atmósfera bajo el icono `?` y frena. | «dónde», «azul» | baja y reposa | **corte en «En»** |
| 4 | En 1871, el físico Lord Rayleigh resolvió el **misterio**. | Mesa de cuero bajo luz cálida: rótulo `1871` y hoja crema del estudio de Lord Rayleigh; una línea naranja subraya el título en «misterio». | «1871», «misterio» | cenital en diagonal | sigue (misma mesa) |
| 5 | La luz del Sol parece blanca, pero al cruzar un cristal se abre en todos los **colores**. | La cámara se desliza por la mesa hacia un prisma de cristal: entra un rayo blanco y al cruzar el prisma se abre en un abanico de rayos de colores. | «cristal», «colores» | se desliza a la derecha | sigue (misma mesa) |
| 6 | Cada color viaja haciendo **olas**: el rojo en olas largas y suaves, y el azul en olas cortas y rápidas. | Del prisma salen dos pistas sobre la mesa: arriba la ola roja (`#C9372C`, `700 nm`) larga y suave; abajo la ola azul (`450 nm`) corta y rápida. | «olas», «rojo», «azul» | avanza con las olas | **corte en «Al»** |
| 7 | Al entrar en el aire, las olas rojas son tan largas que **esquivan** los gases y pasan de largo. | En el aire 3D con moléculas flotando: las ondas rojas largas pasan por encima y por debajo de las moléculas sin chocar. | «esquivan», «largo» | viaja con la ola roja | sigue (mismo aire) |
| 8 | Pero las azules, al ser tan pequeñas, chocan y rebotan **nueve** veces más por todo el cielo. | Las olas azules cortas chocan contra las moléculas y rebotan en cadena en todas direcciones con el rótulo `rebota / 9x`, encendiendo todo el cielo. | «chocan», «nueve» | se aleja viendo el rebote | **corte en «Compruébalo»** |
| 9 | Compruébalo con una **linterna** y un vaso de agua con dos gotas de leche: el agua atrapa el azul y lo reparte. | En la mesa oscura: una linterna roja (`#C9372C`) ilumina un vaso de agua; caen dos gotas blancas, se abren y todo el vaso brilla en azul. | «linterna», «gotas», «azul» | tres cuartos hacia el vaso | **corte en «Por»** |
| 10 | Por eso al **atardecer**, como la luz cruza mucho más aire, el azul se pierde y solo llega el rojo. | Atmósfera de perfil: el Sol baja al horizonte (`10x aire`), el azul rebota y escapa por el camino y al final solo llega el haz rojo al horizonte. | «atardecer», «pierde», «rojo» | sigue al rayo hasta el horizonte | sigue |
| 11 | Así que el aire no tiene color: lo que ves arriba es luz del Sol **rebotando** sin parar. | La cámara sube sobre la carretera y los pinos: los rayos solares entran al aire transparente y millones de rebotes azules encienden la bóveda del cielo. | «rebotando» | sube y abre | sigue |
| 12 | Envíaselo a ese **amigo** que mira el cielo todos los días y no sabe por qué es azul. | La cámara se eleva hasta ver la curva de la Tierra con su cielo azul encendido y la carretera cálida abajo, en reposo final. | «amigo», «azul» | se aleja suave y reposa | fin |
