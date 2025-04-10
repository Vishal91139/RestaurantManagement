import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login',form);
      if (res.data.success) {
        login(res.data)
        alert("Login successful");
        navigate('/');
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className='h-screen' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
