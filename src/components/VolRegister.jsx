import React, { useState } from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'

const VolRegister = () => {
    const [data, setData] = useState(
        {
            "name": "",
            "email": "",
            "address": "",
            "skill": "",
            "age": "",
            "gender": "",
            "phone": "",
            "password": "",
            "cpassword": ""
        }
    )
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const readValue = () => {
        console.log(data)
        axios.post("http://localhost:8080/addvol",data).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status === "success") {
                    alert("Successfully Registered")
                } else {
                    alert("Registration Failed")
                }
            }
        ).catch()
    }
    return (
        <div>
            <NavBar /><br />
            <center><h2><b>VOLUNTEER REGISTER</b></h2></center>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">Name</form>
                                <input type="text" className="form-control" name='name' value={data.name} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">Email</form>
                                <input type="text" className="form-control" name='email' value={data.email} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <form action="" className="label-form">Address</form>
                                <textarea id="" className="form-control" name='address' value={data.address} onChange={inputHandler}></textarea>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">Skill</form>
                                <input type="text" className="form-control" name='skill' value={data.skill} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">
                                    <label for="ageSelect">Age</label>
                                    <select id="ageSelect" class="form-control" name='age' value={data.age} onChange={inputHandler}>
                                        <option value="" disabled selected>Select your age range</option>
                                        <option value="18-24">18-24</option>
                                        <option value="25-34">25-34</option>
                                        <option value="35-44">35-44</option>
                                        <option value="45-54">45-54</option>
                                        <option value="55-64">55-64</option>
                                        <option value="65+">65+</option>
                                    </select>
                                </form>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">Gender</form>
                                <div className="form-control">
                                    <input type="radio" name="gender" value="male" checked={data.gender === "male"} onChange={inputHandler} />
                                    <label>Male</label>
                                    <input type="radio" name="gender" value="female" checked={data.gender === "female"} onChange={inputHandler} />
                                    <label>Female</label>
                                    <input type="radio" name="gender" value="other" checked={data.gender === "other"} onChange={inputHandler} />
                                    <label>Other</label>
                                </div>
                            </div>



                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">Phone</form>
                                <input type="text" className="form-control" name='phone' value={data.phone} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">Password</form>
                                <input type="password" className="form-control" name='password' value={data.password} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <form action="" className="label-form">Confirm Password</form>
                                <input type="password" className="form-control" name='cpassword' value={data.cpassword} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br />
                                <button className="btn btn-success" onClick={readValue}>Register</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default VolRegister