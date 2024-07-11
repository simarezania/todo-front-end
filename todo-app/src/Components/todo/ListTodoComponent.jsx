import { useEffect, useState } from "react"
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ListTodoComponent(){
    //const params = useParams() OR
    const today = new Date()
    const authContext = useAuth()
    const username = authContext.username
    const targerDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    // const todos = [
    //     // {id:1, description: "description1", done:false, targerDate: targerDate}, 
    //     // {id:2, description: "description2", done:false, targerDate: targerDate}, 
    //     // {id:3, description: "description3", done:false, targerDate: targerDate}
    // ]

    useEffect(() => refreshTofdos(), [])

    function refreshTofdos(){
        retrieveAllTodosForUsernameApi(username)
        .then(responce=>
            {console.log(responce.data)  
                setTodos(responce.data)  
            }
        )

        .catch(error=>console.log(error))
    }
    
    function deleteTodo(id){
        console.log('delete clicked' + id)
        deleteTodoApi(username,id)
        .then (
            ()=>{
                setMessage(`delete with id= ${id} success`)
                refreshTofdos()
            }
        )
        .catch(error=>console.log(error))
    }

    function updateTodo(id){
        console.log('update clicked' + id)
        navigate(`/todo/${id}`)
    }
    function addNewTodo(){
        console.log('addNewTodo clicked' )
        navigate(`/todo/-1`)
    }

    return (
    <div className='container'>
      {message && <div className="alert alert-warning">{message}</div>}  
       <div><table className='table'>
        <thead>
            <tr>
                <th>id </th>
                <th>description </th>
                <th>is done </th>
                <th>target Date </th>
                <th>Delete</th>
                <th>Update</th>
            </tr>
        </thead>
        <tbody>
            {
                    todos.map(
                        todo=> (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description} </td>
                           
                            <td>{todo.done.toString()} </td>
                            <td>{todo.targetDate.toString()}</td>
                            <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)} >Delete </button></td>
                            <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)} >Update </button></td>
                        </tr>)
                    )
            }
        </tbody>
       </table>
       </div>
       <div>
            <button className="btn btn-success" onClick={addNewTodo}>Add new todo </button>
       </div>
    </div>
    )
}
