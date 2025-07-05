import { Link } from 'react-router-dom';
import Mas from './icons/Mas'
import { Inventary } from './icons/Inventary'
import Logo from '../../public/Logo.png'
import Report from './icons/Report';


export const Menu = () => {
  return (
        <div className="h-full relative">
            <div className="flex flex-col gap-10 bg-[#F5ECD9] h-full">
            <Link to="/">
             <figure className='mt-8'>
                <img src={Logo} alt="" />
            </figure>
            </Link>
            <div className="flex flex-col text-[#5B4A2E] font-bold">
                <Link to="/Registro" className="flex align-center m-5 justify-center bg-[#5B4A2E] text-white p-2 rounded"> <Mas/> Agregar Nuevo Libros</Link>
                <Link  to="/Libros" className="flex gap-2.5 p-2 items-center text-xl hover:bg-[#F0E4D1]"> <Inventary className="w-6 h-6"/> Control de stock</Link>
                <Link  to="/reportes" className="flex gap-2.5 p-2 items-center text-xl hover:bg-[#F0E4D1]"> <Report className="w-6 h-6"/> Reportes</Link>
                <Link to="/gestion/parametros" className="block px-4 py-2 hover:bg-[#E7DCC7] text-[#5B4A2E]"> ⚙️ Parámetros del Sistema </Link>
            </div>

            </div>
        </div>
  )
}
