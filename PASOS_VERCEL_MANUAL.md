# 🚀 Pasos para Despliegue en Vercel - Manual

## 📋 Información del Proyecto
- **Repositorio GitHub**: https://github.com/LicMartinez/goguinara-virtual-queue.git
- **Build Status**: ✅ EXITOSO (confirmado localmente)

## 🔗 Paso 1: Acceder a Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up" o "Log In"
3. **Recomendado**: Inicia sesión con tu cuenta de GitHub

## 📂 Paso 2: Importar Proyecto
1. Una vez en el dashboard, haz clic en **"New Project"**
2. Selecciona **"Import Git Repository"**
3. Si no ves tu repositorio, haz clic en **"Adjust GitHub App Permissions"**
4. Busca: `goguinara-virtual-queue`
5. Haz clic en **"Import"** junto a tu repositorio

## ⚙️ Paso 3: Configurar Proyecto
### Configuración Básica:
- **Project Name**: `goguinara-virtual-queue` (se detecta automáticamente)
- **Framework Preset**: `Next.js` (se detecta automáticamente)
- **Root Directory**: `./` (dejar por defecto)
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)

### ⚠️ NO HAGAS CLIC EN "DEPLOY" TODAVÍA

## 🔐 Paso 4: Configurar Variables de Entorno
**MUY IMPORTANTE**: Antes de desplegar, debes configurar las variables de entorno.

En la sección **"Environment Variables"**, agrega las siguientes:

### Variable 1: GOOGLE_SERVICE_ACCOUNT_EMAIL
- **Name**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- **Value**: `goguinara-sheets-writer@goguinara-virtual-queue-api.iam.gserviceaccount.com`
- **Environment**: Selecciona `Production`, `Preview`, y `Development`

