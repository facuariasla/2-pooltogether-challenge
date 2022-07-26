### VERSION 2
## Link de acceso
https://2-pooltogether-challenge.vercel.app/#/
### Descripción
* Creado con React Hooks & Zustand para el manejo del estado 'global'
* Estilos con ChakraUI
* API: https://www.0x.org/
* Se llena un formulario donde se genera una simluación de compra con tarjeta de crédito. El formulario tiene una serie de validaciones de tarjeta (ej, nro tarjeta > 4200 (tarjeta de crédito, email válido, etc.)), y al final se compran USD que se almacenan en un state global, donde se puede posteriormente comprar tokens.
* Se pueden guardar hasta 3 tokens favoritos, los cuales solo se habilitara su compra cuando el último precio del mismo, sea menor al promedio de los ultimos 150 segundos (1 petición de precio de token cada 30 segundos).