import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
              Fila Virtual
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-600 mb-6">
              Goguinara
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Evita las esperas. Únete a nuestra fila virtual y recibe notificaciones cuando sea tu turno.
            </p>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-6 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Unirse a la Fila
              </div>
              <p className="text-blue-100 text-sm">Regístrate y recibe tu posición</p>
            </Link>

            <Link
              href="/status"
              className="bg-green-600 hover:bg-green-700 text-white text-xl font-semibold py-6 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center justify-center mb-2">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Verificar Estado
              </div>
              <p className="text-green-100 text-sm">Consulta tu posición actual</p>
            </Link>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/queue"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md border border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Ver Estado de la Fila
              </div>
            </Link>

            <Link
              href="/admin"
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Administración
              </div>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sin Esperas</h3>
              <p className="text-gray-600 text-sm">Regístrate desde cualquier lugar y evita hacer fila física</p>
            </div>

            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828L5.828 12l2.828 2.828L6.828 17H2v-4.828L4.828 7z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Notificaciones</h3>
              <p className="text-gray-600 text-sm">Recibe avisos cuando sea tu turno de ser atendido</p>
            </div>

            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="text-purple-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tiempo Real</h3>
              <p className="text-gray-600 text-sm">Consulta el estado de la fila y tu posición en tiempo real</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white bg-opacity-50 backdrop-blur-sm border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Sistema de Fila Virtual - Goguinara
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <Link href="/register" className="hover:text-gray-700">Registrarse</Link>
            <Link href="/status" className="hover:text-gray-700">Verificar Estado</Link>
            <Link href="/queue" className="hover:text-gray-700">Ver Fila</Link>
            <Link href="/admin" className="hover:text-gray-700">Administración</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
