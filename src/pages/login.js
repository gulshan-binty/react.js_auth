import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dexie from 'dexie';

const db = new Dexie('UserDatabase');
db.version(1).stores({
  users: '++id,firstname,lastname,email,password',
});

const Login = () => {
  const history = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

    // Retrieve the user from IndexedDB based on the entered email
    const user = await db.users.where('email').equals(email).first();

    if (user && user.password === password) {
      // User exists and password matches
      localStorage.setItem('isLoggedIn', 'true');
      history('/dashboard'); // Redirect to the dashboard
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">User Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
