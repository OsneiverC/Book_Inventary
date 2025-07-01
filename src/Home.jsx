import	{Menu} from './component/Menu'
import Dasboard from './component/Dashoard'
export default function Home(){
    return (
    <div className='grid grid-cols-[20%_80%] h-screen'>
      <Menu/>
      <Dasboard/>
    </div>
    )
}