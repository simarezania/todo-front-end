
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'
export default function WelcomeComponent(){
    //const params = useParams() OR
    const {username} = useParams()
    const authContext = useAuth()
    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){
        // retrieveHelloWorldBean()
        // .then ((response)=>successfulResponse(response))
        // .catch ((error)=>errorResponse(error))
        // .finally(()=>errorResponse('cleanup'))
        
        retrieveHelloWorldPathVariable('sima', authContext.token)
        .then ((response)=>successfulResponse(response))
        .catch ((error)=>errorResponse(error))
        .finally(()=>errorResponse('cleanup'))
    }

    function successfulResponse(response){
       setMessage(response.data.message)
       console.log(message)
       console.log(response.data.message)
    }
    
    function errorResponse(error){
        console.log(error)
    }
    
    return (
    <div>
       <h2>welcome ff {username}  </h2>
       your todos is <Link to="/todos">here</Link>
       <div>
            <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>
                API
            </button>
        
            <div className="text-info">
                {message}
            </div>
       </div>

    </div>
    )
}