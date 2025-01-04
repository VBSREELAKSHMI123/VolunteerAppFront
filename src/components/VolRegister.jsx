import React, { useState } from 'react'
import { NavBar } from './NavBar'
import axios from 'axios'

const VolRegister = () => {
    const [data, setData] = useState({
        "name": "",
        "email": "",
        "address": "",
        "certificate": "",
        "skill": "",
        "age": "",
        "gender": "",
        "phone": "",
        "password": "",
        "cpassword": ""
    })
    const [error, setError] = useState("");

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        setError(""); // Clear error when input changes
    }

    const readValue = () => {
        // Basic validation
        if (!data.name || !data.email || !data.address || !data.skill || !data.age || !data.gender || !data.phone || !data.password || !data.cpassword) {
            setError("All fields are required.");
            return;
        }
        if (data.password !== data.cpassword) {
            setError("Passwords do not match.");
            return;
        }

        // If validation passes, proceed with the request
        console.log(data);
        axios.post("http://localhost:8080/addvol", data)
            .then(response => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully Registered");
                } else {
                    alert("Registration Failed");
                }
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }

    return (
        <div>
            <NavBar /><br />
            <center><h2><b>VOLUNTEER REGISTER</b></h2></center>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="row g-3">
                            <div className="col-md-6">
                                <form className="label-form">Name</form>
                                <input type="text" className="form-control" name='name' value={data.name} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Email</form>
                                <input type="text" className="form-control" name='email' value={data.email} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Address</form>
                                <textarea className="form-control" name='address' value={data.address} onChange={inputHandler}></textarea>
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Certificate</form>
                                <input type="file" className="form-control" name='certificate' value={data.certificate} onChange={inputHandler}/>
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Skill</form>
                                <input type="text" className="form-control" name='skill' value={data.skill} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <label className="label-form" htmlFor="ageSelect">Age</label>
                                <select id="ageSelect" className="form-control" name='age' value={data.age} onChange={inputHandler}>
                                    <option value="" disabled>Select your age range</option>
                                    <option value="18-24">18-24</option>
                                    <option value="25-34">25-34</option>
                                    <option value="35-44">35-44</option>
                                    <option value="45-54">45-54</option>
                                    <option value="55-64">55-64</option>
                                    <option value="65+">65+</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Gender</form>
                                <div className="form-control">
                                    <input type="radio" name="gender" value="male" checked={data.gender === "male"} onChange={inputHandler} />
                                    <label>Male</label>
                                    <input type="radio" name="gender" value="female" checked={data.gender === "female"} onChange={inputHandler} />
                                    <label>Female</label>
                                    <input type="radio" name="gender" value="other" checked={data.gender === "other"} onChange={inputHandler} />
                                    <label>Other</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Phone</form>
                                <input type="text" className="form-control" name='phone' value={data.phone} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Password</form>
                                <input type="password" className="form-control" name='password' value={data.password} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6">
                                <form className="label-form">Confirm Password</form>
                                <input type="password" className="form-control" name='cpassword' value={data.cpassword} onChange={inputHandler} />
                            </div>
                            <div className="col-md-6"><br />
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
