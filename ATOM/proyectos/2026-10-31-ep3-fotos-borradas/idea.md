# Borrar una foto de tu celular y vaciar la papelera no la borra del chip al instante

Pedido el 2026-10-31 · Serie **MITOS DE TU CELULAR · EP. 3**

## Lo que cuenta, en una frase

Cuando borras una foto y vacías la papelera, el sistema solo elimina su entrada del índice y marca el hueco como espacio libre para no desgastar la memoria Flash, dejando los datos intactos hasta que archivos nuevos escriben encima o destruyes la llave de cifrado restableciendo de fábrica.

## Los datos, cada uno con su fuente

1. **Lo sorprendente (Borrado lógico vs. físico en memoria NAND Flash):** Vaciar la carpeta «Eliminados» quita la referencia del sistema de archivos, pero no pone en cero de inmediato cada celda física de silicio del chip NAND Flash.
   - *Fuente oficial:* NIST Special Publication `800-88 Rev. 1` (*Guidelines for Media Sanitization* — sección sobre memorias Flash/SSD y *Flash Translation Layer*).
2. **Por qué la memoria Flash funciona así:** Las celdas NAND Flash soportan un número limitado de ciclos de borrado eléctrico por bloques (*P/E cycles*). Borrar eléctricamente bloques enteros tras cada foto reduciría la vida útil del chip y volvería lento el teléfono, por lo que el controlador solo marca las páginas como disponibles.
   - *Fuente oficial:* Especificaciones técnicas JEDEC / IEEE sobre arquitectura NAND Flash y gestión de desgaste (*wear leveling*).
3. **Comparación cotidiana de casa:** Arrancar un renglón del índice de un libro dejando intacta la página interior con la fotografía impresa, hasta que alguien pegue otra hoja encima.
4. **Riesgo en medios sin cifrar vs. borrado criptográfico moderno:** En tarjetas microSD o equipos antiguos sin cifrado activo, herramientas de recuperación leen esos bloques no asignados. En iPhone (`APFS` Data Protection) y Android moderno (`File-Based Encryption`), cada archivo está cifrado con una llave maestra: ejecutar **Restablecer de fábrica / Borrar contenido y configuración** destruye esa llave criptográfica y vuelve ilegible todo el chip al instante.
   - *Fuente oficial:* Apple Platform Security (*Effaceable Storage & Crypto Erase*) y Android Open Source Project Security (*File-Based Encryption*).
