import { useState } from "react";
import NavigationBar from "../components/Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        repeatPassword: ''
    })

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }
    
    const handleConfirm = (event) => {
        event.preventDefault();
        if (formData.email && formData.password && formData.name && formData.password === formData.repeatPassword) {
            axios.post('http://localhost:8000/signup', {
                email: formData.email,
                password: formData.password,
                name: formData.name
            }).then((res) => {
                navigate('/Login');
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            setErrorMessage('Passwords do not match.')
        };

    }
    
    return (

        <div style={{ backgroundColor: 'gray', height: '100vh' }}>
            <NavigationBar />
            <h3 style={{ textAlign: 'center', color: 'white' }}>Signup</h3>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <div className="sign-up-form">
                    <div className="sign-up-text">
                        <h4>Digital Artist</h4>
                    </div>

                    <form class="row g-3" onSubmit={handleConfirm}>
                        <div class="col-auto">
                            <input type="text" class="form-control" id="inputEmail" onChange={handleChange} name="email" placeholder="Email:" />
                        </div>
                        <div class="col-auto">
                            <input type="text" class="form-control" id="inputName" onChange={handleChange} name="name" placeholder="Name:" />
                        </div>
                        <div class="col-auto">
                            <input type="password" class="form-control" id="inputPassword" onChange={handleChange} name="password" placeholder="Password:" />
                        </div>
                        <div class="col-auto">
                            <input type="password" class="form-control" id="inputRepeatPassword:" onChange={handleChange} name="repeatPassword" placeholder="Repeat password:" />
                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary mb-3">Confirm</button>
                        </div>
                    </form>

                </div>
            </div>


        </div>

    )
}
export default Signup;
