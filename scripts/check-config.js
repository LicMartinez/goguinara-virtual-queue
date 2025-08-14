// Script para verificar la configuración del proyecto
require('dotenv').config({ path: '.env.local' });

function checkConfiguration() {
  console.log('🔍 Verificando configuración del proyecto...\n');

  // Verificar variables de entorno requeridas
  const requiredVars = {
    'GOOGLE_SERVICE_ACCOUNT_EMAIL': 'Email del service account de Google',
    'GOOGLE_PRIVATE_KEY': 'Clave privada del service account',
    'GOOGLE_SHEET_ID': 'ID del Google Sheet',
    'ADMIN_PASSWORD': 'Contraseña del panel de administración'
  };

  let allConfigured = true;

  console.log('📋 Variables de entorno:');
  for (const [varName, description] of Object.entries(requiredVars)) {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: Configurado`);
      
      // Validaciones específicas
      if (varName === 'GOOGLE_SERVICE_ACCOUNT_EMAIL' && !value.includes('@')) {
        console.log(`   ⚠️  El email parece inválido`);
      }
      
      if (varName === 'GOOGLE_PRIVATE_KEY' && !value.includes('BEGIN PRIVATE KEY')) {
        console.log(`   ⚠️  La clave privada parece inválida`);
      }
      
      if (varName === 'GOOGLE_SHEET_ID' && value.length < 40) {
        console.log(`   ⚠️  El ID del sheet parece muy corto`);
      }
      
      if (varName === 'ADMIN_PASSWORD' && value.length < 8) {
        console.log(`   ⚠️  La contraseña debería tener al menos 8 caracteres`);
      }
    } else {
      console.log(`❌ ${varName}: NO CONFIGURADO - ${description}`);
      allConfigured = false;
    }
  }

  console.log('\n📦 Dependencias:');
  try {
    const packageJson = require('../package.json');
    const requiredDeps = ['next', 'react', 'google-auth-library', 'googleapis'];
    
    for (const dep of requiredDeps) {
      if (packageJson.dependencies[dep]) {
        console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
      } else {
        console.log(`❌ ${dep}: NO INSTALADO`);
        allConfigured = false;
      }
    }
  } catch (error) {
    console.log('❌ No se pudo leer package.json');
    allConfigured = false;
  }

  console.log('\n📁 Archivos importantes:');
  const fs = require('fs');
  const importantFiles = [
    '.env.local',
    'src/lib/googleSheets.ts',
    'src/app/api/register/route.ts',
    'src/app/page.tsx'
  ];

  for (const file of importantFiles) {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}: Existe`);
    } else {
      console.log(`❌ ${file}: NO EXISTE`);
      allConfigured = false;
    }
  }

  console.log('\n🎯 Resumen:');
  if (allConfigured) {
    console.log('✅ ¡Configuración completa! El proyecto debería funcionar correctamente.');
    console.log('\n🚀 Próximos pasos:');
    console.log('   1. Ejecuta: npm run dev');
    console.log('   2. Abre: http://localhost:3000');
    console.log('   3. Prueba el registro en: http://localhost:3000/register');
  } else {
    console.log('❌ Configuración incompleta. Revisa los elementos marcados arriba.');
    console.log('\n💡 Para configurar:');
    console.log('   1. Copia .env.example a .env.local');
    console.log('   2. Configura las variables de entorno');
    console.log('   3. Ejecuta: node scripts/init-sheet.js');
  }
}

checkConfiguration();