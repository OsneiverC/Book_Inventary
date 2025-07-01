import  Bookmark  from './icons/Bookmark'
import { Link } from 'react-router-dom';
import { Inventary } from './icons/Inventary'
import Mas from './icons/Mas'
import Report from './icons/Report'
import LibrosTabla from './LibrosTabla'
import UltimosLibros from './UltimosRegistros'
import book from '/public/Book.png'
import Cargar from './Cargando';

export default function Dasboard(){
    return(
        <>
        <div>
            <div className="flex p-7 bg-[#F0E4D1]">
                <figure className="w-60">
                    <img src={book} alt=""/>
                </figure>
                <div>
                    <h2 className="text-5xl text-[#5B4A2E] w-max- p-5 font-serif max-w-3xl">Gestiona tu inventario de libros de manera eficiente</h2>
                    <div className="flex gap-5">
                        <Link to="/Libros" className="flex align-center justify-center bg-[#C19D5E] text-white p-2 rounded-xl">Ver Inventario</Link>
                        <Link to="/registro" className="flex align-center justify-center bg-white text-[#C19D5E] p-2 rounded-xl">{<Mas/>}Añadir Nuevo Libro</Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[60%_40%] p-5 gap-5">

                <div className="bg-white p-7">
                    <h2 className="font-serif p-5 text-4xl text-[#5B4A2E]">Organizar tus Libros</h2>

                    <div className="flex">

                        <div className="flex flex-col justify-center items-center w-[200px]">

                            <figure className="bg-[#F0E4D1] rounded-full w-fit p-3">
                               {<Bookmark/>}
                            </figure>
                            <p className="text-[#5B4A2E] text-center">Organiza tus libros facilmente</p>
                        </div>

                        <div className="flex flex-col justify-center items-center w-[200px]">
                            <Link to="/Libros">
                                <figure className="bg-[#F0E4D1] rounded-full w-16 h-16 p-3 text-[#5B4A2E]">
                                    {<Inventary className="w-full h-full"/>}
                                </figure>
                            </Link>
                            <p className="text-[#5B4A2E] text-center">Controla el Stock en tiempo real</p>
                        </div>


                        <div className="flex flex-col justify-center items-center w-[200px]">

                            <figure className="bg-[#F0E4D1] rounded-full w-fit p-3 text-[#5B4A2E]">
                                <Link to="/reportes">
                                    {<Report className="w-10 h-10"/>}
                                </Link>
                            </figure>
                            <p className="text-[#5B4A2E] text-center">Generar reportes de inventario</p>
                        </div>

                    </div>
    
                </div>

                <div className="bg-white p-5">
                    <h2 className="font-serif mb-4 text-4xl text-[#5B4A2E]">últimos Registros</h2>
                <UltimosLibros/>
                </div>







            </div>
        </div>
        </>
    )
}