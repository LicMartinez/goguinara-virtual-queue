// Prueba simple de la API
async function testSimple() {
  console.log('🧪 Probando API en http://localhost:3001...\n');

  try {
    // Test básico de conectividad
    const response = await fetch('http://localhost:3001/api/queue');
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API funcionando correctamente');
      console.log('📊 Estado de la fila:', data);
    } else {
      console.log('❌ Error en API:', data);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    console.log('💡 Asegúrate de que el servidor esté corriendo con: npm run dev');
  }
}

testSimple();