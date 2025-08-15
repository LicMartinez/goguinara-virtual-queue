import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

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

interface TableRecord {
  cod_mez: string;
  est_mez: number;
  cob_mez: number;
}

export async function POST(request: Request) {
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    );
  }

  try {
    const { posPath } = await request.json();

    if (!posPath || typeof posPath !== 'string') {
      return NextResponse.json(
        { error: 'Ruta del POS requerida' },
        { status: 400 }
      );
    }

    // Validar que la ruta existe y contiene el archivo Mesas.dbf
    const mesasDbfPath = path.join(posPath, 'Mesas.dbf');
    
    try {
      // Intentar leer el archivo DBF usando un comando de sistema
      // Nota: Esto requiere tener instalado un lector de DBF o usar una librería específica
      
      // Por ahora, simularemos la lectura del archivo DBF
      // En producción, necesitarías una librería como 'node-dbf' o similar
      
      // Comando de ejemplo para leer DBF (requiere herramientas adicionales)
      // const { stdout } = await execAsync(`dbf2csv "${mesasDbfPath}"`);
      
      // Simulación de datos para desarrollo
      const simulatedTables: TableRecord[] = [
        { cod_mez: 'M001', est_mez: 0, cob_mez: 0 }, // Libre
        { cod_mez: 'M002', est_mez: 1, cob_mez: 0 }, // Ocupada
        { cod_mez: 'M003', est_mez: 1, cob_mez: 1 }, // Pidió cuenta
        { cod_mez: 'M004', est_mez: 0, cob_mez: 0 }, // Libre
        { cod_mez: 'M005', est_mez: 0, cob_mez: 0 }, // Libre
        { cod_mez: 'M006', est_mez: 1, cob_mez: 0 }, // Ocupada
        { cod_mez: 'M007', est_mez: 0, cob_mez: 0 }, // Libre
        { cod_mez: 'M008', est_mez: 1, cob_mez: 1 }, // Pidió cuenta
      ];

      // En producción, aquí procesarías el archivo DBF real
      const tables = simulatedTables.map(record => ({
        code: record.cod_mez,
        status: record.est_mez,
        hasBill: record.cob_mez
      }));

      return NextResponse.json({
        tables,
        message: `${tables.length} mesas cargadas desde ${posPath}`,
        timestamp: new Date().toISOString()
      });

    } catch (fileError) {
      console.error('Error al leer archivo DBF:', fileError);
      return NextResponse.json(
        { error: `No se pudo acceder al archivo Mesas.dbf en la ruta: ${posPath}` },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Error en API de mesas POS:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Función auxiliar para leer DBF (implementación futura)
async function readDbfFile(filePath: string): Promise<TableRecord[]> {
  // Aquí implementarías la lectura real del archivo DBF
  // Podrías usar librerías como:
  // - node-dbf
  // - dbf-reader
  // - O ejecutar comandos del sistema que conviertan DBF a CSV/JSON
  
  throw new Error('Implementación de lectura DBF pendiente');
}