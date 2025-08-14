// Script simple para probar la conexión con Google Sheets
const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔍 Probando conexión con Google Sheets...');

    // Verificar variables de entorno
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.log('❌ Variables de entorno faltantes');
      return;
    }

    console.log('📧 Service Account:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('📄 Sheet ID:', process.env.GOOGLE_SHEET_ID);

    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({
      version: 'v4',
      auth,
    });

    // Probar acceso básico al sheet
    console.log('🔗 Intentando acceder al sheet...');
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });

    console.log('✅ Conexión exitosa!');
    console.log('📊 Título del sheet:', response.data.properties.title);
    console.log('🔢 Número de hojas:', response.data.sheets.length);
    
    // Listar las hojas disponibles
    console.log('📋 Hojas disponibles:');
    response.data.sheets.forEach((sheet, index) => {
      console.log(`   ${index + 1}. ${sheet.properties.title}`);
    });

    // Intentar leer datos básicos
    console.log('\n📖 Intentando leer datos...');
    try {
      const dataResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'A1:Z10', // Rango amplio para ver qué hay
      });

      if (dataResponse.data.values && dataResponse.data.values.length > 0) {
        console.log('✅ Datos encontrados:');
        dataResponse.data.values.slice(0, 5).forEach((row, index) => {
          console.log(`   Fila ${index + 1}:`, row);
        });
      } else {
        console.log('ℹ️  El sheet está vacío');
      }
    } catch (readError) {
      console.log('⚠️  Error al leer datos:', readError.message);
    }

  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    
    if (error.message.includes('PERMISSION_DENIED')) {
      console.log('\n💡 Posibles soluciones:');
      console.log('   1. Verifica que el service account tenga acceso al sheet');
      console.log('   2. Comparte el sheet con:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
      console.log('   3. Asegúrate de que tenga permisos de edición');
    }
    
    if (error.message.includes('NOT_FOUND')) {
      console.log('\n💡 El sheet ID parece ser incorrecto');
      console.log('   Verifica el ID en la URL del Google Sheet');
    }
  }
}

testConnection();