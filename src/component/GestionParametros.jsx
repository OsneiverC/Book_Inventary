import { useState } from 'react';

import { Menu } from './Menu';
import GestionEditoriales from './GestionEditorial';
import GestionAutores from './GestionAutores';
import GestionCategorias from './GestionCategorias';

const tabs = [
  { id: 'editoriales', label: '📘 Editoriales', component: <GestionEditoriales /> },
  { id: 'autores', label: '✍️ Autores', component: <GestionAutores /> },
  { id: 'categorias', label: '📂 Categorías', component: <GestionCategorias /> },
];

export default function GestionParametros() {
  const [tabActiva, setTabActiva] = useState('editoriales');
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#5B4A2E] text-white p-2 rounded shadow-md"
        onClick={() => setMostrarMenu(!mostrarMenu)}
      >
        ☰
      </button>

      {/* Fondo oscuro al abrir el menú en móvil */}
      {mostrarMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setMostrarMenu(false)}
        />
      )}

      {/* Menú flotante */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#F5ECD9] z-50 transition-transform duration-300 ${
          mostrarMenu ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <Menu />
      </div>

      {/* Contenido principal */}
      <main className="lg:ml-64 p-6 sm:p-10 bg-[#FAF9F6] min-h-screen text-[#5B4A2E] transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6">⚙️ Parámetros del sistema</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-6 border-b border-[#C19D5E]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={`px-4 py-2 rounded-t-md font-semibold ${
                tabActiva === tab.id
                  ? 'bg-[#C19D5E] text-white'
                  : 'bg-[#F5ECD9] text-[#5B4A2E] hover:bg-[#E7DCC7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido dinámico */}
        <div className="mt-4">
          {tabs.find(tab => tab.id === tabActiva)?.component}
        </div>
      </main>
    </>
  );
}
