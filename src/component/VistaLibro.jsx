import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';
import { Menu } from './Menu';

export default function VistaLibro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [libroActual, setLibroActual] = useState(null);
  const [indice, setIndice] = useState(0);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    const obtenerLibros = async () => {
      const snapshot = await getDocs(collection(db, 'libros'));
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLibros(lista);
    };
    obtenerLibros();
  }, []);

  useEffect(() => {
    if (libros.length > 0) {
      const idx = libros.findIndex(libro => libro.id === id);
      if (idx !== -1) {
        setIndice(idx);
        setLibroActual(libros[idx]);
      }
    }
  }, [libros, id]);

  const irAlLibro = (nuevoIndice) => {
    if (nuevoIndice >= 0 && nuevoIndice < libros.length) {
      navigate(`/libro/${libros[nuevoIndice].id}`);
    }
  };

  if (!libroActual) {
    return (
      <div className="flex justify-center items-center h-screen text-[#5B4A2E]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#5B4A2E] text-white p-2 rounded shadow-md"
        onClick={() => setMostrarMenu(!mostrarMenu)}
      >
        ☰
      </button>

      {/* Fondo oscuro cuando el menú está activo */}
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
      <main className="lg:ml-64 p-6 sm:p-10 bg-[#FCF8F2] min-h-screen text-[#5B4A2E] relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Salir
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{libroActual.titulo}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda */}
          <div className="space-y-6">
            <div>
              <label className="font-bold">Código</label>
              <p className="border-b">{libroActual.codigo}</p>
            </div>
            <div>
              <label className="font-bold">Editorial</label>
              <p className="border-b">{libroActual.editorial}</p>
            </div>
            <div>
              <label className="font-bold">Autor</label>
              <p className="border-b">{libroActual.autor}</p>
            </div>
            <div>
              <label className="font-bold">Cantidad</label>
              <p className="border-b">{libroActual.cantidad}</p>
            </div>
            <div>
              <label className="font-bold">Categoría</label>
              <p className="border-b">{libroActual.categoria}</p>
            </div>
            <div>
              <label className="font-bold">Año de publicación</label>
              <p className="border-b">{libroActual.anio}</p>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col items-center justify-start gap-4">
            {libroActual.url ? (
              <img
                src={libroActual.url}
                alt={`Portada del libro ${libroActual.titulo}`}
                className="w-60 h-80 object-cover border border-[#5B4A2E]"
              />
            ) : (
              <div className="w-60 h-80 bg-[#5B4A2E] flex items-center justify-center text-white">
                Sin imagen
              </div>
            )}

            <div className="w-full px-2 md:px-4">
              <label className="font-bold">URL</label>
              <p className="border-b break-words">{libroActual.url || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Navegación entre libros */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => irAlLibro(indice - 1)}
            disabled={indice === 0}
            className="bg-[#C19D5E] text-white px-6 py-2 rounded hover:bg-[#b8974f] disabled:opacity-50"
          >
            ⬅️ Anterior
          </button>
          <button
            onClick={() => irAlLibro(indice + 1)}
            disabled={indice === libros.length - 1}
            className="bg-[#C19D5E] text-white px-6 py-2 rounded hover:bg-[#b8974f] disabled:opacity-50"
          >
            Siguiente ➡️
          </button>
        </div>
      </main>
    </>
  );
}
