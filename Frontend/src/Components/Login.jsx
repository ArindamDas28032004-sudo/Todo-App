import "../Style/AddTask.css";
import {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
function Login()
{
    const[userData,setUserData]=useState(
        {
            email:"",
            password:""
        }
    )
const navigate=useNavigate()
useEffect(()=>
{
    if(localStorage.getItem('login')){
        navigate('/')
    }
    
},[])


     const handleLogin= async ()=>{
        
        let result= await fetch('http://localhost:5000/login',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'Application/Json'
            }
           
        })
        console.log(userData);
        result=await result.json()
        if(result.success)
        {
            console.log(result);
            document.cookie="token="+result.token
            localStorage.setItem('login',userData.email);
            window.dispatchEvent(new Event('localStorage-change'))
            navigate('/');
        }
        else{
            alert('Login failed. Please enter valid credentials.');
        }
    }
    return(
        <div className="container">
            <h1>Login</h1>

            <label htmlFor="">Email</label>
            <input onChange={(event)=>setUserData({...userData,email:event.target.value})}
            type="text" name="email" placeholder="Enter user email"/>

            <label htmlFor="">Password</label>
            <input onChange={(event)=>setUserData({...userData,password:event.target.value})}
            name="password" placeholder="Enter your password" type="password"/>

            <button className="submit" type="submit" onClick={handleLogin}>Login</button>

            <Link className="link" to="/signup">Sign up</Link>
        </div>
    )
}
export default Login;