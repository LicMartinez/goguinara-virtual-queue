import { NextResponse } from 'next/server';
import { getQueueData, getAverageWaitTime } from '@/lib/googleSheets';
import { formatPhoneNumber } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Número de teléfono requerido' },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhoneNumber(phone);
    const queueData = await getQueueData();
    const averageWaitTime = await getAverageWaitTime();
    
    const userEntry = queueData.find(entry => entry.phone === formattedPhone);

    if (!userEntry) {
      return NextResponse.json(
        { error: 'No se encontró registro con este número de teléfono' },
        { status: 404 }
      );
    }

    // Calculate position in waiting queue
    const waitingQueue = queueData
      .filter(entry => entry.status === 'En Espera')
      .sort((a, b) => a.position - b.position);
    
    const currentPosition = waitingQueue.findIndex(entry => entry.phone === formattedPhone) + 1;
    const estimatedWaitTime = currentPosition > 0 ? currentPosition * averageWaitTime : 0;

    return NextResponse.json({
      name: userEntry.name,
      status: userEntry.status,
      originalPosition: userEntry.position,
      currentPosition: currentPosition > 0 ? currentPosition : null,
      estimatedWaitTime,
      averageWaitTime,
      timestamp: userEntry.timestamp
    });

  } catch (error) {
    console.error('Error al verificar estado:', error);
    return NextResponse.json(
      { error: 'Error al verificar estado' },
      { status: 500 }
    );
  }
}