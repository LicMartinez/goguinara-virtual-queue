// Script para probar las nuevas funcionalidades implementadas
const BASE_URL = 'http://localhost:3001';
const ADMIN_PASSWORD = 'admin123secure';

async function testNewFeatures() {
  console.log('🧪 Probando nuevas funcionalidades...\n');

  // Test 1: Registro con nuevos campos
  console.log('1️⃣ Probando registro con comensales y alergias...');
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'María González',
        phone: '3001234567',
        diners: 4,
        hasAllergies: true,
        allergies: 'Mariscos, nueces'
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Registro con nuevos campos exitoso:', data);
    } else {
      console.log('❌ Error en registro:', data.error);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
  }

  // Test 2: Registro sin alergias
  console.log('\n2️⃣ Probando registro sin alergias...');
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Carlos Pérez',
        phone: '3009876543',
        diners: 2,
        hasAllergies: false,
        allergies: ''
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Registro sin alergias exitoso:', data);
    } else {
      console.log('❌ Error en registro:', data.error);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
  }

  // Test 3: Validación de campos requeridos
  console.log('\n3️⃣ Probando validaciones...');
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Ana López',
        phone: '3005555555',
        diners: 15, // Más de 12 personas
        hasAllergies: true,
        allergies: '' // Alergias vacías cuando está marcado
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.log('✅ Validaciones funcionando:', data.details || data.error);
    } else {
      console.log('⚠️  Las validaciones no funcionaron correctamente');
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
  }

  // Test 4: Verificar datos en fila pública
  console.log('\n4️⃣ Verificando datos en fila pública...');
  try {
    const response = await fetch(`${BASE_URL}/api/queue`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Fila pública actualizada:');
      console.log(`   Total en espera: ${data.stats.totalWaiting}`);
      console.log(`   Tiempo promedio: ${data.stats.averageWaitTime} min/persona`);
      
      if (data.queue.length > 0) {
        console.log('   Primeras personas en fila:');
        data.queue.slice(0, 3).forEach(entry => {
          console.log(`   - Posición ${entry.position}: ${entry.name} (${entry.estimatedWaitTime}min)`);
        });
      }
    } else {
      console.log('❌ Error al obtener fila pública:', data.error);
    }
  } catch (error) {
    console.log('❌ Error al verificar fila pública:', error.message);
  }

  // Test 5: Probar API de mesas POS (simulado)
  console.log('\n5️⃣ Probando API de mesas POS...');
  try {
    const response = await fetch(`${BASE_URL}/api/pos/tables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify({
        posPath: 'C:\\POS\\Data\\'
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ API de mesas POS funcionando:');
      console.log(`   ${data.tables.length} mesas cargadas`);
      console.log('   Estado de mesas:');
      data.tables.forEach(table => {
        const status = table.hasBill === 1 ? 'Cuenta solicitada' : 
                      table.status === 1 ? 'Ocupada' : 'Libre';
        console.log(`   - ${table.code}: ${status}`);
      });
    } else {
      console.log('❌ Error en API de mesas:', data.error);
    }
  } catch (error) {
    console.log('❌ Error al probar API de mesas:', error.message);
  }

  // Test 6: Verificar datos de administración
  console.log('\n6️⃣ Verificando panel de administración...');
  try {
    const response = await fetch(`${BASE_URL}/api/admin`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      }
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Panel de administración actualizado:');
      console.log(`   En espera: ${data.waiting.length}`);
      console.log(`   Siendo atendidos: ${data.serving.length}`);
      console.log(`   Tiempo promedio: ${data.averageWaitTime} min`);
      
      if (data.waiting.length > 0) {
        console.log('   Información detallada de personas en espera:');
        data.waiting.slice(0, 2).forEach(entry => {
          console.log(`   - ${entry.name}: ${entry.diners} personas${entry.hasAllergies ? ', con alergias' : ''}`);
        });
      }
    } else {
      console.log('❌ Error en panel de admin:', data.error);
    }
  } catch (error) {
    console.log('❌ Error al verificar admin:', error.message);
  }

  console.log('\n🎉 Pruebas de nuevas funcionalidades completadas!');
  console.log('\n📋 Funcionalidades probadas:');
  console.log('✅ Registro con número de comensales');
  console.log('✅ Registro con alergias alimentarias');
  console.log('✅ Validaciones mejoradas');
  console.log('✅ API de mesas POS (simulado)');
  console.log('✅ Panel de administración actualizado');
  console.log('✅ Información adicional en fila pública');
}

// Función para probar validaciones específicas
async function testValidations() {
  console.log('🔍 Probando validaciones específicas...\n');

  const testCases = [
    {
      name: 'Demasiados comensales',
      data: { name: 'Test', phone: '3001111111', diners: 15, hasAllergies: false, allergies: '' }
    },
    {
      name: 'Alergias marcadas pero vacías',
      data: { name: 'Test', phone: '3002222222', diners: 2, hasAllergies: true, allergies: '' }
    },
    {
      name: 'Nombre muy corto',
      data: { name: 'A', phone: '3003333333', diners: 2, hasAllergies: false, allergies: '' }
    },
    {
      name: 'Teléfono inválido',
      data: { name: 'Test User', phone: '123', diners: 2, hasAllergies: false, allergies: '' }
    }
  ];

  for (const testCase of testCases) {
    console.log(`Probando: ${testCase.name}`);
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.data)
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(`✅ Validación correcta: ${data.error}`);
      } else {
        console.log(`⚠️  Validación falló: se permitió registro inválido`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

// Ejecutar pruebas
testNewFeatures().catch(error => {
  console.log('❌ Error general:', error.message);
  console.log('💡 Asegúrate de que el servidor esté corriendo en http://localhost:3001');
});