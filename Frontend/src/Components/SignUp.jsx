import {useState,useEffect} from 'react'
import "../Style/AddTask.css";
import {Link,useNavigate} from 'react-router-dom'
function SignUp()
{
    const[userData,setUserData]=useState({
        name:"",
        email:"",
        password:""
    });
const navigate=useNavigate()

useEffect(()=>
{
    if(localStorage.getItem('login')){
        navigate('/')
    }
})
    const handleSignUp= async ()=>{
        
        let result= await fetch('https://todo-app-backend-rirx.onrender.com/signup',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'Application/Json'
            }
           
        })
        console.log(userData);
        result=await result.json()
        if(result)
        {
            console.log(result);
            document.cookie="token="+result.token
            localStorage.setItem('login',userData.email);
            navigate('/');
        }
        else
        {
            alert("Enter after some time");
        }

    }
    return (
        <div className='container'>
          <h1>Sign Up</h1>
          <label htmlFor="">Name</label>
          <input type="text" name="name" placeholder="Enter username" onChange={(event)=>setUserData({...userData,name:event.target.value})}/>

          <label htmlFor="">Email</label>
          <input type="text" name="email" placeholder="Enter email"
          onChange={(event)=>setUserData({...userData,email:event.target.value})}/>

          <label htmlFor="">Password</label>
          <input type="password" name="password" placeholder="Enter password"
          onChange={(event)=>setUserData({...userData,password:event.target.value})}/>

          <button className="submit" 
           onClick={handleSignUp}
         
           >Sign up</button>
          <Link className="link" to="/login">Login</Link>
        </div>
        
    )
}
export default SignUp;
