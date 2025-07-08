import Bookmark from './icons/Bookmark';
import { Link } from 'react-router-dom';
import { Inventary } from './icons/Inventary';
import Mas from './icons/Mas';
import Report from './icons/Report';
import UltimosLibros from './UltimosRegistros';
import book from '/public/Book.png';
import IconParametro from './icons/IconParametro';

export default function Dasboard() {
  return (
    <>
    
      <div>
        {/* Sección principal con imagen y título */}
        
        <div className="flex flex-col md:flex-row p-7 gap-5 items-center md:items-start">
          <figure className="w-40 md:w-60 mx-auto md:mx-0">
            <img src={book} alt="Logo libro" className="w-full" />
          </figure>
          

          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl text-[#5B4A2E] font-serif max-w-3xl p-5">
              Gestiona tu inventario de libros de manera eficiente
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/Libros"
                className="flex items-center gap-2 justify-center bg-[#C19D5E] text-white p-2 rounded-xl"
              > <Inventary className="w-10"/>
                Ver Inventario
              </Link>
              <Link
                to="/registro"
                className="flex items-center justify-center bg-white text-[#C19D5E] p-2 rounded-xl"
              >
                <Mas className="mr-2" />
                Añadir Nuevo Libro
              </Link>
            </div>
          </div>
        </div>

        {/* Sección inferior con organización y últimos registros */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] p-5 gap-5">
          {/* Organización de libros */}
          <div className="bg-[#F0E4D1] p-7 rounded-xl shadow-md">
            <h2 className="font-serif text-2xl md:text-4xl text-[#5B4A2E] mb-6">
              Organizar tus Libros
            </h2>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              {/* Icono 1 */}
              <div className="flex flex-col justify-center items-center w-full sm:w-[200px]">
                <Link to={"/gestion/parametros"}>
                  <figure className="bg-white rounded-full p-4 mb-2">
                    <IconParametro className="text-[#5B4A2E]" />
                  </figure>
                </Link>
                <p className="text-[#5B4A2E] text-center text-sm">Agrega Nuevos Parametros</p>
              </div>

              {/* Icono 2 */}
              <div className="flex flex-col justify-center items-center w-full sm:w-[200px]">
                <Link to="/Libros">
                  <figure className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-2 text-[#5B4A2E]">
                    <Inventary className="w-8 h-8" />
                  </figure>
                </Link>
                <p className="text-[#5B4A2E] text-center text-sm">Controla el Stock en tiempo real</p>
              </div>

              {/* Icono 3 */}
              <div className="flex flex-col justify-center items-center w-full sm:w-[200px]">
                <Link to="/reportes">
                  <figure className="bg-white rounded-full w-fit p-4 mb-2 text-[#5B4A2E]">
                    <Report className="w-8 h-8" />
                  </figure>
                </Link>
                <p className="text-[#5B4A2E] text-center text-sm">Genera reportes de inventario</p>
              </div>
            </div>
          </div>

          {/* Últimos registros */}
          <div className="bg-[#F0E4D1] p-5 rounded-xl shadow-md">
            <h2 className="font-serif text-2xl md:text-4xl text-[#5B4A2E] mb-4">Últimos Registros</h2>
            <UltimosLibros />
          </div>
        </div>
      </div>
    </>
  );
}
