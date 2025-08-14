'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface QueueEntry {
  position: number;
  name: string;
  timestamp: string;
  estimatedWaitTime: number;
}

interface QueueStats {
  totalWaiting: number;
  currentlyServing: {
    name: string;
    position: number;
  } | null;
  estimatedWaitTime: number;
  averageWaitTime: number;
}

interface QueueData {
  queue: QueueEntry[];
  stats: QueueStats;
}

export default function QueuePage() {
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchQueueData = async () => {
    try {
      setError('');
      const response = await fetch('/api/queue');
      const data = await response.json();

      if (response.ok) {
        setQueueData(data);
        setLastUpdated(new Date());
      } else {
        setError(data.error || 'Error al cargar datos de la fila');
      }
    } catch (error) {
      console.error('Error al obtener datos de la fila:', error);
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchQueueData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2 text-gray-600">Cargando estado de la fila...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center mb-2">Estado de la Fila</h1>
            <p className="text-blue-100 text-center">Fila Virtual Goguinara</p>
            {lastUpdated && (
              <p className="text-blue-200 text-sm text-center mt-2">
                Última actualización: {lastUpdated.toLocaleTimeString('es-CO')}
              </p>
            )}
          </div>

          {error ? (
            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={fetchQueueData}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Reintentar
                </button>
              </div>
            </div>
          ) : queueData ? (
            <>
              {/* Stats */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{queueData.stats.totalWaiting}</p>
                    <p className="text-blue-800 text-sm">Personas en espera</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    {queueData.stats.currentlyServing ? (
                      <>
                        <p className="text-lg font-semibold text-green-600">
                          {queueData.stats.currentlyServing.name}
                        </p>
                        <p className="text-green-800 text-sm">Siendo atendido</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-semibold text-gray-500">-</p>
                        <p className="text-gray-600 text-sm">Nadie siendo atendido</p>
                      </>
                    )}
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{queueData.stats.estimatedWaitTime}min</p>
                    <p className="text-yellow-800 text-sm">Tiempo estimado total</p>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{queueData.stats.averageWaitTime}min</p>
                    <p className="text-purple-800 text-sm">Tiempo promedio/persona</p>
                  </div>
                </div>
              </div>

              {/* Queue List */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Fila de Espera ({queueData.queue.length} personas)
                </h2>
                
                {queueData.queue.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <p className="text-gray-500 text-lg">No hay personas en la fila</p>
                    <p className="text-gray-400 text-sm mt-2">¡Perfecto momento para visitarnos!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {queueData.queue.map((entry, index) => (
                      <div
                        key={`${entry.position}-${entry.timestamp}`}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          index < 3 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index < 3 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-white'
                          }`}>
                            {entry.position}
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-800">{entry.name}</p>
                            <p className="text-sm text-gray-500">
                              Registrado: {formatTime(entry.timestamp)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-600">
                            ~{entry.estimatedWaitTime} min
                          </p>
                          <p className="text-xs text-gray-500">Tiempo estimado</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={fetchQueueData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Actualizar
                  </button>
                  <Link
                    href="/register"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium text-center transition-colors duration-200"
                  >
                    Unirse a la Fila
                  </Link>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Navigation */}
        <div className="mt-6 text-center space-y-2">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Volver al inicio
          </Link>
          <div className="text-sm text-gray-500 space-x-4">
            <Link href="/register" className="hover:text-gray-700">Registrarse</Link>
            <span>•</span>
            <Link href="/status" className="hover:text-gray-700">Verificar estado</Link>
          </div>
        </div>
      </div>
    </div>
  );
}