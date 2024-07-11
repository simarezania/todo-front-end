import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";
import { apiClient } from "../api/ApiClient";
export const AuthContext =  createContext()
export const useAuth = ()=> useContext(AuthContext)
export default function Authprovider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
  
    // function login(username, password){
    //     if(username==='sima' && password==='123'){
    //        setAuthenticated(true)
    //        setUsername(username)
    //        return true
    //     }else{
    //        setAuthenticated(false)
    //        setAuthenticated(null)
    //         return false
    //     }  
    // }
//we would want it to stop execution until we get the response back. If we get the response back, 
//we would want to send it true back so make the method async .
    async function login(username, password){
        //Authorization:'Basic c2ltYToxMjM='
        //window.btoa for encoding base64
        const baToken = 'Basic ' + window.btoa(username + ':' + password) 
        try {
            const response= await executeBasicAuthenticationService(baToken)
            //that means we are getting a successful response back.
            if(response.status==200){
            setAuthenticated(true)
            setUsername(username)
            setToken(baToken)

            //interceptors: at the time of login, as soon as the user logged in, 
            //I would want to say, "Any API client calls, please add this header. Please add the token into the header,"
            //https://www.udemy.com/course/spring-boot-and-spring-framework-tutorial-for-beginners/learn/lecture/35017800#overview

            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = baToken
                    return config
                }
            )

            return true
            }else{
            logout()
            return false
            } 
        } catch(error){
            logout()
            return false
        }
    }


    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}