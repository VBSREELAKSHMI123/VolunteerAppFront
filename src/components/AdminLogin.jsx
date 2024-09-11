
import { useState } from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [data,setData]=useState({
        
            "email":"",
            "password":""
        
    })
   
    const inputHandler=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
    }
    const readValue=()=>{
        console.log(data)
        axios.post("http://localhost:8080/alogin",data).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status == "success") {
                    sessionStorage.setItem("token",response.data.token)
                    sessionStorage.setItem("admin_id",response.data.admin_id)
                    Navigate("/admindash")
                  
                } else {
                    alert("Login Failed")
                }
            }
        ).catch()
    }
    let Navigate=useNavigate()
  return (
    <div>
         <NavBar/><br />
    <center><h2><b>ADMIN LOGIN</b></h2></center><br />
<div className="container">
    <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form action="" className="label-form">Email</form>
                    <input type="text" className="form-control" name='email' value={data.email} onChange={inputHandler}/>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <form action="" className="label-form">Password</form>
                    <input type="password" className="form-control" name='password' value={data.password} onChange={inputHandler}/>
                </div>
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"><br /> 
                <button className="btn btn-success" onClick={readValue}>Login</button>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
  )
}

export default AdminLogin
