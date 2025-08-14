
import { NextResponse } from 'next/server';
import { appendRowToSheet, getQueueData, getAverageWaitTime } from '@/lib/googleSheets';
import { validateRegistrationData, sanitizeInput, formatPhoneNumber } from '@/lib/validation';
import { rateLimiter } from '@/lib/rateLimit';

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!rateLimiter.isAllowed(clientIP)) {
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(clientIP) / 1000 / 60);
      return NextResponse.json(
        { 
          error: `Demasiadas solicitudes. Intenta nuevamente en ${remainingTime} minutos.`,
          retryAfter: remainingTime 
        }, 
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Formato de datos inválido' }, 
        { status: 400 }
      );
    }

    const { name: rawName, phone: rawPhone } = body;

    // Sanitize inputs
    const name = sanitizeInput(rawName || '');
    const phone = sanitizeInput(rawPhone || '');

    // Validate data
    const validation = validateRegistrationData(name, phone);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.errors }, 
        { status: 400 }
      );
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(phone);

    // Check if phone number is already in queue
    try {
      const existingQueue = await getQueueData();
      const existingEntry = existingQueue.find(
        entry => entry.phone === formattedPhone && entry.status === 'En Espera'
      );

      if (existingEntry) {
        return NextResponse.json({
          message: `Ya estás registrado en la fila. Tu posición actual es: ${existingEntry.position}`,
          position: existingEntry.position,
          alreadyRegistered: true
        }, { status: 200 });
      }
    } catch (queueError) {
      console.error('Error al verificar fila existente:', queueError);
      // Continue with registration even if we can't check existing entries
    }

    // Register in queue
    const timestamp = new Date().toISOString();
    const status = 'En Espera';

    try {
      const result = await appendRowToSheet({ 
        name: name.trim(), 
        phone: formattedPhone, 
        timestamp, 
        status 
      });

      console.log(`Datos registrados en Google Sheet: Nombre - ${name}, Teléfono - ${formattedPhone}`);

      // Get configurable average wait time
      const averageWaitTime = await getAverageWaitTime();
      const estimatedWaitTime = Math.ceil((result.position || 1) * averageWaitTime);
      
      // Simulate WhatsApp notification
      console.log(`Simulando envío de WhatsApp a ${formattedPhone}: "Hola ${name}, te has registrado en la fila virtual de Goguinara. Tu posición es ${result.position || 1} y el tiempo estimado de espera es ${estimatedWaitTime} minutos."`);

      return NextResponse.json({ 
        message: `¡Te has unido a la fila! Tu posición es ${result.position || 1}. Tiempo estimado: ${estimatedWaitTime} minutos.`,
        position: result.position || 1,
        estimatedWaitTime,
        averageWaitTime,
        phone: formattedPhone
      }, { status: 200 });

    } catch (sheetError) {
      console.error('Error al guardar en Google Sheet:', sheetError);
      return NextResponse.json(
        { error: 'Error al registrar en la fila. Intenta nuevamente.' }, 
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error en la API de registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' }, 
      { status: 500 }
    );
  }
}
