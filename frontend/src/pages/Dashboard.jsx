import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, rejectedUsers: 0, approvedUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://resume-shortlister-particles.onrender.com/dashboard');
        setStats(response.data);
      } catch (error) {
        setError('There was an error fetching the stats!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const data = {
    labels: ['Approved Users', 'Rejected Users'],
    datasets: [
      {
        data: [stats.approvedUsers, stats.rejectedUsers],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverBackgroundColor: ['#45a049', '#e53935'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Doughnut data={data} className='mt-11' />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-600">
              {stats.approvedUsers + stats.rejectedUsers}
            </h1>
            <p className="text-sm">Total Users</p>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <h1 className="text-3xl font-bold text-blue-600">{stats.totalUsers}</h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3">
          <h3 className="text-lg font-semibold">Approved Users</h3>
          <h1 className="text-3xl font-bold text-green-600">{stats.approvedUsers}</h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 text-center w-1/3">
          <h3 className="text-lg font-semibold">Rejected Users</h3>
          <h1 className="text-3xl font-bold text-red-600">{stats.rejectedUsers}</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
