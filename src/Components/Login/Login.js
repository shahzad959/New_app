import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/');
        }
    }, [navigate]);

    const login = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const json = await res.json();
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('email', email);
                navigate('/');
                window.location.reload();
            } else {
                if (json.errors) {
                    setError(json.errors.map((err) => err.msg).join('\n'));
                } else {
                    setError(json.error || 'Login failed. Please try again.');
                }
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div>
            <div className="container">
                <div className="login-grid">
                    <div className="login-text">
                        <h2>Login</h2>
                    </div>
                    <div className="login-text">
                        Are you a new member?{' '}
                        <span>
                            <Link to="/signup" style={{ color: '#2190FF' }}>
                                Sign Up Here
                            </Link>
                        </span>
                    </div>
                    <br />
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="login-form">
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    aria-describedby="helpId"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    aria-describedby="helpId"
                                    required
                                />
                            </div>
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                                <button type="reset" className="btn btn-danger" onClick={resetForm}>
                                    Reset
                                </button>
                            </div>
                            <br />
                            <div className="login-text">
                                Forgot Password?
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;