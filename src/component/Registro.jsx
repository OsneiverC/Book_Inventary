import { useState } from "react";
// Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase"; // Asegúrate que este path esté correcto
// --------------------------------------
import { Menu } from "./Menu";

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

  const handleChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
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
      setExito(true); // Mostrar pop-up de éxito
      setTimeout(() => setExito(false), 3000); // Ocultarlo después de 3 segundos
      setCargando(false);
    } catch (error) {
      console.error("Error al registrar libro:", error);
    }
  };

  return (
    <>
      {cargando && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-lg font-semibold text-[#5B4A2E] mb-4">
              Cargando...
            </p>
            <div className="loader mx-auto border-4 border-[#C19D5E] border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          </div>
        </div>
      )}
      {exito && (
        <div className="fixed right-4 top-4 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-xl shadow-lg text-center animate-fade-in">
            <p className="text-lg font-semibold mb-2">
              ✅ Libro registrado correctamente
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-[20%_80%] h-screen">
        <Menu />
        <div>
          <h2 className="p-8 text-4xl font-bold text-[rgb(91,74,46)] ">
            Registro de inventario
          </h2>
          <form onSubmit={handleSubmit} className="p-7">
            <div className="grid grid-cols-[40%_40%] gap-20 justify-center">
              <div className="flex flex-col gap-5">
                <label className="text-[#5B4A2E] font-bold">Código</label>
                <input
                  type="text"
                  name="codigo"
                  value={libro.codigo}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="Ejem: 248741544"
                />

                <label className="text-[#5B4A2E] font-bold">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={libro.titulo}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="Título"
                />

                <label className="text-[#5B4A2E] font-bold">Autor</label>
                <input
                  type="text"
                  name="autor"
                  value={libro.autor}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="Gabriel García Márquez"
                />

                <label className="text-[#5B4A2E] font-bold">URL</label>
                <input
                  type="text"
                  name="url"
                  value={libro.url}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="https://www.ejemplo.com"
                />
              </div>

              <div className="flex flex-col gap-5">
                <label className="text-[#5B4A2E] font-bold">Editorial</label>
                <input
                  type="text"
                  name="editorial"
                  value={libro.editorial}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="Editorial"
                />

                <label className="text-[#5B4A2E] font-bold">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  value={libro.cantidad}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="4..."
                />

                <label className="text-[#5B4A2E] font-bold">Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={libro.categoria}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="Terror / Historia"
                />

                <label className="text-[#5B4A2E] font-bold">
                  Año de publicación
                </label>
                <input
                  type="text"
                  name="anio"
                  value={libro.anio}
                  onChange={handleChange}
                  className="p-2 border-b"
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-20">
              <button
                type="submit"
                className="bg-[#5B4A2E] p-2 rounded text-white text-xl w-80 hover:bg-stone-800 hover:cursor-pointer"
              >
                Registrar libro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
