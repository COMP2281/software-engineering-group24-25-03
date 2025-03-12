import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Home from './Home';

// Data representing tasks status per day (or period)
const tasksByDay = [
  { day: 'Monday', completed: 10, inProgress: 5, notStarted: 2 },
  { day: 'Tuesday', completed: 15, inProgress: 3, notStarted: 7 },
  { day: 'Wednesday', completed: 20, inProgress: 8, notStarted: 5 },
  { day: 'Thursday', completed: 12, inProgress: 10, notStarted: 8 },
  { day: 'Friday', completed: 25, inProgress: 7, notStarted: 4 },
];

// Data summarizing overall task statuses
const overallStatus = [
  { status: 'Completed', count: 82 },
  { status: 'In Progress', count: 33 },
  { status: 'Not Started', count: 26 },
];

// Colors for the Pie Chart slices
const COLORS = ['#82ca9d', '#8884d8', '#ffc658'];

const ReportPage = () => {
  return (
    <Home>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>Tracker Reports</h1>
        <br />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Chart 1: Grouped Bar Chart for Task Status by Day */}
          <div style={{ flex: '1 1 calc(50% - 20px)', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tasksByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                <Bar dataKey="inProgress" fill="#8884d8" name="In Progress" />
                <Bar dataKey="notStarted" fill="#ffc658" name="Not Started" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Pie Chart for Overall Task Distribution */}
          <div style={{ flex: '1 1 calc(50% - 20px)', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={overallStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {overallStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Line Chart for Completed Tasks Trend */}
          <div style={{ flex: '1 1 calc(50% - 20px)', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tasksByDay} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#82ca9d" name="Completed" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4: Line Chart for In Progress Tasks Trend */}
          <div style={{ flex: '1 1 calc(50% - 20px)', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tasksByDay} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="inProgress" stroke="#8884d8" name="In Progress" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Home>
  );
};

export default ReportPage;
