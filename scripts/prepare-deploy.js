// Script para preparar el proyecto para despliegue
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparando proyecto para despliegue...\n');

// 1. Verificar archivos críticos
const criticalFiles = [
  'package.json',
  'next.config.ts',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/lib/googleSheets.ts',
  '.env.example',
  'vercel.json'
];

console.log('📁 Verificando archivos críticos...');
let allFilesExist = true;

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTANTE`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Faltan archivos críticos. No se puede continuar.');
  process.exit(1);
}

// 2. Verificar .gitignore
console.log('\n🔒 Verificando .gitignore...');
const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
const requiredIgnores = ['.env.local', '.env', 'node_modules', '.next'];

requiredIgnores.forEach(ignore => {
  if (gitignoreContent.includes(ignore)) {
    console.log(`✅ ${ignore} está en .gitignore`);
  } else {
    console.log(`⚠️  ${ignore} NO está en .gitignore`);
  }
});

// 3. Verificar que .env.local no esté en el repositorio
if (fs.existsSync('.env.local')) {
  console.log('\n⚠️  ADVERTENCIA: .env.local existe localmente');
  console.log('   Asegúrate de que esté en .gitignore y NO se suba a GitHub');
} else {
  console.log('\n✅ .env.local no existe (correcto para despliegue)');
}

// 4. Crear checklist de despliegue
const checklist = `
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
\`\`\`
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
[TU_CLAVE_COMPLETA_AQUI]
-----END PRIVATE KEY-----
GOOGLE_SHEET_ID=tu-sheet-id
ADMIN_PASSWORD=contraseña-segura-produccion
NEXT_PUBLIC_APP_NAME=Fila Virtual Goguinara
\`\`\`

## Comandos Útiles
\`\`\`bash
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
\`\`\`
`;

fs.writeFileSync('CHECKLIST_DESPLIEGUE.md', checklist);
console.log('\n📋 Checklist de despliegue creado: CHECKLIST_DESPLIEGUE.md');

// 5. Verificar build local
console.log('\n🔨 Verificando build local...');
try {
  const { execSync } = require('child_process');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build local exitoso');
} catch (error) {
  console.log('❌ Error en build local');
  console.log('   Soluciona los errores antes de desplegar');
  process.exit(1);
}

// 6. Resumen final
console.log('\n🎉 Proyecto preparado para despliegue!');
console.log('\n📋 Próximos pasos:');
console.log('1. Revisa CHECKLIST_DESPLIEGUE.md');
console.log('2. Sigue GUIA_DESPLIEGUE_VERCEL.md');
console.log('3. Configura variables de entorno en Vercel');
console.log('4. ¡Despliega y prueba!');

console.log('\n🔗 Archivos de ayuda creados:');
console.log('- GUIA_CONFIGURACION_LOCAL.md');
console.log('- GUIA_DESPLIEGUE_VERCEL.md');
console.log('- CHECKLIST_DESPLIEGUE.md');
console.log('- vercel.json');