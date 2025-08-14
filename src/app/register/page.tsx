
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RegistrationResult {
  message: string;
  position?: number;
  estimatedWaitTime?: number;
  phone?: string;
  alreadyRegistered?: boolean;
}

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setErrors([]);
    setRegistrationResult(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationResult(data);
        setMessage(data.message);
        if (!data.alreadyRegistered) {
          setName('');
          setPhone('');
        }
      } else {
        if (data.details && Array.isArray(data.details)) {
          setErrors(data.details);
        } else {
          setMessage(data.error || 'Error en el registro.');
        }
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setMessage('Error al conectar con el servidor. Verifica tu conexión e intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneInput = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format Colombian mobile numbers
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Fila Virtual</h1>
          <h2 className="text-xl text-blue-600 font-semibold">Goguinara</h2>
          <p className="text-gray-600 text-sm mt-2">Únete a nuestra fila virtual y evita las esperas</p>
        </div>

        {!registrationResult ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Ingresa tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-2">
                Número de Teléfono *
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
              <p className="text-xs text-gray-500 mt-1">Formato: 10 dígitos sin espacios ni símbolos</p>
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
                  Registrando...
                </>
              ) : (
                'Unirse a la Fila'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">¡Registro Exitoso!</h3>
              <p className="text-green-700 text-sm">{registrationResult.message}</p>
            </div>

            {registrationResult.position && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{registrationResult.position}</p>
                    <p className="text-xs text-blue-800">Tu posición</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{registrationResult.estimatedWaitTime}min</p>
                    <p className="text-xs text-blue-800">Tiempo estimado</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={() => {
                  setRegistrationResult(null);
                  setMessage('');
                }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Registrar Otra Persona
              </button>
              
              <Link 
                href="/status" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Verificar Mi Estado
              </Link>
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <h4 className="text-red-800 font-semibold text-sm mb-2">Errores de validación:</h4>
            <ul className="text-red-700 text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {message && !registrationResult && (
          <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
            message.includes('Error') || message.includes('error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center space-y-2">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Volver al inicio
          </Link>
          <div className="text-xs text-gray-500">
            <Link href="/queue" className="hover:text-gray-700">Ver estado de la fila</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
