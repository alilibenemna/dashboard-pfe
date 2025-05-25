import React from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Paper,
  Divider,
  Skeleton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Circle as StatusIcon,
} from '@mui/icons-material';

import AlertItem from '../components/Dashboard/AlertItem';
import GaugeComponent from 'react-gauge-component';
import useFirebaseData from '../hooks/useFirebaseData';
import { formatTimestamp, getBatteryColor, getPercentageColor, getStatusColor } from '../utils/formatters';

// Helper function to extract numeric values from string data
const extractNumericValue = (str) => {
  if (!str) return 0;
  if (typeof str === 'number') return str;
  const match = str.match(/^(\d+(\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
};

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // Fetch data from Firebase
  const { data: controllerData, loading: controllerLoading } = useFirebaseData('controller');
  const { data: statusData, loading: statusLoading } = useFirebaseData('status');
  const { data: alertsData, loading: alertsLoading } = useFirebaseData('Alerts');

  // Determine engine status color
  const engineStatusColor = getStatusColor(statusData?.engine_status_code);
  
  // Extract key metrics
  const rpm = extractNumericValue(controllerData?.RPM);
  const oilPressure = extractNumericValue(controllerData?.oil_pressure);
  const batteryLevel = extractNumericValue(controllerData?.battery_level);
  const fuelLevel = extractNumericValue(controllerData?.fuel_level);
  const temperature = extractNumericValue(controllerData?.temperature);

  // Gauge size based on screen size
  const gaugeHeight = isSmallScreen ? 120 : 150;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Controllers
      </Typography>
      
      {/* Status and Alert Card - Side by Side */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Engine Status */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <StatusIcon sx={{ color: engineStatusColor, mr: 1 }} />
              <Typography variant="h6" component="div">
                Engine Status
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {statusLoading ? (
              <Skeleton animation="wave" height={60} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 2, 
                px: 2, 
                bgcolor: engineStatusColor, 
                color: 'white',
                borderRadius: 2,
                boxShadow: 1
              }}>
                <Typography variant="h5" fontWeight="bold">
                  {statusData?.engine_status || 'Unknown'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
                  Status Code: {statusData?.engine_status_code || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
                  Last updated: {formatTimestamp(statusData?.timestamp)}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Latest Alert */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <WarningIcon sx={{ mr: 1, color: alertsData?.battery_alert ? 'warning.main' : 'text.secondary' }} />
              <Typography variant="h6" component="div">
                Latest Alert
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {alertsLoading ? (
              <Skeleton animation="wave" height={80} />
            ) : alertsData?.battery_alert ? (
              <AlertItem
                message={alertsData.battery_alert}
                timestamp={alertsData.timestamp}
                severity="warning"
              />
            ) : (
              <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color="success.main" fontWeight="medium">
                  No active alerts — System operating normally
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Controller Metrics Gauges - Responsive Grid */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Controller Metrics
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          {/* Row 1: RPM, Oil Pressure, Temperature */}
          <Grid item xs={12} sm={4}>
            {controllerLoading ? (
              <Skeleton animation="wave" height={gaugeHeight} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>RPM</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 500, color: '#4caf50', showTick: true },
                      { limit: 1000, color: '#4caf50', showTick: true },
                      { limit: 1500, color: '#ff9800', showTick: true },
                      { limit: 2000, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#345243',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' rpm' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 500 },
                        { value: 1000 },
                        { value: 1500 },
                        { value: 2000 },
                        { value: 2500 }
                      ],
                    }
                  }}
                  value={rpm}
                  minValue={0}
                  maxValue={2500}
                />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} sm={4}>
            {controllerLoading ? (
              <Skeleton animation="wave" height={gaugeHeight} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Oil Pressure</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 3, color: '#f44336', showTick: true },
                      { limit: 6, color: '#ff9800', showTick: true },
                      { limit: 8, color: '#4caf50', showTick: true },
                      { limit: 9, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#345243',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' bar' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 2.5 },
                        { value: 5 },
                        { value: 7.5 },
                        { value: 10 }
                      ],
                    }
                  }}
                  value={oilPressure}
                  minValue={0}
                  maxValue={10}
                />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} sm={4}>
            {controllerLoading ? (
              <Skeleton animation="wave" height={gaugeHeight} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Temperature</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 20, color: '#4caf50', showTick: true },
                      { limit: 40, color: '#4caf50', showTick: true },
                      { limit: 60, color: '#ff9800', showTick: true },
                      { limit: 80, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: '#d32f2f',
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + ' °C' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 20 },
                        { value: 40 },
                        { value: 60 },
                        { value: 80 },
                        { value: 100 }
                      ],
                    }
                  }}
                  value={temperature}
                  minValue={0}
                  maxValue={100}
                />
              </Box>
            )}
          </Grid>
          
          {/* Row 2: Battery and Fuel levels */}
          <Grid item xs={12} sm={6}>
            {controllerLoading ? (
              <Skeleton animation="wave" height={gaugeHeight} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Battery Level</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 11.8, color: '#f44336', showTick: true },
                      { limit: 12.2, color: '#ff9800', showTick: true },
                      { limit: 13, color: '#4caf50', showTick: true },
                      { limit: 14, color: '#ff9800', showTick: true },
                      { color: '#f44336' }
                    ]
                  }}
                  pointer={{
                    color: getBatteryColor(controllerData?.battery_level),
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + 'V' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 11 },
                        { value: 11.5 },
                        { value: 12 },
                        { value: 12.5 },
                        { value: 13 },
                        { value: 13.5 },
                        { value: 14 }
                      ],
                    }
                  }}
                  value={batteryLevel}
                  minValue={11}
                  maxValue={14}
                />
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {controllerLoading ? (
              <Skeleton animation="wave" height={gaugeHeight} variant="rectangular" sx={{ borderRadius: 2 }} />
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" gutterBottom>Fuel Level</Typography>
                <GaugeComponent 
                  type="semicircle"
                  arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                      { limit: 25, color: '#f44336', showTick: true },
                      { limit: 50, color: '#ff9800', showTick: true },
                      { limit: 75, color: '#4caf50', showTick: true },
                      { color: '#4caf50' }
                    ]
                  }}
                  pointer={{
                    color: getPercentageColor(controllerData?.fuel_level),
                    length: 0.80,
                    width: 15,
                  }}
                  labels={{
                    valueLabel: { formatTextValue: value => value + '%' },
                    tickLabels: {
                      type: 'outer',
                      defaultTickValueConfig: { 
                        formatTextValue: value => value + '',
                        style: { fontSize: 10 }
                      },
                      ticks: [
                        { value: 0 },
                        { value: 25 },
                        { value: 50 },
                        { value: 75 },
                        { value: 100 }
                      ],
                    }
                  }}
                  value={fuelLevel}
                  minValue={0}
                  maxValue={100}
                />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary">
            Last updated: {formatTimestamp(controllerData?.timestamp)}
          </Typography>
        </Box>
      </Paper>
      
      {/* Additional Controller Info - Compact Card */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Controller Raw Data
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {controllerLoading ? (
          <Box sx={{ p: 1 }}>
            <Skeleton animation="wave" height={30} />
            <Skeleton animation="wave" height={30} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">RPM</Typography>
                <Typography variant="body1" fontWeight="medium">{controllerData?.RPM || 'N/A'}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Battery Level</Typography>
                <Typography variant="body1" fontWeight="medium" sx={{ color: getBatteryColor(controllerData?.battery_level) }}>
                  {controllerData?.battery_level || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Fuel Level</Typography>
                <Typography variant="body1" fontWeight="medium" sx={{ color: getPercentageColor(controllerData?.fuel_level) }}>
                  {controllerData?.fuel_level || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Power Factor</Typography>
                <Typography variant="body1" fontWeight="medium">{controllerData?.power_factor ?? 0}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Oil Pressure</Typography>
                <Typography variant="body1" fontWeight="medium">{controllerData?.oil_pressure || 'N/A'}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Temperature</Typography>
                <Typography variant="body1" fontWeight="medium">{controllerData?.temperature || 'N/A'}</Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard; 