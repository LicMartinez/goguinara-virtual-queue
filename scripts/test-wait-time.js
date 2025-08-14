// Script para probar la configuración del tiempo promedio de espera
const BASE_URL = 'http://localhost:3001';
const ADMIN_PASSWORD = 'admin123secure'; // Cambiar por la contraseña real

async function testWaitTimeConfiguration() {
  console.log('🧪 Probando configuración de tiempo promedio...\n');

  // 1. Obtener estado actual
  console.log('1️⃣ Obteniendo configuración actual...');
  try {
    const response = await fetch(`${BASE_URL}/api/admin`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Tiempo promedio actual: ${data.averageWaitTime} minutos`);
    } else {
      console.log('❌ Error al obtener configuración actual');
      return;
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    return;
  }

  // 2. Cambiar tiempo promedio a 10 minutos
  console.log('\n2️⃣ Cambiando tiempo promedio a 10 minutos...');
  try {
    const response = await fetch(`${BASE_URL}/api/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify({
        action: 'setAverageWaitTime',
        averageWaitTime: 10
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Tiempo promedio actualizado a 10 minutos');
    } else {
      console.log('❌ Error al actualizar:', data.error);
      return;
    }
  } catch (error) {
    console.log('❌ Error al actualizar:', error.message);
    return;
  }

  // 3. Registrar una persona para probar el nuevo tiempo
  console.log('\n3️⃣ Registrando persona de prueba...');
  try {
    const response = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Prueba Tiempo',
        phone: '3009999999'
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log(`✅ Persona registrada - Posición: ${data.position}`);
      console.log(`⏱️  Tiempo estimado: ${data.estimatedWaitTime} minutos`);
      console.log(`📊 Tiempo promedio usado: ${data.averageWaitTime} min/persona`);
      
      // Verificar que el cálculo sea correcto
      const expectedTime = data.position * data.averageWaitTime;
      if (data.estimatedWaitTime === expectedTime) {
        console.log('✅ Cálculo de tiempo correcto');
      } else {
        console.log(`⚠️  Cálculo incorrecto. Esperado: ${expectedTime}, Obtenido: ${data.estimatedWaitTime}`);
      }
    } else {
      console.log('❌ Error al registrar:', data.error);
    }
  } catch (error) {
    console.log('❌ Error al registrar:', error.message);
  }

  // 4. Verificar en la fila pública
  console.log('\n4️⃣ Verificando en fila pública...');
  try {
    const response = await fetch(`${BASE_URL}/api/queue`);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Tiempo promedio en fila pública: ${data.stats.averageWaitTime} min/persona`);
      console.log(`📊 Tiempo total estimado: ${data.stats.estimatedWaitTime} minutos`);
      
      if (data.stats.averageWaitTime === 10) {
        console.log('✅ Configuración aplicada correctamente en fila pública');
      } else {
        console.log('⚠️  La configuración no se reflejó en la fila pública');
      }
    } else {
      console.log('❌ Error al obtener fila pública:', data.error);
    }
  } catch (error) {
    console.log('❌ Error al verificar fila pública:', error.message);
  }

  // 5. Cambiar de vuelta a 5 minutos
  console.log('\n5️⃣ Restaurando tiempo promedio a 5 minutos...');
  try {
    const response = await fetch(`${BASE_URL}/api/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_PASSWORD}`
      },
      body: JSON.stringify({
        action: 'setAverageWaitTime',
        averageWaitTime: 5
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Tiempo promedio restaurado a 5 minutos');
    } else {
      console.log('❌ Error al restaurar:', data.error);
    }
  } catch (error) {
    console.log('❌ Error al restaurar:', error.message);
  }

  console.log('\n🎉 Prueba de configuración de tiempo completada!');
}

// Función para probar diferentes tiempos
async function testMultipleWaitTimes() {
  console.log('🧪 Probando múltiples configuraciones de tiempo...\n');
  
  const tiempos = [3, 7, 15, 20];
  
  for (const tiempo of tiempos) {
    console.log(`⏱️  Probando ${tiempo} minutos...`);
    
    try {
      // Cambiar tiempo
      const response = await fetch(`${BASE_URL}/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify({
          action: 'setAverageWaitTime',
          averageWaitTime: tiempo
        })
      });

      if (response.ok) {
        console.log(`✅ Configurado a ${tiempo} minutos`);
        
        // Verificar en fila pública
        const queueResponse = await fetch(`${BASE_URL}/api/queue`);
        const queueData = await queueResponse.json();
        
        if (queueResponse.ok && queueData.stats.averageWaitTime === tiempo) {
          console.log(`✅ Verificado en fila pública: ${tiempo} min/persona`);
        } else {
          console.log(`❌ No se reflejó correctamente en fila pública`);
        }
      } else {
        console.log(`❌ Error configurando ${tiempo} minutos`);
      }
    } catch (error) {
      console.log(`❌ Error con ${tiempo} minutos:`, error.message);
    }
    
    // Pausa entre pruebas
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Restaurar a 5 minutos
  await fetch(`${BASE_URL}/api/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_PASSWORD}`
    },
    body: JSON.stringify({
      action: 'setAverageWaitTime',
      averageWaitTime: 5
    })
  });
  
  console.log('\n🎯 Pruebas múltiples completadas!');
}

// Ejecutar pruebas
console.log('Selecciona la prueba a ejecutar:');
console.log('1. Prueba básica de configuración');
console.log('2. Prueba múltiples tiempos');

// Por defecto ejecutar prueba básica
testWaitTimeConfiguration().catch(error => {
  console.log('❌ Error general:', error.message);
  console.log('💡 Asegúrate de que:');
  console.log('   - El servidor esté corriendo en http://localhost:3001');
  console.log('   - La contraseña de admin sea correcta');
});