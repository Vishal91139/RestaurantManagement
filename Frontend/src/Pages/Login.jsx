// src/Pages/LoginPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { gsap } from 'gsap';
import './LoginPage.css';

const API_URL = 'http://localhost:5001/api/auth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Create refs for GSAP animations
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const formRef = useRef(null);

    // Redirect to home '/' after login, or where the user came from
    const from = location.state?.from?.pathname || '/';

    // Initialize GSAP animations when component mounts
    useEffect(() => {
        if (containerRef.current && cardRef.current && formRef.current) {
            // Animate container
            gsap.fromTo(containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
            );

            // Animate card
            gsap.fromTo(cardRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
            );

            // Animate form elements
            gsap.fromTo(formRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.4 }
            );
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            login(response.data.user, response.data.token); // Call context login
            navigate(from, { replace: true }); // Redirect
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Login failed. Check credentials.');
        }
    };

    return (
        <div className="login-page-container" ref={containerRef}>
            <div className="login-card" ref={cardRef}>
                <div className="login-header">
                    <h1 className="login-title fade-in">Welcome Back</h1>
                    <p className="login-subtitle slide-up">Sign in to continue your flavor journey</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email-address" className="form-label">Email Address</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Sign In
                    </button>

                    <div className="auth-switch">
                        <span>Don't have an account?</span>
                        <Link to="/signup" className="auth-switch-link">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;