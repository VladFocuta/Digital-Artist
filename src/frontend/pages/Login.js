import NavigationBar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/signup/login', {
                params: {
                    email: formData.email,
                    password: formData.password,
                }
            });
            if (response.data) {
                localStorage.setItem('token', response.data.accessToken)
                console.log('Login successful:', response.data.accessToken)
                navigate('/Portofolio');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message)
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid email or password.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <div style={{ backgroundColor: 'gray', height: '100vh' }}>
            <NavigationBar />
            <h3 style={{ textAlign: 'center', color: 'white' }}>Login</h3>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <div className="sign-up-form">
                    <div className="sign-up-text">
                        <h4>Digital Artist</h4>
                    </div>
                    <form className="row g-3" onSubmit={handleLogin}>
                        <div className="col-auto">
                            <input type="text" className="form-control" id="inputEmail" onChange={handleChange} name="email" placeholder="Email:" />
                        </div>
                        <div className="col-auto">
                            <input type="password" className="form-control" id="inputPassword" onChange={handleChange} name="password" placeholder="Password:" />
                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;

