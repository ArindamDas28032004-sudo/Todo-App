import { Link,useNavigate } from "react-router-dom";
import{useState,useEffect} from 'react';
import "../Style/navbar.css"
function Navbar() {
  const [login,setLogin]=useState(localStorage.getItem('login'));
  const navigate=useNavigate()
  const logout=()=>
  {
    localStorage.removeItem('login');
    setLogin(null)
    setTimeout(()=>
    {
      navigate('./login')
    },0)

  }
  useEffect(()=>
  {
    const handleStorage=()=>
    {
      setLogin(localStorage.getItem('login'))
    }
window.addEventListener('localStorage-change',handleStorage)
return()=>
{
  window.addEventListener('localStorage-change',handleStorage)
}
  },[])
  return (
   
      <nav className='navbar'>
        <h1 className="logo">To Do App</h1>
        <ul className="nav-links"> 
          {
            login?
            <>
            <li>
            <Link to="/">List</Link>
          </li>
          <li>
            <Link to="/add">Add Task</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
            </>:null
}
        </ul>
      </nav>
    
  );
}
export default Navbar;
