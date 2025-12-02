import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router';

const Registration = () => {

    const { createUser, signInWithGoogle } = use(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegistration = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        e.target.reset()

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                navigate(`${location.state ? location.state : '/'}`)
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Register</h1>
                        <form onSubmit={handleRegistration}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Registration</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;