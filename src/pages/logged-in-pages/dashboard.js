import React from 'react';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
  return (
    <div className="container">
        <button onClick={()=> logout()}>Logout</button>
      <h2 className="my-4">Dashboard</h2>
      <h1>Big Dashboard</h1>
    </div>
  );
};

export default Dashboard;
