import React, { useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" }); // Clear error for the current field
    };

    const validateForm = () => {
        const newErrors = {};
        if (!data.email) {
            newErrors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!data.password) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const readValue = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post("http://localhost:8080/ulogin", data);
            if (response.data.status === "success") {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("user_id", response.data.user_id);
                sessionStorage.setItem("user_name", response.data.user_name);
                sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("phone", response.data.phone);
                sessionStorage.setItem("address", response.data.address);

                navigate("/userdash");
            } else {
                alert("Login Failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <div>
            <NavBar /><br />
            <div
                style={{
                    height: '100vh',
                    backgroundImage: `url('globe.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                        width: '300px',
                    }}
                >
                    <h3 className="text-center"><b>USER LOGIN</b></h3>
                    <br />
                    <form onSubmit={readValue}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name='email'
                                value={data.email}
                                onChange={inputHandler}
                                required
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name='password'
                                value={data.password}
                                onChange={inputHandler}
                                required
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>
                        <br />
                        <button className="btn btn-success w-100" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
