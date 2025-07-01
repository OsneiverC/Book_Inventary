import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase"; // Ajusta el path
import { Menu } from "./Menu";

export default function ReporteInventario() {
  const [reporte, setReporte] = useState({
    porCategoria: {},
    porEditorial: {},
    totalLibros: 0,
  });

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
        <div className='grid grid-cols-[20%_80%] h-screen'>
        <Menu/>
    <div className="rounded-xl p-8 shadow-xl">
      <h2 className="text-4xl font-serif text-[#5B4A2E] mb-6">📊 Reporte General del Inventario</h2>

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
  );
}
