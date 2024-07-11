import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {useAuth } from './security/AuthContext'

export default function LoginComponent(){
    const [username, setUsername]= useState('sima')
    const [password, setPassword]= useState('')
   
    const [showErrorMessage, setShowErrorMessage]= useState(false)
    const navigate = useNavigate();
    const authContext = useAuth()

    function handleUsenameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordhange(event){
        setPassword(event.target.value)
    }
    async function handleSubmit(){
        if(await authContext.login(username, password)){   
          
            setShowErrorMessage(false)
        navigate(`/welcome/${username}`)
        }else{
            setShowErrorMessage(true)
        }  
    }
   
    return (
        <div className="Login">
         
          {showErrorMessage &&  <div className='errorMessage'>Authenticated faild, please checked your credentials</div>}
               
                <div className="LoginForm">
                    
                    <div>
                        <label> username</label>
                        <input type="text" name="username" value={username} onChange={handleUsenameChange}></input>
                    </div>
                    <div>
                        <label> password</label>
                        <input type="password" name="password" value={password} onChange={handlePasswordhange}></input>
                    </div>
                    <div>
                        <button type="button" name="login" onClick={handleSubmit}>
                            login
                        </button>
                    </div>
                </div>
        </div>
    )
}