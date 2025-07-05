import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";
import { Menu } from "./Menu";

export default function ReporteInventario() {
  const [reporte, setReporte] = useState({
    porCategoria: {},
    porEditorial: {},
    totalLibros: 0,
  });

  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      const librosRef = collection(db, "libros");
      const snapshot = await getDocs(librosRef);
      let categoriaConteo = {};
      let editorialConteo = {};
      let total = 0;

      snapshot.forEach((doc) => {
        const libro = doc.data();
        const { categoria, editorial, cantidad } = libro;

        const cantidadNumerica = parseInt(cantidad) || 1;
        total += cantidadNumerica;

        categoriaConteo[categoria] = (categoriaConteo[categoria] || 0) + cantidadNumerica;
        editorialConteo[editorial] = (editorialConteo[editorial] || 0) + cantidadNumerica;
      });

      setReporte({
        porCategoria: categoriaConteo,
        porEditorial: editorialConteo,
        totalLibros: total,
      });
    };

    obtenerDatos();
  }, []);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#5B4A2E] text-white p-2 rounded shadow-md"
        onClick={() => setMostrarMenu(!mostrarMenu)}
      >
        ☰
      </button>

      {/* Fondo oscuro al abrir menú móvil */}
      {mostrarMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setMostrarMenu(false)}
        />
      )}

      {/* Menú flotante */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#F5ECD9] z-50 transition-transform duration-300
          ${mostrarMenu ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Menu />
      </div>

          
      {/* Contenido principal */}
      
      <div className="lg:ml-64 p-6 min-h-screen transition-all duration-300 bg-[#FAF9F6]">
        <div className="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Gestión</a></li>
    <li>Reportes</li>
  </ul>
</div>
        <div className="rounded-xl p-4 md:p-8 shadow-xl bg-white">
          <h2 className="text-3xl md:text-4xl font-serif text-[#5B4A2E] mb-6">
            📊 Reporte General del Inventario
          </h2>

          <div className="bg-white rounded-lg p-6 shadow-md mb-6 border-l-4 border-[#C19D5E]">
            <p className="text-2xl font-bold text-[#5B4A2E]">Total de libros registrados:</p>
            <p className="text-3xl text-[#C19D5E]">{reporte.totalLibros}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reporte por Categoría */}
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-[#5B4A2E]">
              <h3 className="text-xl font-bold text-[#5B4A2E] mb-4">📚 Libros por Categoría</h3>
              <ul className="space-y-2">
                {Object.entries(reporte.porCategoria).map(([categoria, cantidad]) => (
                  <li key={categoria} className="flex justify-between text-[#5B4A2E]">
                    <span className="font-medium">{categoria}</span>
                    <span className="bg-[#F0E4D1] px-3 py-1 rounded-full">{cantidad}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reporte por Editorial */}
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-[#5B4A2E]">
              <h3 className="text-xl font-bold text-[#5B4A2E] mb-4">🏢 Libros por Editorial</h3>
              <ul className="space-y-2">
                {Object.entries(reporte.porEditorial).map(([editorial, cantidad]) => (
                  <li key={editorial} className="flex justify-between text-[#5B4A2E]">
                    <span className="font-medium">{editorial}</span>
                    <span className="bg-[#F0E4D1] px-3 py-1 rounded-full">{cantidad}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
