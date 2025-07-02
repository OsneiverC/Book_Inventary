import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';
import { Menu } from './Menu';

export default function LibrosTabla() {
  const [libros, setLibros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicion, setFormEdicion] = useState({});
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const cargarLibros = async () => {
    const querySnapshot = await getDocs(collection(db, 'libros'));
    const librosArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setLibros(librosArray);
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const eliminarLibro = async (id) => {
    await deleteDoc(doc(db, 'libros', id));
    cargarLibros();
  };

  const comenzarEdicion = (libro) => {
    setEditandoId(libro.id);
    setFormEdicion(libro);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormEdicion({});
  };

  const guardarCambios = async (id) => {
    const libroRef = doc(db, 'libros', id);
    await updateDoc(libroRef, formEdicion);
    setEditandoId(null);
    setFormEdicion({});
    cargarLibros();
  };

  const handleChange = (e) => {
    setFormEdicion({
      ...formEdicion,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#5B4A2E] text-white p-2 rounded shadow-md"
        onClick={() => setMostrarMenu(!mostrarMenu)}
      >
        ☰
      </button>

      {/* Fondo oscuro para el menú móvil */}
      {mostrarMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setMostrarMenu(false)}
        />
      )}

      {/* Menú lateral flotante */}
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
      <div className="lg:ml-64 p-6 min-h-screen bg-[#FAF9F6] transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5B4A2E] mb-6">📚 Lista de Libros Registrados</h2>

        <div className="overflow-x-auto rounded-lg shadow border border-[#C19D5E] bg-white">
          <table className="min-w-full text-sm md:text-base text-[#5B4A2E]">
            <thead className="bg-[#C19D5E] text-white">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap">Código</th>
                <th className="py-3 px-4 whitespace-nowrap">Título</th>
                <th className="py-3 px-4 whitespace-nowrap">Autor</th>
                <th className="py-3 px-4 whitespace-nowrap">Editorial</th>
                <th className="py-3 px-4 whitespace-nowrap">Cantidad</th>
                <th className="py-3 px-4 whitespace-nowrap">Categoría</th>
                <th className="py-3 px-4 whitespace-nowrap">Año</th>
                <th className="py-3 px-4 whitespace-nowrap">URL</th>
                <th className="py-3 px-4 whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {libros.length > 0 ? (
                libros.map(libro => (
                  <tr key={libro.id} className="border-t border-[#E4D8C5] hover:bg-[#E7DCC7]">
                    {editandoId === libro.id ? (
                      <>
                        {['codigo', 'titulo', 'autor', 'editorial', 'cantidad', 'categoria', 'anio', 'url'].map(campo => (
                          <td key={campo} className="py-2 px-4">
                            <input
                              name={campo}
                              value={formEdicion[campo]}
                              onChange={handleChange}
                              className="p-1 w-full border rounded"
                            />
                          </td>
                        ))}
                        <td className="py-2 px-4 space-y-1 md:space-x-2 flex flex-col md:flex-row">
                          <button onClick={() => guardarCambios(libro.id)} className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Guardar</button>
                          <button onClick={cancelarEdicion} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700">Cancelar</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2 px-4">{libro.codigo}</td>
                        <td className="py-2 px-4">{libro.titulo}</td>
                        <td className="py-2 px-4">{libro.autor}</td>
                        <td className="py-2 px-4">{libro.editorial}</td>
                        <td className="py-2 px-4">{libro.cantidad}</td>
                        <td className="py-2 px-4">{libro.categoria}</td>
                        <td className="py-2 px-4">{libro.anio}</td>
                        <td className="py-2 px-4">
                          {libro.url ? (
                            <a href={libro.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Ver</a>
                          ) : 'N/A'}
                        </td>
                        <td className="py-2 px-4 space-y-1 md:space-x-2 flex flex-col md:flex-row">
                          <button onClick={() => comenzarEdicion(libro)} className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700">Editar</button>
                          <button onClick={() => eliminarLibro(libro.id)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Eliminar</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6">No hay libros registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
