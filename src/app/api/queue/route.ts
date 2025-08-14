import { NextResponse } from 'next/server';
import { getQueueData, getAverageWaitTime } from '@/lib/googleSheets';

export async function GET() {
  try {
    const queueData = await getQueueData();
    const averageWaitTime = await getAverageWaitTime();
    
    // Filter and organize data
    const waitingQueue = queueData
      .filter(entry => entry.status === 'En Espera')
      .sort((a, b) => a.position - b.position);
    
    const currentlyServing = queueData.find(entry => entry.status === 'Siendo Atendido');
    
    const stats = {
      totalWaiting: waitingQueue.length,
      currentlyServing: currentlyServing ? {
        name: currentlyServing.name,
        position: currentlyServing.position
      } : null,
      estimatedWaitTime: waitingQueue.length * averageWaitTime,
      averageWaitTime
    };

    return NextResponse.json({
      queue: waitingQueue.map((entry, index) => ({
        position: entry.position,
        name: entry.name.charAt(0) + '*'.repeat(entry.name.length - 1), // Privacy protection
        timestamp: entry.timestamp,
        estimatedWaitTime: (index + 1) * averageWaitTime
      })),
      stats
    });

  } catch (error) {
    console.error('Error al obtener datos de la fila:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos de la fila' },
      { status: 500 }
    );
  }
}