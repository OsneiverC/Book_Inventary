import { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";
import { Menu } from "./Menu";
import Success from "./Alert/Success";

export default function Registro() {
  const [libro, setLibro] = useState({
    codigo: "",
    titulo: "",
    autor: "",
    url: "",
    editorial: "",
    cantidad: "",
    categoria: "",
    anio: "",
  });

  const [editoriales, setEditoriales] = useState([]);
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      const edSnap = await getDocs(collection(db, "editoriales"));
      setEditoriales(edSnap.docs.map(doc => doc.data().nombre));

      const auSnap = await getDocs(collection(db, "autores"));
      setAutores(auSnap.docs.map(doc => doc.data().nombre));

      const catSnap = await getDocs(collection(db, "categorias"));
      setCategorias(catSnap.docs.map(doc => doc.data().nombre));
    };
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await addDoc(collection(db, "libros"), libro);
      setLibro({
        codigo: "",
        titulo: "",
        autor: "",
        url: "",
        editorial: "",
        cantidad: "",
        categoria: "",
        anio: "",
      });
      setExito(true);
      setTimeout(() => setExito(false), 3000);
    } catch (error) {
      console.error("Error al registrar libro:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
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
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#F5ECD9] z-50 transition-transform duration-300
          ${mostrarMenu ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Menu />
      </div>

      {cargando && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-lg font-semibold text-[#5B4A2E] mb-4">Cargando...</p>
            <div className="loader mx-auto border-4 border-[#C19D5E] border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          </div>
        </div>
      )}

      {exito && <Success />}

      <div className="lg:ml-64 p-4 min-h-screen transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-[rgb(91,74,46)] mb-6">
          Registro de inventario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-5">
              <label className="text-[#5B4A2E] font-bold">Código</label>
              <input type="text" name="codigo" value={libro.codigo} onChange={handleChange} className="p-2 border-b" required/>

              <label className="text-[#5B4A2E] font-bold">Título</label>
              <input type="text" name="titulo" value={libro.titulo} onChange={handleChange} className="p-2 border-b" required/>

              <label className="text-[#5B4A2E] font-bold">Autor</label>
              <select name="autor" value={libro.autor} onChange={handleChange} className="p-2 border-b bg-white" required>
                <option value="">Selecciona un autor</option>
                {autores.map((autor, i) => (
                  <option key={i} value={autor}>{autor}</option>
                ))}
              </select>

              <label className="text-[#5B4A2E] font-bold">URL</label>
              <input type="text" name="url" value={libro.url} onChange={handleChange} className="p-2 border-b"/>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col gap-5">
              <label className="text-[#5B4A2E] font-bold">Editorial</label>
              <select name="editorial" value={libro.editorial} onChange={handleChange} className="p-2 border-b bg-white" required>
                <option value="">Selecciona una editorial</option>
                {editoriales.map((ed, i) => (
                  <option key={i} value={ed}>{ed}</option>
                ))}
              </select>

              <label className="text-[#5B4A2E] font-bold">Cantidad</label>
              <input type="number" name="cantidad" value={libro.cantidad} onChange={handleChange} className="p-2 border-b" required/>

              <label className="text-[#5B4A2E] font-bold">Categoría</label>
              <select name="categoria" value={libro.categoria} onChange={handleChange} className="p-2 border-b bg-white" required>
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>

              <label className="text-[#5B4A2E] font-bold">Año de publicación</label>
              <input type="text" name="anio" value={libro.anio} onChange={handleChange} className="p-2 border-b" required/>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#5B4A2E] px-6 py-3 rounded text-white text-lg w-full sm:w-80 hover:bg-stone-800"
            >
              Registrar libro
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
