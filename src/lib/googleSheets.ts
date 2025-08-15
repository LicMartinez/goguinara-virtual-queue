import { google, sheets_v4 } from 'googleapis';

export interface SheetData {
  name: string;
  phone: string;
  timestamp: string;
  status: string;
  position?: number;
  diners?: number;
  hasAllergies?: boolean;
  allergies?: string;
}

export interface QueueEntry extends SheetData {
  id: string;
  position: number;
  diners: number;
  hasAllergies: boolean;
  allergies: string;
}

class GoogleSheetsService {
  private sheets!: sheets_v4.Sheets;
  private spreadsheetId: string;

  constructor() {
    this.validateEnvironmentVariables();
    this.initializeAuth();
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  }

  private validateEnvironmentVariables() {
    const requiredVars = ['GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_SHEET_ID'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
    }
  }

  private initializeAuth() {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({
        version: 'v4',
        auth,
      });
    } catch (error) {
      console.error('Error inicializando autenticación de Google:', error);
      throw new Error('Error de configuración de Google Sheets');
    }
  }

  async appendRowToSheet(data: SheetData): Promise<{ position: number }> {
    try {
      const range = 'Hoja 1!A:H'; // Expandido para incluir nuevos campos
      const position = await this.getNextPosition();
      
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[
            data.name, 
            data.phone, 
            data.timestamp, 
            data.status, 
            position,
            data.diners || 2,
            data.hasAllergies ? 'Sí' : 'No',
            data.allergies || ''
          ]],
        },
      });

      console.log('Fila añadida a Google Sheet:', response.data);
      return { position };
    } catch (error) {
      console.error('Error al añadir fila a Google Sheet:', error);
      throw new Error('Error al registrar en la fila virtual');
    }
  }

  async getQueueData(): Promise<QueueEntry[]> {
    try {
      const range = 'Hoja 1!A1:H1000'; // Expandido para incluir nuevos campos
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      const rows = response.data.values || [];
      const dataRows = rows.slice(1).filter(row => row && row.length > 0 && row[0]);
      
      return dataRows.map((row: string[], index: number) => ({
        id: `${index + 1}`,
        name: row[0] || '',
        phone: row[1] || '',
        timestamp: row[2] || '',
        status: row[3] || 'En Espera',
        position: parseInt(row[4]) || index + 1,
        diners: parseInt(row[5]) || 2,
        hasAllergies: row[6] === 'Sí',
        allergies: row[7] || '',
      }));
    } catch (error) {
      console.error('Error al obtener datos de la fila:', error);
      throw new Error('Error al obtener datos de la fila');
    }
  }

  async updateStatus(rowIndex: number, newStatus: string): Promise<void> {
    try {
      const range = `Hoja 1!D${rowIndex + 2}`;
      
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[newStatus]],
        },
      });

      console.log(`Estado actualizado para fila ${rowIndex + 1}: ${newStatus}`);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      throw new Error('Error al actualizar estado');
    }
  }

  private async getNextPosition(): Promise<number> {
    try {
      const queueData = await this.getQueueData();
      const waitingEntries = queueData.filter(entry => entry.status === 'En Espera');
      return waitingEntries.length + 1;
    } catch (error) {
      console.error('Error al calcular posición:', error);
      return 1;
    }
  }

  async getAverageWaitTime(): Promise<number> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Hoja 1!I1',
      });

      if (response.data.values && response.data.values[0] && response.data.values[0][0]) {
        const waitTime = parseInt(response.data.values[0][0]);
        return isNaN(waitTime) ? 5 : waitTime;
      }
      
      return 5;
    } catch (error) {
      console.error('Error al obtener tiempo promedio:', error);
      return 5;
    }
  }

  async setAverageWaitTime(minutes: number): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Hoja 1!I1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[minutes]],
        },
      });
      console.log(`Tiempo promedio actualizado a ${minutes} minutos`);
    } catch (error) {
      console.error('Error al actualizar tiempo promedio:', error);
      throw new Error('Error al actualizar tiempo promedio');
    }
  }

  async initializeSheet(): Promise<void> {
    try {
      const range = 'Hoja 1!A1:G1';
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      if (!response.data.values || response.data.values.length === 0) {
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Hoja 1!A1:I1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [['Nombre', 'Teléfono', 'Timestamp', 'Estado', 'Posición', 'Comensales', 'Alergias', 'Descripción Alergias', '5']],
          },
        });
        console.log('Headers añadidos a Google Sheet');
      } else {
        console.log('Headers existentes:', response.data.values[0]);
        if (!response.data.values[0][8]) {
          await this.setAverageWaitTime(5);
        }
      }
    } catch (error) {
      console.error('Error al inicializar sheet:', error);
    }
  }
}

// Export singleton instance
const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;

// Export individual functions for backward compatibility
export const appendRowToSheet = (data: SheetData) => googleSheetsService.appendRowToSheet(data);
export const getQueueData = () => googleSheetsService.getQueueData();
export const updateStatus = (rowIndex: number, newStatus: string) => googleSheetsService.updateStatus(rowIndex, newStatus);
export const initializeSheet = () => googleSheetsService.initializeSheet();
export const getAverageWaitTime = () => googleSheetsService.getAverageWaitTime();
export const setAverageWaitTime = (minutes: number) => googleSheetsService.setAverageWaitTime(minutes);
