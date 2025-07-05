import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';

export default function GestionAutores() {
  const [autores, setAutores] = useState([]);
  const [nuevoAutor, setNuevoAutor] = useState('');

  const cargarAutores = async () => {
    const querySnapshot = await getDocs(collection(db, 'autores'));
    const lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setAutores(lista);
  };

  useEffect(() => {
    cargarAutores();
  }, []);

  const agregarAutor = async (e) => {
    e.preventDefault();
    if (nuevoAutor.trim() === '') return;

    await addDoc(collection(db, 'autores'), {
      nombre: nuevoAutor.trim()
    });

    setNuevoAutor('');
    cargarAutores();
  };

  const eliminarAutor = async (id) => {
    await deleteDoc(doc(db, 'autores', id));
    cargarAutores();
  };

  return (
    <div className="p-6 bg-[#FAF9F6] text-[#5B4A2E] min-h-screen">
      <h2 className="text-3xl font-bold mb-6">✍️ Gestión de Autores</h2>

      {/* Formulario */}
      <form onSubmit={agregarAutor} className="flex gap-4 mb-6">
        <input
          type="text"
          value={nuevoAutor}
          onChange={(e) => setNuevoAutor(e.target.value)}
          placeholder="Nuevo autor"
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
              <th className="py-2 px-4 text-left">Autor</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {autores.length > 0 ? (
              autores.map((autor) => (
                <tr key={autor.id} className="border-t hover:bg-[#E7DCC7]">
                  <td className="py-2 px-4">{autor.nombre}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => eliminarAutor(autor.id)}
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
                  No hay autores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
