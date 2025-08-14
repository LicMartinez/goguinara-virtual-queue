'use client';

import { useState } from 'react';
import Link from 'next/link';

interface UserStatus {
  name: string;
  status: string;
  originalPosition: number;
  currentPosition: number | null;
  estimatedWaitTime: number;
  timestamp: string;
}

export default function StatusPage() {
  const [phone, setPhone] = useState('');
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setUserStatus(null);

    try {
      const response = await fetch('/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserStatus(data);
      } else {
        setMessage(data.error || 'Error al verificar estado.');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setMessage('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Espera': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Siendo Atendido': return 'text-green-600 bg-green-50 border-green-200';
      case 'Atendido': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Cancelado': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'En Espera':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      case 'Siendo Atendido':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'Atendido':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };

  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) {
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3').trim();
    }
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Verificar Estado</h1>
          <p className="text-gray-600 text-sm">Consulta tu posición en la fila virtual</p>
        </div>

        {!userStatus ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                Número de Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="300 123 4567"
                value={phone}
                onChange={handlePhoneChange}
                disabled={isLoading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </>
              ) : (
                'Verificar Estado'
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className={`border rounded-lg p-4 ${getStatusColor(userStatus.status)}`}>
              <div className="flex items-center mb-3">
                {getStatusIcon(userStatus.status)}
                <h3 className="ml-2 text-lg font-semibold">Hola, {userStatus.name}</h3>
              </div>
              <p className="font-medium mb-2">Estado: {userStatus.status}</p>
              
              {userStatus.status === 'En Espera' && userStatus.currentPosition && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userStatus.currentPosition}</p>
                    <p className="text-xs">Posición actual</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userStatus.estimatedWaitTime}min</p>
                    <p className="text-xs">Tiempo estimado</p>
                  </div>
                </div>
              )}

              {userStatus.status === 'Siendo Atendido' && (
                <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-lg">
                  <p className="text-center font-semibold">¡Es tu turno! Dirígete al mostrador.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                <strong>Registrado:</strong> {new Date(userStatus.timestamp).toLocaleString('es-CO')}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Posición original:</strong> #{userStatus.originalPosition}
              </p>
            </div>

            <button
              onClick={() => {
                setUserStatus(null);
                setMessage('');
                setPhone('');
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Verificar Otro Número
            </button>
          </div>
        )}

        {message && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm text-center">{message}</p>
          </div>
        )}

        <div className="mt-6 text-center space-y-2">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Volver al inicio
          </Link>
          <div className="text-xs text-gray-500 space-x-4">
            <Link href="/register" className="hover:text-gray-700">Registrarse</Link>
            <span>•</span>
            <Link href="/queue" className="hover:text-gray-700">Ver fila</Link>
          </div>
        </div>
      </div>
    </div>
  );
}