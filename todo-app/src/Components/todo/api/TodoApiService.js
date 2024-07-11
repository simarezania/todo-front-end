import axios from "axios";
import { apiClient } from "./ApiClient";


export const retrieveAllTodosForUsernameApi
        = (username) => apiClient.get(`/users/${username}/todos`)
        //http://localhost:8080/users/sima/todos

export const deleteTodoApi
        = (username,id) => apiClient.delete(`/users/${username}/todos/${id}`)
        //http://localhost:8080/users/sima/todos/1

export const retrieveTodoApi
        = (username,id) => apiClient.get(`/users/${username}/todos/${id}`)
        //http://localhost:8080/users/sima/todos/1

export const updateTodoApi
        = (username,id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)
        //http://localhost:8080/users/sima/todos/1

export const createTodoApi
        = (username,todo) => apiClient.post(`/users/${username}/todos`, todo)
        //http://localhost:8080/users/sima/todos