import { Routes, Route } from 'react-router-dom';
import Registro from './component/Registro'
import Home from './Home'

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
   

    
      
    </>
  )
}

export default App
