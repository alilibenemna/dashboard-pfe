import React from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import EngineChart from '../components/Dashboard/EngineChart';
import useFirebaseData from '../hooks/useFirebaseData';
import { formatTimestamp, formatPercentage } from '../utils/formatters';

const Optimization = () => {
  // Fetch data from Firebase
  const { data: optimizationData, loading: optimizationLoading } = useFirebaseData('optimisation');

  // Prepare chart data for availability vs off service
  const availabilityChartData = {
    labels: ['Available', 'Off Service'],
    datasets: [
      {
        label: 'Percentage',
        data: [
          parseFloat(optimizationData?.availability || '0'),
          parseFloat(optimizationData?.off_service || '0'),
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare chart data for run hours vs maintenance hours
  const hoursChartData = {
    labels: ['Run Hours', 'Maintenance Hours'],
    datasets: [
      {
        label: 'Hours',
        data: [
          optimizationData?.runHours || 0,
          optimizationData?.maintenanceHours || 0,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Calculate percentage of maintenance hours used
  const maintenancePercentage = optimizationData ? 
    (optimizationData.runHours / optimizationData.maintenanceHours) * 100 : 0;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Optimization Metrics
      </Typography>
      
      <Grid container spacing={3}>
        {/* Optimization Summary */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Summary
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Last updated: {formatTimestamp(optimizationData?.timestamp)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            {optimizationLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {/* Availability */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Availability
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={parseFloat(optimizationData?.availability || '0')}
                          sx={{ 
                            height: 10, 
                            borderRadius: 5,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#4caf50',
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {optimizationData?.availability || '0%'}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Off Service */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Off Service
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={parseFloat(optimizationData?.off_service || '0')}
                          sx={{ 
                            height: 10, 
                            borderRadius: 5,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#f44336',
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {optimizationData?.off_service || '0%'}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Off vs Maintenance */}
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Off vs Maintenance
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={parseFloat(optimizationData?.off_vs_maintenance || '0')}
                          sx={{ 
                            height: 10, 
                            borderRadius: 5,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#ff9800',
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {optimizationData?.off_vs_maintenance || '0%'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                {/* Hours Metrics */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Run Hours
                    </Typography>
                    <Typography variant="h4" color="primary.main" fontWeight="medium">
                      {optimizationData?.runHours || 0}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Maintenance Hours
                    </Typography>
                    <Typography variant="h4" color="warning.main" fontWeight="medium">
                      {optimizationData?.maintenanceHours || 0}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Stop Time
                    </Typography>
                    <Typography variant="h4" color="error.main" fontWeight="medium">
                      {optimizationData?.stopTime || 0} hours
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
        
        {/* Maintenance Progress */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Maintenance Progress
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            {optimizationLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mr: 3 }}>
                    <CircularProgress
                      variant="determinate"
                      value={maintenancePercentage > 100 ? 100 : maintenancePercentage}
                      size={100}
                      thickness={5}
                      sx={{
                        color: maintenancePercentage > 80 ? '#f44336' : 
                               maintenancePercentage > 50 ? '#ff9800' : '#4caf50',
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        fontSize={16}
                        fontWeight="bold"
                      >
                        {`${Math.round(maintenancePercentage)}%`}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Typography variant="h6">
                      Maintenance Usage
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {optimizationData?.runHours || 0} of {optimizationData?.maintenanceHours || 0} hours used
                    </Typography>
                    
                    {maintenancePercentage > 80 && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        Maintenance required soon!
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Hours Until Next Maintenance
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={maintenancePercentage > 100 ? 100 : maintenancePercentage}
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: maintenancePercentage > 80 ? '#f44336' : 
                                          maintenancePercentage > 50 ? '#ff9800' : '#4caf50',
                          }
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {Math.max(0, optimizationData?.maintenanceHours - optimizationData?.runHours || 0)} hours left
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Availability Chart */}
        <Grid item xs={12} md={6}>
          <EngineChart
            title="Availability vs Off Service"
            data={availabilityChartData}
            type="pie"
            loading={optimizationLoading}
          />
        </Grid>
        
        {/* Hours Chart */}
        <Grid item xs={12} md={6}>
          <EngineChart
            title="Run Hours vs Maintenance Hours"
            data={hoursChartData}
            type="bar"
            loading={optimizationLoading}
            yAxisLabel="Hours"
          />
        </Grid>
        
        {/* Optimization Tips */}
        
      </Grid>
    </Box>
  );
};

export default Optimization; 