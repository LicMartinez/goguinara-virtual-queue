// Script para inicializar Google Sheet con headers
const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function initializeSheet() {
  try {
    console.log('🚀 Inicializando Google Sheet...');

    // Verificar variables de entorno
    const requiredVars = ['GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_SHEET_ID'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.log('❌ Variables de entorno faltantes:', missing.join(', '));
      console.log('💡 Asegúrate de configurar el archivo .env.local');
      return;
    }

    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({
      version: 'v4',
      auth,
    });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Verificar si ya tiene headers
    console.log('📋 Verificando headers existentes...');
    const range = 'Sheet1!A1:E1';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    if (!response.data.values || response.data.values.length === 0) {
      console.log('📝 Añadiendo headers...');
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['Nombre', 'Teléfono', 'Timestamp', 'Estado', 'Posición']],
        },
      });
      console.log('✅ Headers añadidos correctamente');
    } else {
      console.log('✅ Headers ya existen:', response.data.values[0]);
    }

    // Añadir algunos datos de prueba
    console.log('🧪 Añadiendo datos de prueba...');
    const testData = [
      ['María García', '+573001111111', new Date().toISOString(), 'En Espera', 1],
      ['Carlos López', '+573002222222', new Date().toISOString(), 'En Espera', 2],
      ['Ana Rodríguez', '+573003333333', new Date().toISOString(), 'Siendo Atendido', 3],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: testData,
      },
    });

    console.log('✅ Datos de prueba añadidos');
    console.log('🎉 Google Sheet inicializado correctamente!');
    console.log(`📊 Puedes ver el sheet en: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  } catch (error) {
    console.error('❌ Error al inicializar Google Sheet:', error.message);
    
    if (error.message.includes('PERMISSION_DENIED')) {
      console.log('💡 Asegúrate de:');
      console.log('   1. Haber compartido el Google Sheet con el service account email');
      console.log('   2. Que el service account tenga permisos de edición');
    }
    
    if (error.message.includes('INVALID_ARGUMENT')) {
      console.log('💡 Verifica que el GOOGLE_SHEET_ID sea correcto');
    }
  }
}

initializeSheet();