import { Routes, Route } from 'react-router-dom';
import Registro from './component/Registro'
import Home from './Home'
import LibrosTabla from './component/LibrosTabla';
import ReporteInventario from './component/ReporteInventario';

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='/Libros' element={<LibrosTabla/>}/>
        <Route path="/reportes" element={<ReporteInventario/>}/>
      </Routes>
   

    
      
    </>
  )
}

export default App
