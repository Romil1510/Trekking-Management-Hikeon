import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MonthlyBookingChart = ({ bookings }) => {
  // Process bookings data to get monthly counts
  const getMonthlyData = () => {
    const monthlyData = new Array(12).fill(0).map((_, index) => ({
      month: new Date(2024, index).toLocaleString('default', { month: 'short' }),
      count: 0,
    }));

    bookings.forEach(booking => {
      const date = new Date(booking.date);
      const monthIndex = date.getMonth();
      monthlyData[monthIndex].count += 1;
    });

    return monthlyData;
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-md p-4 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Booking Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={getMonthlyData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBookingChart;