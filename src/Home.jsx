import { useState } from 'react';
import { Menu } from './component/Menu';
import Dasboard from './component/Dashoard';

export default function Home() {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Botón hamburguesa en móviles */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#5B4A2E] text-white p-2 rounded-md shadow-md"
        onClick={() => setMostrarMenu(!mostrarMenu)}
      >
        ☰
      </button>

      {/* Menú flotante a la izquierda */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#F5ECD9] z-40 transition-transform duration-300 ease-in-out
          ${mostrarMenu ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <Menu />
      </div>

      {/* Fondo oscuro al abrir menú en móviles */}
      {mostrarMenu && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMostrarMenu(false)}
        />
      )}

      {/* Contenido con margen ajustado al menú */}
      <div className="lg:ml-64 p-4 transition-all duration-300">
        <Dasboard />
      </div>
    </div>
  );
}
