<<<<<<< HEAD
# 🚀 Guía de Despliegue en Vercel - Fila Virtual Goguinara

## 📋 Requisitos Previos

- Cuenta en [GitHub](https://github.com)
- Cuenta en [Vercel](https://vercel.com)
- Proyecto configurado localmente y funcionando

## 🔄 Paso 1: Subir el Proyecto a GitHub

### A. Crear Repositorio en GitHub
1. Ve a [GitHub](https://github.com) e inicia sesión
2. Clic en "New repository" (botón verde)
3. Nombre: `goguinara-virtual-queue`
4. Descripción: `Sistema de fila virtual para Goguinara`
5. Selecciona "Public" o "Private" según prefieras
6. **NO** marques "Initialize with README" (ya tienes archivos)
7. Clic en "Create repository"

### B. Preparar el Proyecto para GitHub

#### 1. Verificar .gitignore
Asegúrate de que `.gitignore` incluya:
```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.*

# Production
/build
/.next/
/out/

# Environment variables
.env*
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

#### 2. Crear README.md para GitHub
```bash
# Si no existe, crear README.md
cp README.md README_BACKUP.md
```

### C. Subir a GitHub
```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "Initial commit: Fila Virtual Goguinara"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/goguinara-virtual-queue.git

# Subir código
git branch -M main
git push -u origin main
```

## 🌐 Paso 2: Configurar Vercel

### A. Conectar GitHub con Vercel
1. Ve a [Vercel](https://vercel.com) e inicia sesión
2. Clic en "New Project"
3. Selecciona "Import Git Repository"
4. Autoriza acceso a GitHub si es necesario
5. Busca tu repositorio `goguinara-virtual-queue`
6. Clic en "Import"

### B. Configurar el Proyecto en Vercel

#### 1. Configuración Básica
- **Project Name**: `goguinara-virtual-queue`
- **Framework Preset**: Next.js (se detecta automáticamente)
- **Root Directory**: `./` (raíz del proyecto)
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)

#### 2. Variables de Entorno
En la sección "Environment Variables", agrega:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
TU_CLAVE_PRIVADA_COMPLETA_AQUI
-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=tu-google-sheet-id
NEXT_PUBLIC_APP_NAME=Fila Virtual Goguinara
ADMIN_PASSWORD=tu-contraseña-segura-de-produccion
```

**⚠️ IMPORTANTE para GOOGLE_PRIVATE_KEY:**
- Copia la clave completa incluyendo `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`
- Mantén los saltos de línea originales
- No uses comillas adicionales

#### 3. Configuración Avanzada (Opcional)
- **Node.js Version**: 18.x (recomendado)
- **Regions**: Selecciona la más cercana a tus usuarios

### C. Desplegar
1. Clic en "Deploy"
2. Espera a que termine el build (2-5 minutos)
3. ¡Tu aplicación estará disponible en una URL como `https://goguinara-virtual-queue.vercel.app`!

## 🔧 Paso 3: Configuración Post-Despliegue

### A. Verificar Funcionamiento
1. Visita tu URL de Vercel
2. Prueba el registro: `/register`
3. Verifica la fila: `/queue`
4. Prueba el admin: `/admin`

### B. Configurar Dominio Personalizado (Opcional)
1. En el dashboard de Vercel, ve a tu proyecto
2. Pestaña "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Configura DNS según las instrucciones

### C. Configurar Redirects (Opcional)
Crea `vercel.json` en la raíz del proyecto:
```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "/register",
      "permanent": false
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## 🔄 Paso 4: Actualizaciones Futuras

### Flujo de Desarrollo
```bash
# Hacer cambios en tu código local
# Probar localmente
npm run dev

# Cuando esté listo, subir a GitHub
git add .
git commit -m "Descripción de los cambios"
git push

# Vercel desplegará automáticamente
```

### Configurar Ramas (Opcional)
- **main/master**: Producción automática
- **develop**: Preview automático
- **feature/***: Preview por pull request

## 📊 Paso 5: Monitoreo y Analytics

### A. Analytics de Vercel
1. En tu proyecto, pestaña "Analytics"
2. Activa Vercel Analytics (gratis)
3. Ve métricas de rendimiento y uso

### B. Logs y Debugging
1. Pestaña "Functions" para ver logs de API
2. "Deployments" para historial de despliegues
3. "Settings" → "Environment Variables" para actualizar configuración

## 🔒 Consideraciones de Seguridad

### Variables de Entorno
- ✅ Nunca subas `.env.local` a GitHub
- ✅ Usa contraseñas fuertes para producción
- ✅ Rota credenciales periódicamente

### Google Sheets
- ✅ Usa un service account específico para producción
- ✅ Limita permisos al mínimo necesario
- ✅ Monitorea acceso a tu Google Sheet

### Rate Limiting
- ✅ Considera implementar rate limiting adicional
- ✅ Monitorea uso de APIs
- ✅ Configura alertas de uso excesivo

## 🚨 Solución de Problemas

### Error de Build
```bash
# Verificar localmente
npm run build

# Si falla, revisar:
# - Errores de TypeScript
# - Dependencias faltantes
# - Variables de entorno
```

### Error de Google Sheets API
- Verifica variables de entorno en Vercel
- Confirma que el service account tenga permisos
- Revisa logs en Vercel Functions

### Error 500 en Producción
1. Ve a Vercel → Functions → Ver logs
2. Identifica el error específico
3. Verifica configuración de variables de entorno

## 📱 URLs de Producción

Una vez desplegado, tendrás:
- **Aplicación principal**: `https://tu-proyecto.vercel.app`
- **Registro**: `https://tu-proyecto.vercel.app/register`
- **Estado de fila**: `https://tu-proyecto.vercel.app/queue`
- **Verificar estado**: `https://tu-proyecto.vercel.app/status`
- **Administración**: `https://tu-proyecto.vercel.app/admin`

## 🎯 Checklist Final

- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] Aplicación accesible
- [ ] Google Sheets funcionando
- [ ] Panel de admin accesible
- [ ] WhatsApp Web funcionando
- [ ] Pruebas desde dispositivos móviles

## 📞 Soporte

### Recursos Útiles
- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de Next.js en Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)
- [Solución de problemas de Vercel](https://vercel.com/support)

### Problemas Comunes
- **Build fails**: Revisar errores de TypeScript y dependencias
- **API no funciona**: Verificar variables de entorno
- **Google Sheets error**: Confirmar permisos y credenciales
- **WhatsApp no abre**: Verificar formato de números de teléfono

=======
# 🚀 Guía de Despliegue en Vercel - Fila Virtual Goguinara

## 📋 Requisitos Previos

- Cuenta en [GitHub](https://github.com)
- Cuenta en [Vercel](https://vercel.com)
- Proyecto configurado localmente y funcionando

## 🔄 Paso 1: Subir el Proyecto a GitHub

### A. Crear Repositorio en GitHub
1. Ve a [GitHub](https://github.com) e inicia sesión
2. Clic en "New repository" (botón verde)
3. Nombre: `goguinara-virtual-queue`
4. Descripción: `Sistema de fila virtual para Goguinara`
5. Selecciona "Public" o "Private" según prefieras
6. **NO** marques "Initialize with README" (ya tienes archivos)
7. Clic en "Create repository"

### B. Preparar el Proyecto para GitHub

#### 1. Verificar .gitignore
Asegúrate de que `.gitignore` incluya:
```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.*

# Production
/build
/.next/
/out/

# Environment variables
.env*
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

#### 2. Crear README.md para GitHub
```bash
# Si no existe, crear README.md
cp README.md README_BACKUP.md
```

### C. Subir a GitHub
```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "Initial commit: Fila Virtual Goguinara"

# Conectar con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/goguinara-virtual-queue.git

# Subir código
git branch -M main
git push -u origin main
```

## 🌐 Paso 2: Configurar Vercel

### A. Conectar GitHub con Vercel
1. Ve a [Vercel](https://vercel.com) e inicia sesión
2. Clic en "New Project"
3. Selecciona "Import Git Repository"
4. Autoriza acceso a GitHub si es necesario
5. Busca tu repositorio `goguinara-virtual-queue`
6. Clic en "Import"

### B. Configurar el Proyecto en Vercel

#### 1. Configuración Básica
- **Project Name**: `goguinara-virtual-queue`
- **Framework Preset**: Next.js (se detecta automáticamente)
- **Root Directory**: `./` (raíz del proyecto)
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)

#### 2. Variables de Entorno
En la sección "Environment Variables", agrega:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
TU_CLAVE_PRIVADA_COMPLETA_AQUI
-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=tu-google-sheet-id
NEXT_PUBLIC_APP_NAME=Fila Virtual Goguinara
ADMIN_PASSWORD=tu-contraseña-segura-de-produccion
```

**⚠️ IMPORTANTE para GOOGLE_PRIVATE_KEY:**
- Copia la clave completa incluyendo `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`
- Mantén los saltos de línea originales
- No uses comillas adicionales

#### 3. Configuración Avanzada (Opcional)
- **Node.js Version**: 18.x (recomendado)
- **Regions**: Selecciona la más cercana a tus usuarios

### C. Desplegar
1. Clic en "Deploy"
2. Espera a que termine el build (2-5 minutos)
3. ¡Tu aplicación estará disponible en una URL como `https://goguinara-virtual-queue.vercel.app`!

## 🔧 Paso 3: Configuración Post-Despliegue

### A. Verificar Funcionamiento
1. Visita tu URL de Vercel
2. Prueba el registro: `/register`
3. Verifica la fila: `/queue`
4. Prueba el admin: `/admin`

### B. Configurar Dominio Personalizado (Opcional)
1. En el dashboard de Vercel, ve a tu proyecto
2. Pestaña "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Configura DNS según las instrucciones

### C. Configurar Redirects (Opcional)
Crea `vercel.json` en la raíz del proyecto:
```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "/register",
      "permanent": false
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## 🔄 Paso 4: Actualizaciones Futuras

### Flujo de Desarrollo
```bash
# Hacer cambios en tu código local
# Probar localmente
npm run dev

# Cuando esté listo, subir a GitHub
git add .
git commit -m "Descripción de los cambios"
git push

# Vercel desplegará automáticamente
```

### Configurar Ramas (Opcional)
- **main/master**: Producción automática
- **develop**: Preview automático
- **feature/***: Preview por pull request

## 📊 Paso 5: Monitoreo y Analytics

### A. Analytics de Vercel
1. En tu proyecto, pestaña "Analytics"
2. Activa Vercel Analytics (gratis)
3. Ve métricas de rendimiento y uso

### B. Logs y Debugging
1. Pestaña "Functions" para ver logs de API
2. "Deployments" para historial de despliegues
3. "Settings" → "Environment Variables" para actualizar configuración

## 🔒 Consideraciones de Seguridad

### Variables de Entorno
- ✅ Nunca subas `.env.local` a GitHub
- ✅ Usa contraseñas fuertes para producción
- ✅ Rota credenciales periódicamente

### Google Sheets
- ✅ Usa un service account específico para producción
- ✅ Limita permisos al mínimo necesario
- ✅ Monitorea acceso a tu Google Sheet

### Rate Limiting
- ✅ Considera implementar rate limiting adicional
- ✅ Monitorea uso de APIs
- ✅ Configura alertas de uso excesivo

## 🚨 Solución de Problemas

### Error de Build
```bash
# Verificar localmente
npm run build

# Si falla, revisar:
# - Errores de TypeScript
# - Dependencias faltantes
# - Variables de entorno
```

### Error de Google Sheets API
- Verifica variables de entorno en Vercel
- Confirma que el service account tenga permisos
- Revisa logs en Vercel Functions

### Error 500 en Producción
1. Ve a Vercel → Functions → Ver logs
2. Identifica el error específico
3. Verifica configuración de variables de entorno

## 📱 URLs de Producción

Una vez desplegado, tendrás:
- **Aplicación principal**: `https://tu-proyecto.vercel.app`
- **Registro**: `https://tu-proyecto.vercel.app/register`
- **Estado de fila**: `https://tu-proyecto.vercel.app/queue`
- **Verificar estado**: `https://tu-proyecto.vercel.app/status`
- **Administración**: `https://tu-proyecto.vercel.app/admin`

## 🎯 Checklist Final

- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] Aplicación accesible
- [ ] Google Sheets funcionando
- [ ] Panel de admin accesible
- [ ] WhatsApp Web funcionando
- [ ] Pruebas desde dispositivos móviles

## 📞 Soporte

### Recursos Útiles
- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de Next.js en Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)
- [Solución de problemas de Vercel](https://vercel.com/support)

### Problemas Comunes
- **Build fails**: Revisar errores de TypeScript y dependencias
- **API no funciona**: Verificar variables de entorno
- **Google Sheets error**: Confirmar permisos y credenciales
- **WhatsApp no abre**: Verificar formato de números de teléfono

>>>>>>> 39b3e8a615fe1a5d87fdebb326404636e2620585
¡Tu aplicación estará lista para usar en producción! 🎉