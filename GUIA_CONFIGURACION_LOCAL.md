<<<<<<< HEAD
# 🏠 Guía de Configuración Local - Fila Virtual Goguinara

## 📋 Requisitos Previos

### Software Necesario
- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Git** - [Descargar aquí](https://git-scm.com/)

### Cuentas y Servicios
- **Cuenta de Google** con acceso a Google Sheets
- **Google Cloud Console** para crear Service Account

## 🚀 Instalación Paso a Paso

### 1. Clonar o Descargar el Proyecto
```bash
# Si tienes Git instalado
git clone <url-del-repositorio>
cd goguinara-queue

# O descargar ZIP y extraer
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Google Sheets

#### A. Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "GOGUINARA_VIRTUAL_QUEUE"
4. Copia el ID del sheet desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```

#### B. Crear Service Account
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Sheets API**
4. Ve a "Credenciales" → "Crear credenciales" → "Cuenta de servicio"
5. Completa el formulario y crea la cuenta
6. En la cuenta creada, ve a "Claves" → "Agregar clave" → "JSON"
7. Descarga el archivo JSON

#### C. Compartir Google Sheet
1. Abre tu Google Sheet
2. Haz clic en "Compartir"
3. Agrega el email del service account (del archivo JSON)
4. Dale permisos de "Editor"

### 4. Configurar Variables de Entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env.local
```

Edita `.env.local` con tus datos:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL="tu-service-account@tu-proyecto.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="tu-google-sheet-id"
NEXT_PUBLIC_APP_NAME="Fila Virtual Goguinara"
ADMIN_PASSWORD="tu-contraseña-segura"
```

### 5. Verificar Configuración
```bash
node scripts/check-config.js
```

### 6. Inicializar Google Sheet
```bash
node scripts/init-sheet.js
```

### 7. Ejecutar el Proyecto
```bash
npm run dev
```

El proyecto estará disponible en: `http://localhost:3000`

## 🌐 Configuración para Acceso desde Otros Dispositivos

### Opción 1: Usar la IP Local (Recomendado)

#### 1. Encontrar tu IP Local
**Windows:**
```cmd
ipconfig
```
Busca "Dirección IPv4" en tu adaptador de red principal.

**Mac/Linux:**
```bash
ifconfig | grep inet
```

#### 2. Configurar Next.js para Aceptar Conexiones Externas
Modifica el script en `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0 -p 3000",
    "dev:legacy": "NODE_OPTIONS='--openssl-legacy-provider' next dev -H 0.0.0.0 -p 3000"
  }
}
```

#### 3. Configurar Firewall (Windows)
1. Abre "Windows Defender Firewall"
2. Clic en "Configuración avanzada"
3. "Reglas de entrada" → "Nueva regla"
4. Tipo: Puerto
5. Puerto específico: 3000
6. Permitir conexión
7. Aplicar a todos los perfiles
8. Nombre: "Next.js Dev Server"

#### 4. Acceder desde Otros Dispositivos
```
http://TU_IP_LOCAL:3000
```
Ejemplo: `http://192.168.1.100:3000`

### Opción 2: Usar ngrok (Para Internet)

#### 1. Instalar ngrok
```bash
npm install -g ngrok
```

#### 2. Ejecutar ngrok
```bash
# En una terminal separada
ngrok http 3000
```

#### 3. Usar la URL Pública
ngrok te dará una URL como: `https://abc123.ngrok.io`

## 📱 Pruebas desde Dispositivos Móviles

### URLs de Prueba
- **Inicio**: `http://TU_IP:3000`
- **Registro**: `http://TU_IP:3000/register`
- **Ver Estado**: `http://TU_IP:3000/status`
- **Fila Pública**: `http://TU_IP:3000/queue`
- **Administración**: `http://TU_IP:3000/admin`

### Funcionalidades a Probar
1. **Registro de usuarios** desde móvil
2. **Verificación de estado** con número de teléfono
3. **Vista de fila pública** en tiempo real
4. **Panel de administración** (solo desde dispositivos confiables)
5. **Mensajes de WhatsApp** (se abrirá WhatsApp Web)

## 🔧 Solución de Problemas Comunes

### Error: "Cannot connect to server"
- Verifica que el servidor esté corriendo
- Confirma que la IP y puerto sean correctos
- Revisa configuración del firewall

### Error: "Google Sheets API"
- Verifica las credenciales en `.env.local`
- Confirma que el sheet esté compartido con el service account
- Revisa que la API esté habilitada en Google Cloud

### WhatsApp Web no abre
- Verifica que el número tenga formato correcto
- Confirma que WhatsApp Web esté disponible
- Prueba desde un navegador de escritorio

### Dispositivos no pueden acceder
- Confirma que estén en la misma red WiFi
- Verifica configuración del firewall
- Prueba con la IP exacta mostrada en la terminal

## 📊 Scripts de Prueba Incluidos

```bash
# Probar configuración
node scripts/check-config.js

# Probar conexión con Google Sheets
node scripts/test-connection.js

# Probar con muchos usuarios
node scripts/test-large-queue.js

# Probar configuración de tiempos
node scripts/test-wait-time.js
```

## 🔒 Consideraciones de Seguridad

### Para Pruebas Locales
- Usa solo en redes confiables
- No expongas credenciales reales
- Cambia contraseñas después de pruebas

### Para Producción
- Usa HTTPS siempre
- Configura variables de entorno seguras
- Implementa rate limiting adicional
- Considera autenticación más robusta

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs en la terminal
2. Verifica la configuración paso a paso
3. Prueba los scripts de diagnóstico
=======
# 🏠 Guía de Configuración Local - Fila Virtual Goguinara

## 📋 Requisitos Previos

### Software Necesario
- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Git** - [Descargar aquí](https://git-scm.com/)

### Cuentas y Servicios
- **Cuenta de Google** con acceso a Google Sheets
- **Google Cloud Console** para crear Service Account

## 🚀 Instalación Paso a Paso

### 1. Clonar o Descargar el Proyecto
```bash
# Si tienes Git instalado
git clone <url-del-repositorio>
cd goguinara-queue

# O descargar ZIP y extraer
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Google Sheets

#### A. Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "GOGUINARA_VIRTUAL_QUEUE"
4. Copia el ID del sheet desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```

#### B. Crear Service Account
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Sheets API**
4. Ve a "Credenciales" → "Crear credenciales" → "Cuenta de servicio"
5. Completa el formulario y crea la cuenta
6. En la cuenta creada, ve a "Claves" → "Agregar clave" → "JSON"
7. Descarga el archivo JSON

#### C. Compartir Google Sheet
1. Abre tu Google Sheet
2. Haz clic en "Compartir"
3. Agrega el email del service account (del archivo JSON)
4. Dale permisos de "Editor"

### 4. Configurar Variables de Entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env.local
```

Edita `.env.local` con tus datos:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL="tu-service-account@tu-proyecto.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="tu-google-sheet-id"
NEXT_PUBLIC_APP_NAME="Fila Virtual Goguinara"
ADMIN_PASSWORD="tu-contraseña-segura"
```

### 5. Verificar Configuración
```bash
node scripts/check-config.js
```

### 6. Inicializar Google Sheet
```bash
node scripts/init-sheet.js
```

### 7. Ejecutar el Proyecto
```bash
npm run dev
```

El proyecto estará disponible en: `http://localhost:3000`

## 🌐 Configuración para Acceso desde Otros Dispositivos

### Opción 1: Usar la IP Local (Recomendado)

#### 1. Encontrar tu IP Local
**Windows:**
```cmd
ipconfig
```
Busca "Dirección IPv4" en tu adaptador de red principal.

**Mac/Linux:**
```bash
ifconfig | grep inet
```

#### 2. Configurar Next.js para Aceptar Conexiones Externas
Modifica el script en `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0 -p 3000",
    "dev:legacy": "NODE_OPTIONS='--openssl-legacy-provider' next dev -H 0.0.0.0 -p 3000"
  }
}
```

#### 3. Configurar Firewall (Windows)
1. Abre "Windows Defender Firewall"
2. Clic en "Configuración avanzada"
3. "Reglas de entrada" → "Nueva regla"
4. Tipo: Puerto
5. Puerto específico: 3000
6. Permitir conexión
7. Aplicar a todos los perfiles
8. Nombre: "Next.js Dev Server"

#### 4. Acceder desde Otros Dispositivos
```
http://TU_IP_LOCAL:3000
```
Ejemplo: `http://192.168.1.100:3000`

### Opción 2: Usar ngrok (Para Internet)

#### 1. Instalar ngrok
```bash
npm install -g ngrok
```

#### 2. Ejecutar ngrok
```bash
# En una terminal separada
ngrok http 3000
```

#### 3. Usar la URL Pública
ngrok te dará una URL como: `https://abc123.ngrok.io`

## 📱 Pruebas desde Dispositivos Móviles

### URLs de Prueba
- **Inicio**: `http://TU_IP:3000`
- **Registro**: `http://TU_IP:3000/register`
- **Ver Estado**: `http://TU_IP:3000/status`
- **Fila Pública**: `http://TU_IP:3000/queue`
- **Administración**: `http://TU_IP:3000/admin`

### Funcionalidades a Probar
1. **Registro de usuarios** desde móvil
2. **Verificación de estado** con número de teléfono
3. **Vista de fila pública** en tiempo real
4. **Panel de administración** (solo desde dispositivos confiables)
5. **Mensajes de WhatsApp** (se abrirá WhatsApp Web)

## 🔧 Solución de Problemas Comunes

### Error: "Cannot connect to server"
- Verifica que el servidor esté corriendo
- Confirma que la IP y puerto sean correctos
- Revisa configuración del firewall

### Error: "Google Sheets API"
- Verifica las credenciales en `.env.local`
- Confirma que el sheet esté compartido con el service account
- Revisa que la API esté habilitada en Google Cloud

### WhatsApp Web no abre
- Verifica que el número tenga formato correcto
- Confirma que WhatsApp Web esté disponible
- Prueba desde un navegador de escritorio

### Dispositivos no pueden acceder
- Confirma que estén en la misma red WiFi
- Verifica configuración del firewall
- Prueba con la IP exacta mostrada en la terminal

## 📊 Scripts de Prueba Incluidos

```bash
# Probar configuración
node scripts/check-config.js

# Probar conexión con Google Sheets
node scripts/test-connection.js

# Probar con muchos usuarios
node scripts/test-large-queue.js

# Probar configuración de tiempos
node scripts/test-wait-time.js
```

## 🔒 Consideraciones de Seguridad

### Para Pruebas Locales
- Usa solo en redes confiables
- No expongas credenciales reales
- Cambia contraseñas después de pruebas

### Para Producción
- Usa HTTPS siempre
- Configura variables de entorno seguras
- Implementa rate limiting adicional
- Considera autenticación más robusta

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs en la terminal
2. Verifica la configuración paso a paso
3. Prueba los scripts de diagnóstico
>>>>>>> 39b3e8a615fe1a5d87fdebb326404636e2620585
4. Consulta la documentación de Next.js y Google Sheets API