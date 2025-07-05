import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";
import { Menu } from "./Menu";

export default function LibrosTabla() {
  const [libros, setLibros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicion, setFormEdicion] = useState({});
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [filtroAutor, setFiltroAutor] = useState("");
  const [filtroEditorial, setFiltroEditorial] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const navigate = useNavigate();

  const cargarLibros = async () => {
    try {
      setCargando(true);
      const querySnapshot = await getDocs(collection(db, "libros"));
      const librosArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLibros(librosArray);
    } catch (error) {
      console.error("Error cargando libros:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const eliminarLibro = async (id) => {
    await deleteDoc(doc(db, "libros", id));
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
    const libroRef = doc(db, "libros", id);
    await updateDoc(libroRef, formEdicion);
    setEditandoId(null);
    setFormEdicion({});
    cargarLibros();
  };

  const handleChange = (e) => {
    setFormEdicion({
      ...formEdicion,
      [e.target.name]: e.target.value,
    });
  };

  const autores = [...new Set(libros.map((l) => l.autor))];
  const editoriales = [...new Set(libros.map((l) => l.editorial))];
  const categorias = [...new Set(libros.map((l) => l.categoria))];

  const librosFiltrados = libros.filter((libro) => {
    return (
      (!filtroAutor || libro.autor === filtroAutor) &&
      (!filtroEditorial || libro.editorial === filtroEditorial) &&
      (!filtroCategoria || libro.categoria === filtroCategoria)
    );
  });

  return (
    <>
      {/* Menú móvil */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#5B4A2E] text-white p-2 rounded shadow-md"
        onClick={() => setMostrarMenu(!mostrarMenu)}
      >
        ☰
      </button>
      {mostrarMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setMostrarMenu(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#F5ECD9] z-50 transition-transform duration-300 ${
          mostrarMenu ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Menu />
      </div>

      <div className="pt-15 lg:ml-64 p-6 min-h-screen bg-[#FAF9F6] transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5B4A2E] mb-6">
          📚 Lista de Libros Registrados
        </h2>

        {/* Filtros */}
        <div className="py-4 flex flex-wrap gap-4">
          <select
            className="select border-[#5B4A2E] text-[#5B4A2E]"
            value={filtroAutor}
            onChange={(e) => setFiltroAutor(e.target.value)}
          >
            <option value="">Todos los Autores</option>
            {autores.map((autor, idx) => (
              <option key={idx} value={autor}>
                {autor}
              </option>
            ))}
          </select>

          <select
            className="select border-[#5B4A2E] text-[#5B4A2E]"
            value={filtroEditorial}
            onChange={(e) => setFiltroEditorial(e.target.value)}
          >
            <option value="">Todas las Editoriales</option>
            {editoriales.map((edit, idx) => (
              <option key={idx} value={edit}>
                {edit}
              </option>
            ))}
          </select>

          <select
            className="select border-[#5B4A2E] text-[#5B4A2E]"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg shadow border border-[#C19D5E] bg-white">
          <table className="min-w-full text-sm md:text-base text-[#5B4A2E]">
            <thead className="bg-[#C19D5E] text-white">
              <tr>
                <th className="py-3 px-4">👁️</th>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Título</th>
                <th className="py-3 px-4">Autor</th>
                <th className="py-3 px-4">Editorial</th>
                <th className="py-3 px-4">Cantidad</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Año</th>
                <th className="py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="9" className="text-center py-6">
                    <span className="loading loading-spinner loading-lg" />
                  </td>
                </tr>
              ) : librosFiltrados.length > 0 ? (
                librosFiltrados.map((libro) => (
                  <tr
                    key={libro.id}
                    className="border-t border-[#E4D8C5] hover:bg-[#E7DCC7]"
                  >
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => navigate(`/libro/${libro.id}`)}
                        className="hover:scale-110 transition text-2xl"
                      >
                        👁️
                      </button>
                    </td>

                    {editandoId === libro.id ? (
                      <>
                        {[
                          "codigo",
                          "titulo",
                          "autor",
                          "editorial",
                          "cantidad",
                          "categoria",
                          "anio",
                        ].map((campo) => (
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
                          <button
                            onClick={() => guardarCambios(libro.id)}
                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={cancelarEdicion}
                            className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                          >
                            Cancelar
                          </button>
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
                        <td className="py-2 px-4 space-y-1 md:space-x-2 flex flex-col md:flex-row">
                          <button
                            onClick={() => comenzarEdicion(libro)}
                            className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarLibro(libro.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          >
                            Eliminar
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6">
                    No hay libros que coincidan con el filtro
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
