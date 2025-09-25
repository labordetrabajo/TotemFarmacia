# Turnos Farmacia - README

## Instrucciones completas para levantar la aplicación de turnos

### 1️⃣ Backend (Servidor de Turnos)

1. Abrir una terminal en la carpeta donde está tu `server.js`.
2. Instalar dependencias (solo la primera vez):

```bash
npm install express cors socket.io
```

3. Levantar el servidor:

```bash
node server.js
```

4. Verificar que aparezca en consola:

```
Servidor de turnos corriendo en http://localhost:3001
```

* El backend actuará como “hub” central de turnos.
* Genera turnos, los guarda en `turnos.json` y notifica a todos los clientes conectados.

---

### 2️⃣ Frontend del Mostrador (Tabla de Turnos)

1. Abrir otra terminal en la carpeta del frontend del mostrador (donde está `App.js`).
2. Instalar dependencias:

```bash
npm install
```

3. Levantar la app:

```bash
npm start
```

4. Abrir en el navegador:

```
http://localhost:3000
```

* Muestra los turnos en espera en una tabla.
* Actualiza automáticamente cada 2 segundos (o en tiempo real si se usa Socket.IO).

---

### 3️⃣ Tótem (Generador de Turnos)

1. Abrir otra terminal en la carpeta del tótem (donde está tu `App.js`).
2. Instalar dependencias:

```bash
npm install
```

3. Levantar la app:

```bash
npm start
```

* Levantará en el puerto configurado en `package.json` o `.env`.
* Abrir en navegador la URL que indique React.
* Tocar la pantalla → opciones → seleccionar **CP** o **OS** → se genera el turno y se muestra el número.

---

### 4️⃣ Comunicación y Actualizaciones

* Numeración de turnos:

  * `cp01…cp99` → Cliente Particular
  * `os01…os99` → Obra Social
  * Se reinicia automáticamente al llegar a 99.

* Si se usa **Socket.IO**, los turnos se actualizan en tiempo real en todos los clientes conectados (tótem y mostrador).

* Si no, el frontend del mostrador puede usar polling cada 2 segundos.

---

### 5️⃣ Probar todo en la misma PC

* Backend: `http://localhost:3001`
* Mostrador: `http://localhost:3000`
* Tótem: en el puerto configurado (React indicará la URL al levantarlo)

Pasos de prueba:

1. Abrir el backend en una terminal (`node server.js`).
2. Abrir el mostrador en otra pestaña del navegador (`http://localhost:3000`).
3. Abrir el tótem en otra pestaña del navegador (URL que indique React).
4. Generar turnos en el tótem y verificar que aparezcan en la tabla del mostrador.
5. Revisar que `turnos.json` se actualice con cada nuevo turno.

---

### 6️⃣ Nota sobre red

* Para conectar varios dispositivos en la misma red local:

  1. Encontrar la IP de la PC que corre el backend (`ipconfig` / `ifconfig`). Ejemplo: `192.168.0.4`.
  2. Cambiar los frontends para que apunten a esa IP + puerto 3001:

```javascript
const socket = io("http://192.168.0.4:3001"); // para Socket.IO
fetch("http://192.168.0.4:3001/turnos/cp", { method: "POST" }); // para fetch
```

* Todos los clientes conectados recibirán los turnos en tiempo real.

---

### ✅ Resumen de puertos

| Componente | Puerto                 |
| ---------- | ---------------------- |
| Backend    | 3001                   |
| Mostrador  | 3000                   |
| Tótem      | configurado en scripts |

---

Con esto tenés todo listo para levantar y probar tu sistema completo de turnos.
