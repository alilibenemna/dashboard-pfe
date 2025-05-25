import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Component for displaying engine data in a chart
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Chart title
 * @param {Object} props.data - Chart data
 * @param {string} [props.type='line'] - Chart type ('line' or 'bar')
 * @param {boolean} [props.loading=false] - Whether data is loading
 * @param {string} [props.yAxisLabel='Value'] - Y-axis label
 * @param {string} [props.xAxisLabel='Time'] - X-axis label
 */
const EngineChart = ({
  title,
  data,
  type = 'line',
  loading = false,
  yAxisLabel = 'Value',
  xAxisLabel = 'Time',
}) => {
  // Default chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        
        {loading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexGrow: 1,
              minHeight: 250
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, height: 250, position: 'relative' }}>
            {data ? (
              type === 'line' ? (
                <Line options={options} data={data} />
              ) : (
                <Bar options={options} data={data} />
              )
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No data available
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EngineChart; 