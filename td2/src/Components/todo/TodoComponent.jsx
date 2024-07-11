import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Field, Formik, Form, ErrorMessage  } from "formik"
import moment from "moment"

export default function TodoComponent(){
   const {id} = useParams()
   const [description, setDescription]=  useState('')
   const [targetDate, setTargetDate]=  useState('')
   const authContext =  useAuth()
   const navigate = useNavigate()
   const username = authContext.username
  //useEffect to call retrieveTodos at the load of the Todo page.
  //I would want this to be refreshed only when the ID value changes.
   useEffect(
    ()=> retrieveTodos(), 
    [id]
   ) 
   function retrieveTodos(){
    if (id != -1){
        retrieveTodoApi(username, id)
            .then(response=> {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            }
        )
        .catch(error=>console.log(error))
   }
}
   function onSubmit(values){
        console.log('onSubmit1' + values)
        const todo =  {
            id: id, 
            username: username, 
            description: values.description, 
            targetDate: values.targetDate, 
            done: false
        }
        console.log('in the onSubmit'+ todo)
        
        if (id==-1){
            
            createTodoApi(username,  todo)
            .then(response=> {
                 navigate('/todos')
            })
            .catch(error=>console.log(error))
        }else{

        updateTodoApi(username, id, todo)
        .then(response=> {
             navigate('/todos')
        })
        .catch(error=>console.log(error))
    }

   }

   function validate(values){
    let errors = {
        // description: 'enter more than 3 char',
        // targetDate: 'enter valid date'
       
    }
     if (values.description.length<4){
            errors.description = "enter atleast 4 char"
        }
    if (values.targetDate == null || values.targetDate ==''||!moment(values.targetDate).isValid()){
            errors.targetDate = "enter a date in future"
    }
    console.log('validate1'+ values)

    return errors
}
   
    return(
        <div className="container">

            <h1> enter Todo Details </h1>
            <Formik initialValues={{description, targetDate}}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange= {false}
            validateOnBlur={false}>
                {
                    (props)=>(
                        <div>
                          <Form>
                            <ErrorMessage 
                            name="description" 
                            component="div"
                            className="alert alert-warning"></ErrorMessage>
                            <ErrorMessage 
                            name="targetDate" 
                            component="div"
                            className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>

                            </Form>
                        </div>
                    )
                }
            </Formik>


        </div>
    )
}