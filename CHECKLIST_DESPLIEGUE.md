
# 📋 Checklist de Despliegue - Fila Virtual Goguinara

## Antes de Subir a GitHub
- [ ] Código funcionando localmente
- [ ] Variables de entorno configuradas en .env.local
- [ ] .env.local está en .gitignore
- [ ] Pruebas básicas realizadas
- [ ] Google Sheets funcionando

## Configuración de GitHub
- [ ] Repositorio creado en GitHub
- [ ] Código subido con git push
- [ ] README.md actualizado
- [ ] .gitignore configurado correctamente

## Configuración de Vercel
- [ ] Proyecto importado desde GitHub
- [ ] Variables de entorno configuradas:
  - [ ] GOOGLE_SERVICE_ACCOUNT_EMAIL
  - [ ] GOOGLE_PRIVATE_KEY (con saltos de línea)
  - [ ] GOOGLE_SHEET_ID
  - [ ] ADMIN_PASSWORD
  - [ ] NEXT_PUBLIC_APP_NAME
- [ ] Build exitoso
- [ ] Deployment funcionando

## Pruebas Post-Despliegue
- [ ] Página principal carga
- [ ] Registro de usuarios funciona
- [ ] Google Sheets se actualiza
- [ ] Panel de admin accesible
- [ ] WhatsApp Web se abre correctamente
- [ ] Responsive en móviles

## URLs de Producción
- Aplicación: https://tu-proyecto.vercel.app
- Registro: https://tu-proyecto.vercel.app/register
- Fila: https://tu-proyecto.vercel.app/queue
- Estado: https://tu-proyecto.vercel.app/status
- Admin: https://tu-proyecto.vercel.app/admin

## Variables de Entorno para Vercel
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
[TU_CLAVE_COMPLETA_AQUI]
-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=tu-sheet-id
ADMIN_PASSWORD=contraseña-segura-produccion
NEXT_PUBLIC_APP_NAME=Fila Virtual Goguinara
```

## Comandos Útiles
```bash
# Desarrollo local
npm run dev

# Desarrollo con acceso de red
npm run dev:network

# Build de producción
npm run build

# Verificar configuración
npm run test:config

# Probar conexión Google Sheets
npm run test:connection
```
