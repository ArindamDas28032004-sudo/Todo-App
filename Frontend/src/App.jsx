import Navbar from "./Components/Navbar";
import {Routes,Route} from "react-router-dom"
import AddTask from "./Components/AddTask";
import List from "./Components/List";
import UpdateTask from "./Components/UpdataTask"
import SignUP from "./Components/SignUp";
import Login from "./Components/Login";
import Protected from "./Components/Protected";
import './App.css';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Protected><List/></Protected>} />
        <Route path="/add" element={<Protected><AddTask/></Protected>} />
         <Route path="/update/:id" element={<UpdateTask/>}/>
         <Route path="/signup" element={<SignUP/>}/>
         <Route path="/login" element={<Login/>}/>
         
      </Routes>
    </div>
  );
}
export default App;
