import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';
import { Menu } from './Menu';

export default function LibrosTabla() {
  const [libros, setLibros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicion, setFormEdicion] = useState({});

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
    <div className='grid grid-cols-[20%_80%] h-screen'>
    <Menu/>

    <div className="p-10 min-h-screen">
      <h2 className="text-4xl font-bold text-[#5B4A2E] mb-8">Lista de Libros Registrados</h2>
      <div className="overflow-auto rounded-lg shadow border border-[#C19D5E]">
        <table className="min-w-full bg-[#F0E4D1] text-[#5B4A2E] text-left">
          <thead className="bg-[#C19D5E] text-white">
            <tr>
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-4">Título</th>
              <th className="py-3 px-4">Autor</th>
              <th className="py-3 px-4">Editorial</th>
              <th className="py-3 px-4">Cantidad</th>
              <th className="py-3 px-4">Categoría</th>
              <th className="py-3 px-4">Año</th>
              <th className="py-3 px-4">URL</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.length > 0 ? (
              libros.map(libro => (
                <tr key={libro.id} className="border-t border-[#E4D8C5] hover:bg-[#E7DCC7]">
                  {editandoId === libro.id ? (
                    <>
                      <td className="py-2 px-4"><input name="codigo" value={formEdicion.codigo} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4"><input name="titulo" value={formEdicion.titulo} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4"><input name="autor" value={formEdicion.autor} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4"><input name="editorial" value={formEdicion.editorial} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4"><input name="cantidad" value={formEdicion.cantidad} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4"><input name="categoria" value={formEdicion.categoria} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4"><input name="anio" value={formEdicion.anio} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4"><input name="url" value={formEdicion.url} onChange={handleChange} className="p-1 w-full" /></td>
                      <td className="py-2 px-4 space-x-2">
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
                      <td className="py-2 px-4 space-x-2">
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
    </div>
  );
}
