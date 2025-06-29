import sinImagen from '../../public/sinImagen.jpg'
import { Menu } from './Menu'

export default function Registro(){
    return(
        <div className='grid grid-cols-[20%_80%] h-screen'>
              <Menu/>
         <div>
        <h2 className='p-8 text-4xl font-bold text-[rgb(91,74,46)] '>Registro de inventario</h2>
          <form action="" className='p-7'>
            <div className='grid grid-cols-[40%_40%] gap-20 justify-center'>
                <div className='flex flex-col gap-5'>
                    <label className='text-[#5B4A2E] font-bold mr-4'>Codigo</label>
                    <input type="text" className='p-2 border-b' placeholder='Ejem: 248741544'/>
                    <label className='text-[#5B4A2E] font-bold mr-4'>Titulo</label>
                    <input type="text" className='p-2 border-b' placeholder='Titulo'/>
                    <label className='text-[#5B4A2E] font-bold mr-4'>Autor</label>
                    <input type="text" className='p-2 border-b' placeholder='Gabriel Garcia Marquez'/>
                    <label className='text-[#5B4A2E] font-bold mr-4'>URL</label>
                    <input type="text" className='p-2 border-b' placeholder='https://www.ejemplo.com'/>
                </div>
                <div className='flex flex-col gap-5'>
                    <label className='text-[#5B4A2E] font-bold mr-4'>Editorial</label>
                    <input type="text" className='p-2 border-b' placeholder='Editorial'/>
                    <label className='text-[#5B4A2E] font-bold mr-4'>Cantidad</label>
                    <input type="text" className='p-2 border-b' placeholder='4....'/>
                    <label className='text-[#5B4A2E] font-bold mr-4'>Categoria</label>
                    <input type="text" className='p-2 border-b' placeholder='Terror / Historia'/>
                    <label className='text-[#5B4A2E] font-bold mr-4'>Año de publicación</label>
                    <input type="text" className='p-2 border-b' placeholder='2024'/>
                </div>
               
            </div>
         
         <div className='flex items-center justify-center mt-20'>
          <button className='bg-[#5B4A2E] p-2 rounded text-white text-xl w-80'>Registar libro</button>

         </div>
        </form>
        {/* <figure>
          <img src={sinImagen} alt="" className='' />
        </figure> */}
        </div>
      </div>
    )
}