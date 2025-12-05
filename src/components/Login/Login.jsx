import React, { use, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router';

const Login = () => {

    const [activeForm, setActiveForm] = useState('login');

    const { signInUser, user } = use(AuthContext)

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        e.target.reset();
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(`${location.state ? location.state : '/'}`)

            })
    }

    return (

        <div >
            <div>
                <button onClick={() => setActiveForm('login')}>Login</button>
                <button onClick={() => setActiveForm('registration')}>Register</button>
            </div>
            <div>
                <form>
                    {activeForm === 'login'(
                        <h1>login form</h1>
                    )} :
                </form>
            </div>
        </div>
    );
};

export default Login;