### Variable 2: GOOGLE_PRIVATE_KEY
- **Name**: `GOOGLE_PRIVATE_KEY`
- **Value**: (Copia EXACTAMENTE desde tu .env.local, incluyendo los saltos de línea)
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrsbE3ne5ZgvSV
sNyqprq5F/NPrxgSbpnDf5qmo/Qmi7Hj5t0j8mYh2gTfQGckymf6h50L9zmrBMcQ
+TjfBIHlf7omyYaIdl50/JMPgVuPwzBFnQI37w79ZUfJx4byFWlPPGx0WC8iShuq
uAuyYFaAIjOTNnkTMUHc4oyon7MNXTpYtBoBeC61k3t2kxZBWIOrVYfYNv9Cqi8b
MiB+Ex5iIx2L+kFoSnrE3eu/Now3klB4QRw6cWdpuKwb+y9D8X52zZKt4+n1AQUY
DCYO/FxeCrboJ2zphoLksEExA39dYVWt4UZw7bL1QqMlDwG8uEHaGTfM6R92IWQR
qBn9sM8bAgMBAAECggEALcymo1ljnUkLiWq2UmdLY9h5tQXV/AS4y6ecT1to42dc
Opj44H/mspz/s7XwTaYYeoH2aJy4K2CI4YQ5oXQIWnnp5DLZykkZBUfiyr4M+Jpu
pAMv9k+0xe9gaPjqjGUdxF8v5xEm8ZSnMLELnbeJG4EEFP7w6Se4k/1y3ABNuQB2
ozeCXhuXZodXYHApMLTVpD9x6GQNsICIx0VWSwFOiIUcWtHcj56KEnVlheO71xz/
CDnFg+zs2XupWcCgCltRI7iFzW2QW3qiD+CqF+TiJFAMKyUnCCLKTlz7PSOPVK/E
gn2bToUrs1tmu9ZOIDjluaeIJqccoceJvNU2AikJkQKBgQDu7T62u7r6qIl59r4z
BY6pu7Z/+HwNi/Hp79llzoROhTusP1S5yHRVGedfxFHyA5sHxQMf4Bi/3+GZHZ7h
mar8oogc+bW3pFCtDWz6gfu5n92r/ClVzbBB0CtpUTQSv67/i0ypXpzuh1e0slES
j0zLiPRt/vURmX1lvJJGIRdUdwKBgQC39oqoC2ZBsnFVLSGRL+1BKGSwMLXJ2HwY
a9XhT4fgrSRJ6LcceEhXvAQbaQYj5jmtFDrTlufqma1T35v6GByxOuYbf/D1w1z/
wx7zbZ8bzIYgorJKz6nRp40qquffTSP7mrcWb6WjeTTZ5lLUz6f/7gRmQR8lbNG/
TPzzS9E3fQKBgQCOPk5M6h0aZ8ZZBy4bIB7cLDYtn9jzE7L1bGcINlgMi0OIe7fM
V2vy0lYubKnApKbijEcc7gSuDvK3fqv9ccgbWgQhBAVMjJW/QTP1O/eKfoOxhZFy
VN+vfuipbb/LvbTIzLzaRMq3M3piyJp9qzS0JBgpeFWcob3HGOoYuFC0ZwKBgBL3
i2I6EqfxYvf6ODzE6TxPktoLm6Kc/GZ0L9AUKBlFILmyEbcQu7y3+OBumqB26zlq
HYqVQ4IPqCw+oNFPTR4EyZbKQSjFpMAF+Rn2EnKGSsnwnFtUP9kK4mYkytVeGbim
QfxBNJ2/MHDK631fj522h6OXUUPFjXag1G+tQHvtAoGAfEsS4jEN7d5XGyPvigv6
PbXTP567yB1OLNVdkXWNb9zb5DpYC9NfmhqgonGZhsXB56xRwnRV1kb936d6ZsTK
jhlJ9eH+t3IW2QY1DElkR89eplosD3RhzW3aVRYZ6YRzMnFc1Bq9EQoF7UMLIiis
YqxsYmhhvpfXZRSCCtMMJTs=
-----END PRIVATE KEY-----
```
- **Environment**: Selecciona `Production`, `Preview`, y `Development`

### Variable 3: GOOGLE_SHEET_ID
- **Name**: `GOOGLE_SHEET_ID`
- **Value**: `1H8xPNVtiTyB3ORA2q2bCpJv3r9b7Gu3JQr4tVHWn9vo`
- **Environment**: Selecciona `Production`, `Preview`, y `Development`

### Variable 4: ADMIN_PASSWORD
- **Name**: `ADMIN_PASSWORD`
- **Value**: `admin123secure` (o cambia por una contraseña más segura)
- **Environment**: Selecciona `Production`, `Preview`, y `Development`

### Variable 5: NEXT_PUBLIC_APP_NAME
- **Name**: `NEXT_PUBLIC_APP_NAME`
- **Value**: `Fila Virtual Goguinara`
- **Environment**: Selecciona `Production`, `Preview`, y `Development`

## 🚀 Paso 5: Desplegar
1. Una vez configuradas TODAS las variables de entorno
2. Haz clic en **"Deploy"**
3. Espera 2-5 minutos mientras Vercel construye tu aplicación
4. ¡Tu aplicación estará lista!

## ✅ Paso 6: Verificar Despliegue
Una vez completado, tendrás una URL como:
`https://goguinara-virtual-queue.vercel.app`

### Pruebas a realizar:
1. **Página principal**: Debe cargar correctamente
2. **Registro**: `/register` - Probar registro de usuario
3. **Fila pública**: `/queue` - Ver estado de la fila
4. **Verificar estado**: `/status` - Buscar por teléfono
5. **Panel admin**: `/admin` - Usar contraseña configurada
6. **WhatsApp Web**: Probar botón "Mensaje" en admin

## 🔧 Solución de Problemas

### Si el build falla:
1. Ve a la pestaña "Functions" en Vercel
2. Revisa los logs de error
3. Verifica que todas las variables de entorno estén configuradas

### Si Google Sheets no funciona:
1. Verifica que el service account tenga acceso al sheet
2. Confirma que las variables de entorno estén correctas
3. Revisa que el GOOGLE_SHEET_ID sea el correcto

### Si WhatsApp no abre:
1. Verifica que estés usando un navegador de escritorio
2. Confirma que WhatsApp Web esté disponible
3. Prueba con diferentes números de teléfono

## 📞 Contacto
Si tienes problemas durante el despliegue, revisa:
1. Los logs en Vercel Dashboard
2. La documentación en `GUIA_DESPLIEGUE_VERCEL.md`
3. El checklist en `CHECKLIST_DESPLIEGUE.md`

¡Tu aplicación estará lista para usar en producción! 🎉