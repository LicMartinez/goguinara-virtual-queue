<<<<<<< HEAD
// Script de prueba para verificar la funcionalidad de la API
const BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Iniciando pruebas de la API...\n');

  // Test 1: Registrar un usuario
  console.log('1️⃣ Probando registro de usuario...');
  try {
    const registerResponse = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Juan Pérez',
        phone: '3001234567'
      })
    });

    const registerData = await registerResponse.json();
    console.log('✅ Registro exitoso:', registerData);
  } catch (error) {
    console.log('❌ Error en registro:', error.message);
  }

  // Test 2: Verificar estado de la fila
  console.log('\n2️⃣ Probando estado de la fila...');
  try {
    const queueResponse = await fetch(`${BASE_URL}/api/queue`);
    const queueData = await queueResponse.json();
    console.log('✅ Estado de la fila:', queueData);
  } catch (error) {
    console.log('❌ Error al obtener fila:', error.message);
  }

  // Test 3: Verificar estado individual
  console.log('\n3️⃣ Probando verificación de estado individual...');
  try {
    const statusResponse = await fetch(`${BASE_URL}/api/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '3001234567'
      })
    });

    const statusData = await statusResponse.json();
    console.log('✅ Estado individual:', statusData);
  } catch (error) {
    console.log('❌ Error al verificar estado:', error.message);
  }

  // Test 4: Probar validaciones
  console.log('\n4️⃣ Probando validaciones...');
  try {
    const invalidResponse = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
        phone: '123'
      })
    });

    const invalidData = await invalidResponse.json();
    console.log('✅ Validación funcionando:', invalidData);
  } catch (error) {
    console.log('❌ Error en validación:', error.message);
  }

  console.log('\n🎉 Pruebas completadas!');
}

// Ejecutar pruebas solo si el servidor está corriendo
testAPI().catch(error => {
  console.log('❌ Error general:', error.message);
  console.log('💡 Asegúrate de que el servidor esté corriendo con: npm run dev');
=======
// Script de prueba para verificar la funcionalidad de la API
const BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Iniciando pruebas de la API...\n');

  // Test 1: Registrar un usuario
  console.log('1️⃣ Probando registro de usuario...');
  try {
    const registerResponse = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Juan Pérez',
        phone: '3001234567'
      })
    });

    const registerData = await registerResponse.json();
    console.log('✅ Registro exitoso:', registerData);
  } catch (error) {
    console.log('❌ Error en registro:', error.message);
  }

  // Test 2: Verificar estado de la fila
  console.log('\n2️⃣ Probando estado de la fila...');
  try {
    const queueResponse = await fetch(`${BASE_URL}/api/queue`);
    const queueData = await queueResponse.json();
    console.log('✅ Estado de la fila:', queueData);
  } catch (error) {
    console.log('❌ Error al obtener fila:', error.message);
  }

  // Test 3: Verificar estado individual
  console.log('\n3️⃣ Probando verificación de estado individual...');
  try {
    const statusResponse = await fetch(`${BASE_URL}/api/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '3001234567'
      })
    });

    const statusData = await statusResponse.json();
    console.log('✅ Estado individual:', statusData);
  } catch (error) {
    console.log('❌ Error al verificar estado:', error.message);
  }

  // Test 4: Probar validaciones
  console.log('\n4️⃣ Probando validaciones...');
  try {
    const invalidResponse = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
        phone: '123'
      })
    });

    const invalidData = await invalidResponse.json();
    console.log('✅ Validación funcionando:', invalidData);
  } catch (error) {
    console.log('❌ Error en validación:', error.message);
  }

  console.log('\n🎉 Pruebas completadas!');
}

// Ejecutar pruebas solo si el servidor está corriendo
testAPI().catch(error => {
  console.log('❌ Error general:', error.message);
  console.log('💡 Asegúrate de que el servidor esté corriendo con: npm run dev');
>>>>>>> 39b3e8a615fe1a5d87fdebb326404636e2620585
});