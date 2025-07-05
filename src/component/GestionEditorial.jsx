import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';

export default function GestionEditoriales() {
  const [editoriales, setEditoriales] = useState([]);
  const [nuevaEditorial, setNuevaEditorial] = useState('');

  const cargarEditoriales = async () => {
    const querySnapshot = await getDocs(collection(db, 'editoriales'));
    const lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEditoriales(lista);
  };

  useEffect(() => {
    cargarEditoriales();
  }, []);

  const agregarEditorial = async (e) => {
    e.preventDefault();
    if (nuevaEditorial.trim() === '') return;

    await addDoc(collection(db, 'editoriales'), {
      nombre: nuevaEditorial.trim()
    });

    setNuevaEditorial('');
    cargarEditoriales();
  };

  const eliminarEditorial = async (id) => {
    await deleteDoc(doc(db, 'editoriales', id));
    cargarEditoriales();
  };

  return (
    <div className="p-6 bg-[#FAF9F6] text-[#5B4A2E] min-h-screen">
      <h2 className="text-3xl font-bold mb-6">📘 Gestión de Editoriales</h2>

      {/* Formulario */}
      <form onSubmit={agregarEditorial} className="flex gap-4 mb-6">
        <input
          type="text"
          value={nuevaEditorial}
          onChange={(e) => setNuevaEditorial(e.target.value)}
          placeholder="Nueva editorial"
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
              <th className="py-2 px-4 text-left">Editorial</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {editoriales.length > 0 ? (
              editoriales.map((editorial) => (
                <tr key={editorial.id} className="border-t hover:bg-[#E7DCC7]">
                  <td className="py-2 px-4">{editorial.nombre}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => eliminarEditorial(editorial.id)}
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
                  No hay editoriales registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
