import React, { useState } from 'react'
import { NavBar } from './NavBar'
import axios from 'axios';

const UserRegister = () => {
    const [data, setData] = useState({
        "name": "",
        "email": "",
        "phone": "",
        "address": "",
        "password": "",
        "cpassword": ""
    });

    const [errors, setErrors] = useState({});

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!data.name) newErrors.name = "Name is required";
        if (!data.email) newErrors.email = "Email is required";
        if (!data.phone) newErrors.phone = "Phone is required";
        if (!data.address) newErrors.address = "Address is required";
        if (!data.password) newErrors.password = "Password is required";
        if (data.password !== data.cpassword) newErrors.cpassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const readValue = () => {
        if (!validateForm()) return;

        axios.post("http://localhost:8080/adduser", data).then(
            (response) => {
                console.log(response.data)
                if (response.data.status === "success") {
                    alert("Successfully Registered")
                } else {
                    alert("Registration Failed")
                }
            }
        ).catch((error) => {
            console.error("Registration Error:", error);
        });
    };

    return (
        <div>
            <NavBar /><br />
            <center><h2><b>USER REGISTER</b></h2></center><br />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="row">
                            <div className="col col-12 col-sm-12 col-md-6">
                                <form className="label-form">Name</form>
                                <input type="text" className="form-control" name='name' value={data.name} onChange={inputHandler} />
                                {errors.name && <small className="text-danger">{errors.name}</small>}
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6">
                                <form className="label-form">Email</form>
                                <input type="text" className="form-control" name='email' value={data.email} onChange={inputHandler} />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6">
                                <form className="label-form">Phone</form>
                                <input type="text" className="form-control" name='phone' value={data.phone} onChange={inputHandler} />
                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6">
                                <form className="label-form">Address</form>
                                <textarea className="form-control" name='address' value={data.address} onChange={inputHandler}></textarea>
                                {errors.address && <small className="text-danger">{errors.address}</small>}
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6">
                                <form className="label-form">Password</form>
                                <input type="password" className="form-control" name='password' value={data.password} onChange={inputHandler} />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6">
                                <form className="label-form">Confirm Password</form>
                                <input type="password" className="form-control" name='cpassword' value={data.cpassword} onChange={inputHandler} />
                                {errors.cpassword && <small className="text-danger">{errors.cpassword}</small>}
                            </div>
                            <div className="col col-12"><br />
                                <button className="btn btn-success" onClick={readValue}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegister
