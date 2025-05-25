import React from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Skeleton,
  Divider,
} from '@mui/material';
import {
  Power as PowerIcon,
} from '@mui/icons-material';
import EngineChart from '../components/Dashboard/EngineChart';
import GaugeComponent from 'react-gauge-component';
import useFirebaseData from '../hooks/useFirebaseData';
import { formatTimestamp } from '../utils/formatters';

const EngineData = () => {
  // Fetch engine data from Firebase
  const { data: engineData, loading: engineDataLoading } = useFirebaseData('engineDATA');

  // Prepare voltage chart data from real Firebase data
  const voltageChartData = {
    labels: ['L1', 'L2', 'L3'],
    datasets: [
      {
        label: 'Voltage (V)',
        data: [
          engineData?.VoltageL1 ?? 0,
          engineData?.VoltageL2 ?? 0,
          engineData?.VoltageL3 ?? 0,
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare current chart data from real Firebase data
  const currentChartData = {
    labels: ['L1', 'L2', 'L3'],
    datasets: [
      {
        label: 'Current (A)',
        data: [
          engineData?.CurrentL1 ?? 0,
          engineData?.CurrentL2 ?? 0,
          engineData?.CurrentL3 ?? 0,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare bus voltage chart data from real Firebase data
  const busVoltageChartData = {
    labels: ['Bus 1', 'Bus 2', 'Bus 3'],
    datasets: [
      {
        label: 'Bus Voltage (V)',
        data: [
          engineData?.BusVoltage1 ?? 0,
          engineData?.BusVoltage2 ?? 0,
          engineData?.BusVoltage3 ?? 0,
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Engine Data Details
      </Typography>
      
      
      
      {/* Bus Voltage Gauges */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Bus Voltage
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Bus Voltage 1 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Bus Voltage 1</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 50, color: '#f44336', showTick: true },
                      { limit: 100, color: '#ff9800', showTick: true },
                      { limit: 200, color: '#4caf50', showTick: true },
                      { limit: 250, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#1976d2',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' V' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 75 },
                        { value: 150 },
                        { value: 225 },
                        { value: 300 }
                      ],
                    }
                  }}
                  value={engineData?.BusVoltage1 ?? 0}
                  minValue={0}
                  maxValue={300}
                />
              </Box>
            )}
          </Grid>
          
          {/* Bus Voltage 2 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Bus Voltage 2</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 50, color: '#f44336', showTick: true },
                      { limit: 100, color: '#ff9800', showTick: true },
                      { limit: 200, color: '#4caf50', showTick: true },
                      { limit: 250, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#1976d2',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' V' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 75 },
                        { value: 150 },
                        { value: 225 },
                        { value: 300 }
                      ],
                    }
                  }}
                  value={engineData?.BusVoltage2 ?? 0}
                  minValue={0}
                  maxValue={300}
                />
              </Box>
            )}
          </Grid>
          
          {/* Bus Voltage 3 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Bus Voltage 3</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 50, color: '#f44336', showTick: true },
                      { limit: 100, color: '#ff9800', showTick: true },
                      { limit: 200, color: '#4caf50', showTick: true },
                      { limit: 250, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#1976d2',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' V' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 75 },
                        { value: 150 },
                        { value: 225 },
                        { value: 300 }
                      ],
                    }
                  }}
                  value={engineData?.BusVoltage3 ?? 0}
                  minValue={0}
                  maxValue={300}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      {/* Current Gauges */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Current
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Current L1 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Current L1</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 10, color: '#f44336', showTick: true },
                      { limit: 20, color: '#ff9800', showTick: true },
                      { limit: 40, color: '#4caf50', showTick: true },
                      { limit: 50, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#7b1fa2',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' A' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 15 },
                        { value: 30 },
                        { value: 45 },
                        { value: 60 }
                      ],
                    }
                  }}
                  value={engineData?.CurrentL1 ?? 0}
                  minValue={0}
                  maxValue={60}
                />
              </Box>
            )}
          </Grid>
          
          {/* Current L2 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Current L2</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 10, color: '#f44336', showTick: true },
                      { limit: 20, color: '#ff9800', showTick: true },
                      { limit: 40, color: '#4caf50', showTick: true },
                      { limit: 50, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#7b1fa2',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' A' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 15 },
                        { value: 30 },
                        { value: 45 },
                        { value: 60 }
                      ],
                    }
                  }}
                  value={engineData?.CurrentL2 ?? 0}
                  minValue={0}
                  maxValue={60}
                />
              </Box>
            )}
          </Grid>
          
          {/* Current L3 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Current L3</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 10, color: '#f44336', showTick: true },
                      { limit: 20, color: '#ff9800', showTick: true },
                      { limit: 40, color: '#4caf50', showTick: true },
                      { limit: 50, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#7b1fa2',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' A' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 15 },
                        { value: 30 },
                        { value: 45 },
                        { value: 60 }
                      ],
                    }
                  }}
                  value={engineData?.CurrentL3 ?? 0}
                  minValue={0}
                  maxValue={60}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      {/* Voltage Gauges */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Voltage
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Voltage L1 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Voltage L1</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 50, color: '#f44336', showTick: true },
                      { limit: 100, color: '#ff9800', showTick: true },
                      { limit: 200, color: '#4caf50', showTick: true },
                      { limit: 250, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#d32f2f',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' V' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 75 },
                        { value: 150 },
                        { value: 225 },
                        { value: 300 }
                      ],
                    }
                  }}
                  value={engineData?.VoltageL1 ?? 0}
                  minValue={0}
                  maxValue={300}
                />
              </Box>
            )}
          </Grid>
          
          {/* Voltage L2 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Voltage L2</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 50, color: '#f44336', showTick: true },
                      { limit: 100, color: '#ff9800', showTick: true },
                      { limit: 200, color: '#4caf50', showTick: true },
                      { limit: 250, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#d32f2f',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' V' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 75 },
                        { value: 150 },
                        { value: 225 },
                        { value: 300 }
                      ],
                    }
                  }}
                  value={engineData?.VoltageL2 ?? 0}
                  minValue={0}
                  maxValue={300}
                />
              </Box>
            )}
          </Grid>
          
          {/* Voltage L3 Gauge */}
          <Grid item xs={12} sm={6} md={4}>
            {engineDataLoading ? (
              <Skeleton animation="wave" height={150} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Voltage L3</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 50, color: '#f44336', showTick: true },
                      { limit: 100, color: '#ff9800', showTick: true },
                      { limit: 200, color: '#4caf50', showTick: true },
                      { limit: 250, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#d32f2f',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' V' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 75 },
                        { value: 150 },
                        { value: 225 },
                        { value: 300 }
                      ],
                    }
                  }}
                  value={engineData?.VoltageL3 ?? 0}
                  minValue={0}
                  maxValue={300}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
      
    </Box>
  );
};

export default EngineData; 