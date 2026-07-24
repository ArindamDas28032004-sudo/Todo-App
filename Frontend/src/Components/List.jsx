import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import "../Style/List.css";
function List() {
  const [taskData, setTaskData] = useState();
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getListData();
  },[]);
  const getListData = async () => {
    let list = await fetch("https://todo-app-backend-rirx.onrender.com/tasks",{
      credentials:'include'
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }

   else{
    alert('try after some time');
   }
  };

  const deleteTask = async (id) => {
    let item = await fetch("https://todo-app-backend-rirx.onrender.com/delete/" + id, {
      method: "delete",
       credentials:'include',
    });
    item = await item.json();
    if (item.success) {
      console.log("item deleted");
      getListData();
    }
    else
    {
      alert('try after some time');
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      let items = taskData.map((item) => item._id);
      setSelectedTask(items);
      console.log(items);
    } else {
      setSelectedTask([]);
    }
  };

  const selectSingleItem=(id)=>
  {
    console.log(id);
    if(selectedTask.includes(id))
    {
      let items=selectedTask.filter((item)=>item!=id)
      setSelectedTask([items]);
      console.log(items);
    }
    else
    {
      setSelectedTask([id,...selectedTask])
    }
  }
const deleteMultiple= async ()=>
{
  let item = await fetch("https://todo-app-backend-rirx.onrender.com/delete-multiple/",  {
      method: "delete",
       credentials:'include',
      body:JSON.stringify(selectedTask),
      headers:{
        'Content-Type':'Application/Json'
      }
    });
    item = await item.json();
    if (item.success) {
      console.log("item deleted");
      getListData();
    }
    else
    {
      alert('try after some time');
    }
}

  return (
    <div className="List-container">
      <h1>Todo List</h1>
    <button onClick={deleteMultiple}className="delete-item delete-multiple">Delete</button>
      <ul className="task-list">
        <li className="list-header" onChange={selectAll}>
          <input type="checkbox" />
        </li>
        <li className="list-header">Sl.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>

        {taskData &&
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item">
                <input
                onChange={()=> selectSingleItem(item._id)}
                  checked={selectedTask.includes(item._id)}
                  type="checkbox"
                />
              </li>
              <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button
                  className="delete-item"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>
                <Link to={"update/" + item._id} className="update-item">
                  Update
                </Link>
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
}
export default List;
