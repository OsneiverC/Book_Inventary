import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';

export default function UltimosLibros() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true); // nuevo estado

  useEffect(() => {
    const fetchUltimos = async () => {
      try {
        const q = query(collection(db, 'libros'), orderBy('codigo', 'desc'), limit(5));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLibros(lista);
      } catch (error) {
        console.error('Error obteniendo últimos libros:', error);
      } finally {
        setCargando(false); // finaliza la carga
      }
    };

    fetchUltimos();
  }, []);

  return (
    <div className="rounded-lg">
      <table className="w-full bg-[#F0E4D1] text-[#5B4A2E] rounded overflow-hidden">
        <thead className="bg-[#C19D5E] text-white">
          <tr>
            <th className="py-2 px-4">Código</th>
            <th className="py-2 px-4">Título</th>
            <th className="py-2 px-4">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr>
              <td colSpan="3" className="py-4 text-center">
                <span className="loading loading-spinner loading-xl"></span>
              </td>
            </tr>
          ) : (
            libros.map(libro => (
              <tr key={libro.id} className="border-t border-[#E4D8C5] hover:bg-[#E7DCC7]">
                <td className="py-2 px-4">{libro.codigo}</td>
                <td className="py-2 px-4">{libro.titulo}</td>
                <td className="py-2 px-4">{libro.categoria}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
