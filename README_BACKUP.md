# Fila Virtual Goguinara

Sistema de fila virtual desarrollado con Next.js que permite a los usuarios registrarse en una fila virtual, evitar esperas físicas y recibir notificaciones cuando sea su turno.

## 🚀 Características

- **Registro en fila virtual**: Los usuarios pueden unirse a la fila desde cualquier lugar
- **Verificación de estado**: Consulta tu posición actual y tiempo estimado de espera
- **Panel de administración**: Gestión completa de la fila para el personal
- **Integración con WhatsApp Web**: Envío directo de mensajes a los clientes
- **Tiempo promedio configurable**: Administrador puede ajustar tiempos de espera
- **Soporte para 50+ personas**: Capacidad escalable para filas grandes
- **Integración con Google Sheets**: Almacenamiento persistente de datos
- **Validación robusta**: Validación de datos del lado del servidor y cliente
- **Rate limiting**: Protección contra spam y uso excesivo
- **Interfaz responsive**: Optimizada para dispositivos móviles y desktop

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: Google Sheets API
- **Autenticación**: Sistema de contraseñas para administración
- **Validación**: Validación personalizada de formularios

## 📋 Requisitos Previos

- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de Google con acceso a Google Sheets API
- Google Service Account configurada

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd goguinara-queue
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local` y configura las variables:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=tu-google-sheet-id

# Application Configuration
NEXT_PUBLIC_APP_NAME="Fila Virtual Goguinara"
ADMIN_PASSWORD=tu-contraseña-segura-de-admin
```

### 4. Configurar Google Sheets

1. Crea un nuevo Google Sheet
2. Crea un Service Account en Google Cloud Console
3. Habilita la Google Sheets API
4. Descarga las credenciales JSON
5. Comparte el Google Sheet con el email del Service Account
6. Copia el ID del Sheet desde la URL

### 5. Ejecutar en desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Uso

### Para Usuarios

1. **Registrarse**: Ve a `/register` o haz clic en "Unirse a la Fila"
2. **Verificar estado**: Ve a `/status` para consultar tu posición
3. **Ver fila general**: Ve a `/queue` para ver el estado completo de la fila

### Para Administradores

1. Ve a `/admin`
2. Ingresa la contraseña de administrador
3. Gestiona la fila: envía mensajes WhatsApp, actualiza estados, configura tiempos
4. Configura tiempo promedio de espera por persona

## 🔧 API Endpoints

- `POST /api/register` - Registrar usuario en la fila
- `POST /api/status` - Verificar estado de un usuario
- `GET /api/queue` - Obtener estado general de la fila
- `GET /api/admin` - Obtener datos de administración (requiere auth)
- `POST /api/admin` - Acciones de administración (requiere auth)

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── admin/          # Panel de administración
│   ├── api/            # API Routes
│   ├── queue/          # Vista pública de la fila
│   ├── register/       # Registro de usuarios
│   ├── status/         # Verificación de estado
│   └── page.tsx        # Página principal
├── lib/
│   ├── googleSheets.ts # Integración con Google Sheets
│   ├── rateLimit.ts    # Sistema de rate limiting
│   └── validation.ts   # Validaciones
```

## 🚀 Despliegue

### Preparación
```bash
npm run prepare:deploy
```

### Vercel (Recomendado)

1. Sigue la guía completa en `GUIA_DESPLIEGUE_VERCEL.md`
2. Conecta tu repositorio a Vercel
3. Configura las variables de entorno en el dashboard de Vercel
4. Despliega automáticamente

### Configuración Local para Pruebas
```bash
# Para acceso desde otros dispositivos en la red local
npm run dev:network
```

Ver `GUIA_CONFIGURACION_LOCAL.md` para instrucciones detalladas.

### Otros proveedores

El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🔒 Seguridad

- Validación de datos en servidor y cliente
- Rate limiting para prevenir spam
- Sanitización de inputs
- Variables de entorno para credenciales sensibles
- Autenticación para panel de administración

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🆕 Nuevas Características

- ✅ **Integración con WhatsApp Web**: Envío directo de mensajes
- ✅ **Tiempo promedio configurable**: Control total de tiempos de espera
- ✅ **Soporte para 50+ personas**: Escalabilidad mejorada
- ✅ **Guías de despliegue**: Documentación completa para producción

## 🔮 Próximas Características

- [ ] Notificaciones push para navegadores
- [ ] Múltiples filas/servicios simultáneos
- [ ] Estadísticas y reportes avanzados
- [ ] Integración con calendarios
- [ ] API para terceros
- [ ] Integración nativa con WhatsApp Business API
