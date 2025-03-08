import { useState } from 'react';
import { NavBar } from './NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
   
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(data);
        axios.post("http://localhost:8080/alogin", data).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("admin_id", response.data.admin_id);
                    Navigate("/admindash");
                } else {
                    alert("Login Failed");
                }
            }
        ).catch();
    };

    let Navigate = useNavigate();

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
                    }}>
                    <h3 className="text-center"><b>ADMIN LOGIN</b></h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name='email' value={data.email} onChange={inputHandler} />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name='password' value={data.password} onChange={inputHandler} />
                    </div>
                    <br />
                    <button className="btn btn-success w-100" onClick={readValue}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
