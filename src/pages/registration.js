import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dexie from 'dexie';

const db = new Dexie('UserDatabase');
db.version(1).stores({
  users: '++id,firstname,lastname,email,password',
});

const Registration = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const newUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    };

    try {
      await db.users.add(newUser);
      alert('Registration successful!');
      setUser({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      history('/login')
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="firstname"
            placeholder="First Name"
            value={user.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="lastname"
            placeholder="Last Name"
            value={user.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Registration;
