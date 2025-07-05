import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';

export default function GestionCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const cargarCategorias = async () => {
    const querySnapshot = await getDocs(collection(db, 'categorias'));
    const lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCategorias(lista);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const agregarCategoria = async (e) => {
    e.preventDefault();
    if (nuevaCategoria.trim() === '') return;

    await addDoc(collection(db, 'categorias'), {
      nombre: nuevaCategoria.trim()
    });

    setNuevaCategoria('');
    cargarCategorias();
  };

  const eliminarCategoria = async (id) => {
    await deleteDoc(doc(db, 'categorias', id));
    cargarCategorias();
  };

  return (
    <div className="p-6 bg-[#FAF9F6] text-[#5B4A2E] min-h-screen">
      <h2 className="text-3xl font-bold mb-6">📂 Gestión de Categorías</h2>

      {/* Formulario */}
      <form onSubmit={agregarCategoria} className="flex gap-4 mb-6">
        <input
          type="text"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          placeholder="Nueva categoría"
          className="border border-[#C19D5E] p-2 rounded w-full"
        />
        <button type="submit" className="bg-[#C19D5E] text-white px-4 py-2 rounded hover:bg-[#b8974f]">
          Agregar
        </button>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow border border-[#E4D8C5]">
          <thead className="bg-[#C19D5E] text-white">
            <tr>
              <th className="py-2 px-4 text-left">Categoría</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <tr key={categoria.id} className="border-t hover:bg-[#E7DCC7]">
                  <td className="py-2 px-4">{categoria.nombre}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => eliminarCategoria(categoria.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-6">
                  No hay categorías registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
