import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPrompt.css';

const LoginPrompt = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="login-prompt-overlay">
      <div className="login-prompt">
        <div className="login-prompt-header">
          <h2>Authentication Required</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="login-prompt-content">
          <p>You need to be logged in to book a table.</p>
          
          <div className="login-prompt-actions">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
          
          <button 
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
