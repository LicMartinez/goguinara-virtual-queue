// Script para probar el sistema con más de 50 personas
const BASE_URL = 'http://localhost:3001';

// Generar nombres aleatorios
const nombres = [
  'María García', 'Carlos López', 'Ana Rodríguez', 'Luis Martínez', 'Carmen Sánchez',
  'José González', 'Isabel Fernández', 'Antonio Pérez', 'Pilar Ruiz', 'Francisco Díaz',
  'Teresa Moreno', 'Manuel Jiménez', 'Rosa Álvarez', 'Pedro Romero', 'Dolores Navarro',
  'Juan Torres', 'Concepción Domínguez', 'Ángel Vázquez', 'Josefa Ramos', 'Alejandro Gil',
  'Mercedes Serrano', 'Rafael Blanco', 'Antonia Molina', 'Tomás Morales', 'Francisca Ortega',
  'Daniel Delgado', 'Paula Castro', 'Javier Ortiz', 'Lucía Rubio', 'Miguel Sanz',
  'Elena Iglesias', 'Sergio Guerrero', 'Cristina Cano', 'Rubén Prieto', 'Silvia Méndez',
  'Adrián Cruz', 'Natalia Flores', 'Iván Herrera', 'Beatriz Gallego', 'Óscar Peña',
  'Mónica Santana', 'Víctor Lozano', 'Raquel Giménez', 'Gonzalo Marín', 'Nuria Vargas',
  'Marcos Castillo', 'Irene León', 'Pablo Herrero', 'Esther Cabrera', 'Diego Bernal',
  'Alicia Vega', 'Álvaro Román', 'Rocío Ibáñez', 'Emilio Garrido', 'Amparo Carmona'
];

async function registerPerson(name, phone) {
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${name} registrado - Posición: ${data.position}, Tiempo: ${data.estimatedWaitTime}min`);
      return { success: true, data };
    } else {
      console.log(`❌ Error registrando ${name}: ${data.error}`);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.log(`❌ Error de conexión para ${name}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testLargeQueue() {
  console.log('🧪 Iniciando prueba con más de 50 personas...\n');

  const totalPersonas = 55; // Más de 50 para probar el límite
  const registros = [];

  console.log(`📝 Registrando ${totalPersonas} personas...`);

  for (let i = 0; i < totalPersonas; i++) {
    const nombre = nombres[i % nombres.length] + ` ${Math.floor(i / nombres.length) + 1}`;
    const telefono = `300${String(1000000 + i).padStart(7, '0')}`;
    
    const resultado = await registerPerson(nombre, telefono);
    registros.push(resultado);

    // Pequeña pausa para no sobrecargar el servidor
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Resumen de resultados
  const exitosos = registros.filter(r => r.success).length;
  const fallidos = registros.filter(r => !r.success).length;

  console.log('\n📊 Resumen de registros:');
  console.log(`✅ Exitosos: ${exitosos}`);
  console.log(`❌ Fallidos: ${fallidos}`);

  if (exitosos > 50) {
    console.log('🎉 ¡Éxito! El sistema puede manejar más de 50 personas');
  } else {
    console.log('⚠️  El sistema parece tener limitaciones');
  }

  // Verificar estado de la fila
  console.log('\n🔍 Verificando estado de la fila...');
  try {
    const response = await fetch(`${BASE_URL}/api/queue`);
    const queueData = await response.json();
    
    if (response.ok) {
      console.log(`📋 Total en fila: ${queueData.stats.totalWaiting}`);
      console.log(`⏱️  Tiempo promedio: ${queueData.stats.averageWaitTime} min/persona`);
      console.log(`🕐 Tiempo total estimado: ${queueData.stats.estimatedWaitTime} minutos`);
      
      if (queueData.queue.length > 50) {
        console.log('✅ Confirmado: Más de 50 personas en la fila');
      }
    } else {
      console.log('❌ Error al obtener estado de la fila:', queueData.error);
    }
  } catch (error) {
    console.log('❌ Error al verificar fila:', error.message);
  }

  console.log('\n🎯 Prueba completada!');
}

// Función para limpiar la fila (opcional)
async function clearQueue() {
  console.log('🧹 Esta función requiere acceso directo a Google Sheets para limpiar datos');
  console.log('💡 Puedes limpiar manualmente el Google Sheet si necesitas reiniciar');
}

// Ejecutar prueba
testLargeQueue().catch(error => {
  console.log('❌ Error general:', error.message);
  console.log('💡 Asegúrate de que el servidor esté corriendo en http://localhost:3001');
});