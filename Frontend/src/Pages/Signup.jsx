// src/Pages/SignupPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './SignupPage.css';

const API_URL = 'http://localhost:5001/api/auth';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Create refs for GSAP animations
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const formRef = useRef(null);

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
        setSuccess('');
        try {
            // Make sure password meets backend requirements if any
            await axios.post(`${API_URL}/signup`, { username, email, password });
            setSuccess('Signup successful! Redirecting to login...');
            // Redirect to login after a short delay
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error('Signup failed:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-page-container" ref={containerRef}>
            <div className="signup-card" ref={cardRef}>
                <div className="signup-header">
                    <h1 className="signup-title fade-in">Create Account</h1>
                    <p className="signup-subtitle slide-up">Join us and start your flavor journey</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit} ref={formRef}>
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="success-message">
                            <p>{success}</p>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email-address-signup" className="form-label">Email Address</label>
                        <input
                            id="email-address-signup"
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
                        <label htmlFor="password-signup" className="form-label">Password</label>
                        <input
                            id="password-signup"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Create a password"
                        />
                    </div>

                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>

                    <div className="auth-switch">
                        <span>Already have an account?</span>
                        <Link to="/login" className="auth-switch-link">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;