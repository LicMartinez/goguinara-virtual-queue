import { NextResponse } from 'next/server';
import { getQueueData, updateStatus, getAverageWaitTime, setAverageWaitTime } from '@/lib/googleSheets';

function validateAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD no está configurado');
    return false;
  }
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  return token === adminPassword;
}

export async function GET(request: Request) {
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    );
  }

  try {
    const queueData = await getQueueData();
    const averageWaitTime = await getAverageWaitTime();
    
    const organized = {
      waiting: queueData.filter(entry => entry.status === 'En Espera').sort((a, b) => a.position - b.position),
      serving: queueData.filter(entry => entry.status === 'Siendo Atendido'),
      completed: queueData.filter(entry => entry.status === 'Atendido'),
      cancelled: queueData.filter(entry => entry.status === 'Cancelado'),
      averageWaitTime
    };

    return NextResponse.json(organized);

  } catch (error) {
    console.error('Error al obtener datos de administración:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    );
  }

  try {
    const { action, rowIndex, newStatus, averageWaitTime, phone, tableCode } = await request.json();

    if (action === 'updateStatus' && typeof rowIndex === 'number' && newStatus) {
      await updateStatus(rowIndex, newStatus);
      return NextResponse.json({ message: 'Estado actualizado correctamente' });
    }

    if (action === 'setAverageWaitTime' && typeof averageWaitTime === 'number' && averageWaitTime > 0) {
      await setAverageWaitTime(averageWaitTime);
      return NextResponse.json({ 
        message: `Tiempo promedio actualizado a ${averageWaitTime} minutos`,
        averageWaitTime 
      });
    }

    if (action === 'assignTable' && typeof phone === 'string' && typeof tableCode === 'string') {
      const queueData = await getQueueData();
      const entryIndex = queueData.findIndex(entry => entry.phone === phone);
      
      if (entryIndex === -1) {
        return NextResponse.json(
          { error: 'Persona no encontrada en la fila' },
          { status: 404 }
        );
      }

      // Actualizar estado a "Atendido" y agregar información de mesa
      await updateStatus(entryIndex, `Mesa ${tableCode} asignada`);
      
      return NextResponse.json({
        message: `Mesa ${tableCode} asignada correctamente`,
        tableCode,
        person: queueData[entryIndex]
      });
    }

    return NextResponse.json(
      { error: 'Acción no válida' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error en acción de administración:', error);
    return NextResponse.json(
      { error: 'Error al procesar acción' },
      { status: 500 }
    );
  }
}