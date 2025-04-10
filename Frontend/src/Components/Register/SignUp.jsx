import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup', form)
      .then(res => {
        if (res) {
          alert("Signup successful");
        } else {
          alert(res.data.message || "Signup failed");
        }
      })
      .catch(err => console.error(err));
    navigate('/login');
  };

  const navigate = useNavigate();

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
      <button type="submit">Signup</button>
    </form>
      <h1>Already have account.?</h1>
      <Link to='/login'>Login</Link>
    </>
  );
}
