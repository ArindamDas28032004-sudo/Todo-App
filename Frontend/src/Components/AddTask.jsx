import '../Style/AddTask.css';
import {useState} from 'react';
import{useNavigate} from 'react-router-dom'
function AddTask()
{

    const [taskData, setTaskData]=useState();
    const navigate=useNavigate();

    const handleAddTask= async()=>
    {
        console.log(taskData);
        let result=  await fetch('https://todo-app-backend-rirx.onrender.com/add-task',{
            method:'POST',
            body:JSON.stringify(taskData),
            credentials:'include',
            headers:{
                
                'Content-Type':'application/Json'
            }

        })
        result= await result.json()
        if(result.success)
        {
            navigate('/');
            console.log("new task added");
        }
        else
        {
            alert('try after sometime');
        }
    }
    

    return(
        <div className="container">
            <h1>Add new task</h1>
           
                <label htmlFor="">Title</label>
                <input type="text" name="title" placeholder="Enter task title" onChange={(event)=>setTaskData({...taskData,title:event.target.value})
                   
                }/>

                <label htmlFor="">Description</label>
                <textarea  rows={4}name="description" placeholder="Enter task description" id="" onChange={(event)=>setTaskData({...taskData,description:event.target.value})
                   
                }></textarea>

                <button className="submit" onClick={
                    handleAddTask
                }>Add New Task</button>

            

        </div>
    )
}
export default AddTask;
