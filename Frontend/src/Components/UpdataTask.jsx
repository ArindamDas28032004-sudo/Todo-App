import '../Style/AddTask.css';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

//import{useNavigate} from 'react-router-dom'
import{useParams} from 'react-router-dom';
function UpdateTask()
{

    const [taskData, setTaskData]=useState({
        "title":"",
        "description":""
    });
    const navigate=useNavigate();
    const {id}=useParams()
    useEffect(()=>
    {
        getTask(id);
    },[id])

    const getTask= async (id)=>
    {
        let task=await fetch(`https://todo-app-backend-rirx.onrender.com/task/`+id)
        task = await task.json()
        if(task.result)
        {
            setTaskData(task.result);
            
        }
    }
    
    const updateTask= async ()=>
    {
        console.log("function call",taskData);
        let task= await fetch("https://todo-app-backend-rirx.onrender.com/update-task",{
            method:'PUT',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':"Application/Json"
            }
        });
        task=await task.json()
        if(task)
        {
            navigate('/');
        }
        console.log(taskData);
    }
    return(
        <div className="container">
            <h1>Update Task</h1>
           
                <label htmlFor="">Title</label>
                <input type="text" name="title" value={taskData.title} placeholder="Enter task title" onChange={(event)=>setTaskData({...taskData,title:event.target.value})
                   
                }/>

                <label htmlFor="">Description</label>
                <textarea  rows={4}name="description" placeholder="Enter task description" value={taskData.description} id="" onChange={(event)=>setTaskData({...taskData,description:event.target.value})
                   
                }></textarea>

                <button className="submit" onClick={updateTask} >Update</button>

            

        </div>
    )
}
export default UpdateTask;
