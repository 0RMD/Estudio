# Una cámara de 200 megapíxeles no toma mejores fotos de noche que una de 48

Pedido el 2026-10-31 · Serie **MITOS DE TU CELULAR · EP. 4 (Final de temporada)**

## Lo que cuenta, en una frase

Meter 200 millones de píxeles en el sensor pequeño de un celular obliga a hacer cada píxel diminuto, por lo que de noche atrapa menos luz y genera más ruido — tanto que el propio teléfono une 16 píxeles en uno y baja a 12 megapíxeles cuando oscurece.

## Los datos, cada uno con su fuente

1. **Lo sorprendente (Más megapíxeles vs. fotos nocturnas):** En fotografía nocturna importa el área física del sensor y el tamaño en micras (`µm`) de cada fotodiodo, no cuántos millones de divisiones tenga. Un sensor pequeño dividido en `200 MP` tiene píxeles de apenas `~0.56–0.64 µm`, frente a `1.22–2.44 µm` en sensores de `12–48 MP`.
   - *Fuente oficial:* Fichas técnicas de sensores CMOS móviles Samsung Semiconductor (*ISOCELL HP2 / HP3 200MP, 0.56 µm–0.6 µm*) y Sony Semiconductor (*IMX803 / LYTIA*).
2. **Física del ruido en baja luz (*Shot Noise* y capacidad de pozo):** Cada fotodiodo más pequeño recoge menos fotones durante el mismo tiempo de exposición; al amplificar esa señal débil en escenas nocturnas sube el grano y cae el rango dinámico.
   - *Fuente oficial:* Literatura óptica IEEE sobre sensores CMOS de imagen (*Pixel Pitch, Full-Well Capacity, and Low-Light SNR*).
3. **La prueba definitiva (*Pixel Binning* `16 en 1`):** Los propios fabricantes de cámaras de `200 MP` usan tecnología *Tetra²pixel* (`4×4 = 16` píxeles fusionados en `1`) automáticamente en interiores y de noche, entregando en realidad una foto de **`12.5 megapíxeles`** para simular un píxel grande de `~2.24–2.4 µm`.
   - *Fuente oficial:* Samsung ISOCELL *Tetra²pixel Technology Whitepaper* y Apple Support (* Quad-pixel sensor 48MP -> 12MP/24MP low-light fusion*).
4. **Comparación cotidiana de casa:** Salir al patio bajo una llovizna nocturna con `200` dedales diminutos frente a `12` baldes anchos en la misma mesa: los dedales apenas atrapan gotas sueltas mientras cada balde recoge agua limpia.
