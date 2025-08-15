'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface QueueEntry {
  id: string;
  name: string;
  phone: string;
  timestamp: string;
  status: string;
  position: number;
  diners: number;
  hasAllergies: boolean;
  allergies: string;
}

interface TableInfo {
  code: string;
  status: number; // 0 = libre, 1 = ocupada
  hasBill: number; // 0 = no pidió cuenta, 1 = pidió cuenta
}

interface AdminData {
  waiting: QueueEntry[];
  serving: QueueEntry[];
  completed: QueueEntry[];
  cancelled: QueueEntry[];
  averageWaitTime: number;
}

export default function AdminPage() {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [newWaitTime, setNewWaitTime] = useState<number>(5);
  const [isUpdatingWaitTime, setIsUpdatingWaitTime] = useState(false);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [posPath, setPosPath] = useState('');
  const [isLoadingTables, setIsLoadingTables] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>('');

  const authenticate = async () => {
    setIsAuthenticating(true);
    setError('');

    try {
      const response = await fetch('/api/admin', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        const data = await response.json();
        setAdminData(data);
      } else {
        setError('Contraseña incorrecta');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    } finally {
      setIsAuthenticating(false);
      setIsLoading(false);
    }
  };

  const fetchAdminData = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch('/api/admin', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdminData(data);
      } else {
        setError('Error al cargar datos');
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    }
  }, [isAuthenticated, password]);

  const loadTables = useCallback(async () => {
    if (!posPath.trim()) {
      alert('Por favor configura la ruta del POS primero');
      return;
    }

    setIsLoadingTables(true);
    try {
      const response = await fetch('/api/pos/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ posPath })
      });

      const data = await response.json();
      if (response.ok) {
        setTables(data.tables || []);
      } else {
        alert(data.error || 'Error al cargar mesas del POS');
      }
    } catch (error) {
      alert('Error al conectar con el POS');
    } finally {
      setIsLoadingTables(false);
    }
  }, [posPath, password]);

  const assignTable = async (phone: string, tableCode: string) => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          action: 'assignTable',
          phone,
          tableCode
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Mesa ${tableCode} asignada correctamente`);
        fetchAdminData();
        loadTables(); // Recargar estado de mesas
      } else {
        alert(data.error || 'Error al asignar mesa');
      }
    } catch (error) {
      alert('Error al asignar mesa');
    }
  };

  const getTableColor = (table: TableInfo) => {
    if (table.hasBill === 1) return 'bg-blue-100 border-blue-300 text-blue-800'; // Pidió cuenta
    if (table.status === 1) return 'bg-red-100 border-red-300 text-red-800'; // Ocupada
    return 'bg-green-100 border-green-300 text-green-800'; // Libre
  };

  const getTableStatus = (table: TableInfo) => {
    if (table.hasBill === 1) return 'Cuenta solicitada';
    if (table.status === 1) return 'Ocupada';
    return 'Libre';
  };

  const updateStatus = async (rowIndex: number, newStatus: string) => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          action: 'updateStatus',
          rowIndex,
          newStatus
        })
      });

      if (response.ok) {
        fetchAdminData();
      } else {
        const data = await response.json();
        alert(data.error || 'Error al actualizar estado');
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    }
  };

  const updateAverageWaitTime = async () => {
    if (newWaitTime <= 0) {
      alert('El tiempo debe ser mayor a 0 minutos');
      return;
    }

    setIsUpdatingWaitTime(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          action: 'setAverageWaitTime',
          averageWaitTime: newWaitTime
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Tiempo promedio actualizado a ${newWaitTime} minutos`);
        fetchAdminData();
      } else {
        alert(data.error || 'Error al actualizar tiempo promedio');
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    } finally {
      setIsUpdatingWaitTime(false);
    }
  };

  const sendWhatsAppMessage = (phone: string, name: string, position: number, diners: number, allergies?: string) => {
    // Limpiar el número de teléfono (remover espacios, guiones, etc.)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Mensaje personalizado con información adicional
    let message = `Hola ${name}! 👋\n\nTu turno ha llegado en Goguinara. Por favor dirígete a tu mesa.\n\n📍 Tu número de turno: ${position}\n👥 Mesa para ${diners} ${diners === 1 ? 'persona' : 'personas'}\n⏰ Es tu momento de ser atendido`;
    
    if (allergies) {
      message += `\n🚨 Alergias reportadas: ${allergies}`;
    }
    
    message += `\n\n¡Gracias por tu paciencia!`;
    
    // Detectar si es dispositivo móvil y si WhatsApp está instalado
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
      // Intentar abrir la app nativa de WhatsApp
      whatsappUrl = `whatsapp://send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
      
      // Fallback a WhatsApp Web si la app no está disponible
      const fallbackUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
      
      // Intentar abrir la app nativa
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.click();
      
      // Fallback después de un breve delay
      setTimeout(() => {
        window.open(fallbackUrl, '_blank');
      }, 1000);
    } else {
      // En desktop, usar WhatsApp Web directamente
      whatsappUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const updateToServing = (phone: string) => {
    const queueData = adminData?.waiting || [];
    const entryIndex = queueData.findIndex(entry => entry.phone === phone);
    if (entryIndex !== -1) {
      updateStatus(entryIndex, 'Siendo Atendido');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
      const interval = setInterval(fetchAdminData, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchAdminData]);

  // Initialize wait time when admin data is loaded
  useEffect(() => {
    if (adminData && adminData.averageWaitTime) {
      setNewWaitTime(adminData.averageWaitTime);
    }
  }, [adminData]);

  // Auto-reload tables every 5 minutes
  useEffect(() => {
    if (isAuthenticated && posPath.trim()) {
      loadTables();
      const interval = setInterval(loadTables, 5 * 60 * 1000); // 5 minutos
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, posPath, loadTables]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-CO');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel de Administración</h1>
            <p className="text-gray-600 text-sm">Ingresa la contraseña para continuar</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); authenticate(); }} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isAuthenticating}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isAuthenticating ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2 text-gray-600">Cargando panel de administración...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
                <p className="text-gray-300">Gestión de Fila Virtual Goguinara</p>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {adminData && (
            <>
              {/* Quick Actions */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-4 items-center">

                  <button
                    onClick={fetchAdminData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Actualizar
                  </button>
                  
                  {/* Wait Time Configuration */}
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border">
                    <label className="text-sm font-medium text-gray-700">
                      Tiempo promedio:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={newWaitTime}
                      onChange={(e) => setNewWaitTime(parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                    <span className="text-sm text-gray-600">min</span>
                    <button
                      onClick={updateAverageWaitTime}
                      disabled={isUpdatingWaitTime}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-3 py-1 rounded text-sm font-medium"
                    >
                      {isUpdatingWaitTime ? 'Actualizando...' : 'Actualizar'}
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Actual: {adminData.averageWaitTime} min/persona
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{adminData.waiting.length}</p>
                    <p className="text-yellow-800 text-sm">En Espera</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{adminData.serving.length}</p>
                    <p className="text-green-800 text-sm">Siendo Atendidos</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{adminData.completed.length}</p>
                    <p className="text-blue-800 text-sm">Completados</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{adminData.cancelled.length}</p>
                    <p className="text-red-800 text-sm">Cancelados</p>
                  </div>
                </div>
              </div>

              {/* Queue Management */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Waiting Queue */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      En Espera ({adminData.waiting.length})
                    </h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {adminData.waiting.map((entry) => (
                        <div key={entry.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-800">#{entry.position} - {entry.name}</p>
                              <p className="text-sm text-gray-600">{entry.phone}</p>
                              <p className="text-xs text-gray-500">{formatTime(entry.timestamp)}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => sendWhatsAppMessage(entry.phone, entry.name, entry.position, entry.diners, entry.allergies)}
                                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                </svg>
                                Mensaje
                              </button>
                              <button
                                onClick={() => updateToServing(entry.phone)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
                              >
                                Atendiendo
                              </button>
                              <button
                                onClick={() => updateStatus(parseInt(entry.id) - 1, 'Cancelado')}
                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {adminData.waiting.length === 0 && (
                        <p className="text-gray-500 text-center py-8">No hay personas en espera</p>
                      )}
                    </div>
                  </div>

                  {/* Currently Serving */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Siendo Atendidos ({adminData.serving.length})
                    </h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {adminData.serving.map((entry) => (
                        <div key={entry.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-800">#{entry.position} - {entry.name}</p>
                              <p className="text-sm text-gray-600">{entry.phone}</p>
                              <p className="text-xs text-gray-500">{formatTime(entry.timestamp)}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => updateStatus(parseInt(entry.id) - 1, 'Atendido')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                              >
                                Completar
                              </button>
                              <button
                                onClick={() => updateStatus(parseInt(entry.id) - 1, 'En Espera')}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs"
                              >
                                Volver a Espera
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {adminData.serving.length === 0 && (
                        <p className="text-gray-500 text-center py-8">Nadie siendo atendido</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
