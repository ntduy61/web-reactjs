import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>150</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>120</p>
        </div>
        <div className="stat-card">
          <h3>New Signups</h3>
          <p>30</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
