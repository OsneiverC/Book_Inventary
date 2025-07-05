import { Routes, Route } from 'react-router-dom';
import Registro from './component/Registro'
import Home from './Home'
import LibrosTabla from './component/LibrosTabla';
import ReporteInventario from './component/ReporteInventario';
import VistaLibro from './component/VistaLibro';
import GestionEditoriales from './component/GestionEditorial';
import GestionAutores from './component/GestionAutores';
import GestionCategorias from './component/GestionCategorias';
import GestionParametros from './component/GestionParametros';

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='/Libros' element={<LibrosTabla/>}/>
        <Route path="/reportes" element={<ReporteInventario/>}/>
        <Route path="/libro/:id" element={<VistaLibro/>} />
        <Route path="/gestion/editoriales" element={<GestionEditoriales/>} />
        <Route path="/gestion/autores" element={<GestionAutores/>} />
        <Route path="/gestion/categorias" element={<GestionCategorias />} />
        <Route path="/gestion/parametros" element={<GestionParametros />} />
      </Routes>
   

    
      
    </>
  )
}

export default App
