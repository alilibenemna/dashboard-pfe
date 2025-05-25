import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import AlertItem from '../components/Dashboard/AlertItem';
import useFirebaseData from '../hooks/useFirebaseData';
import { formatTimestamp } from '../utils/formatters';

// Mock historical alerts for demonstration
const mockHistoricalAlerts = [
  {
    id: 'alert-1',
    message: '⚠️ ALERT: Low Fuel Level (15.2%)',
    timestamp: '2025-05-16T22:30:45.432Z',
    severity: 'warning'
  },
  {
    id: 'alert-2',
    message: '⚠️ ALERT: High Temperature (95.5 °C)',
    timestamp: '2025-05-16T18:15:22.123Z',
    severity: 'critical'
  },
  {
    id: 'alert-3',
    message: '⚠️ ALERT: Oil Pressure Low (20.5 bar)',
    timestamp: '2025-05-15T14:45:10.876Z',
    severity: 'warning'
  },
  {
    id: 'alert-4',
    message: '⚠️ ALERT: Maintenance Required (900 hours reached)',
    timestamp: '2025-05-14T09:20:33.654Z',
    severity: 'info'
  },
  {
    id: 'alert-5',
    message: '⚠️ ALERT: Power Output Fluctuation',
    timestamp: '2025-05-13T16:05:27.321Z',
    severity: 'warning'
  },
];

const Alerts = () => {
  // Fetch current alerts from Firebase
  const { data: alertsData, loading: alertsLoading } = useFirebaseData('Alerts');
  
  // State for filtering and searching
  const [severity, setSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Combine current and historical alerts
  const allAlerts = [
    ...(alertsData?.battery_alert ? [{
      id: 'current-battery',
      message: alertsData.battery_alert,
      timestamp: alertsData.timestamp,
      severity: 'warning'
    }] : []),
    ...mockHistoricalAlerts
  ];
  
  // Filter alerts based on severity and search query
  const filteredAlerts = allAlerts.filter(alert => {
    const matchesSeverity = severity === 'all' || alert.severity === severity;
    const matchesSearch = !searchQuery || 
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatTimestamp(alert.timestamp).toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSeverity && matchesSearch;
  });
  
  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSeverity('all');
    setSearchQuery('');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        System Alerts
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Alert Management
          </Typography>
          
          <Box>
            <Button 
              startIcon={<FilterListIcon />}
              onClick={toggleFilters}
              color={showFilters ? 'primary' : 'inherit'}
              variant={showFilters ? 'contained' : 'text'}
              size="small"
            >
              Filters
            </Button>
          </Box>
        </Box>
        
        {showFilters && (
          <Box sx={{ mb: 3 }}>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="severity-select-label">Severity</InputLabel>
                  <Select
                    labelId="severity-select-label"
                    id="severity-select"
                    value={severity}
                    label="Severity"
                    onChange={(e) => setSeverity(e.target.value)}
                  >
                    <MenuItem value="all">All Severities</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                    <MenuItem value="warning">Warning</MenuItem>
                    <MenuItem value="info">Info</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Search alerts"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                    endAdornment: searchQuery && (
                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={clearFilters}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">
            {filteredAlerts.length} {filteredAlerts.length === 1 ? 'Alert' : 'Alerts'}
          </Typography>
          
          {(severity !== 'all' || searchQuery) && (
            <Box>
              <Typography variant="body2" component="span" color="text.secondary" sx={{ mr: 1 }}>
                Filters:
              </Typography>
              
              {severity !== 'all' && (
                <Chip 
                  label={`Severity: ${severity}`} 
                  size="small" 
                  onDelete={() => setSeverity('all')}
                  sx={{ mr: 1 }}
                />
              )}
              
              {searchQuery && (
                <Chip 
                  label={`Search: ${searchQuery}`} 
                  size="small" 
                  onDelete={() => setSearchQuery('')}
                />
              )}
            </Box>
          )}
        </Box>
        
        {alertsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : filteredAlerts.length > 0 ? (
          <Box>
            {filteredAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                message={alert.message}
                timestamp={alert.timestamp}
                severity={alert.severity}
              />
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No alerts match your filters
            </Typography>
          </Box>
        )}
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Alert Settings
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Notification Thresholds
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Battery Level Warning
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="12.2"
                label="Minimum Voltage (V)"
                type="number"
                InputProps={{
                  endAdornment: <Typography variant="body2">V</Typography>
                }}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Fuel Level Warning
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="25"
                label="Minimum Level (%)"
                type="number"
                InputProps={{
                  endAdornment: <Typography variant="body2">%</Typography>
                }}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Temperature Warning
              </Typography>
              <TextField
                fullWidth
                size="small"
                defaultValue="85"
                label="Maximum Temperature (°C)"
                type="number"
                InputProps={{
                  endAdornment: <Typography variant="body2">°C</Typography>
                }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Notification Methods
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="notification-priority-label">Critical Alert Notifications</InputLabel>
                <Select
                  labelId="notification-priority-label"
                  defaultValue="all"
                  label="Critical Alert Notifications"
                >
                  <MenuItem value="all">All Methods (Email, SMS, Push)</MenuItem>
                  <MenuItem value="email-push">Email and Push Notifications</MenuItem>
                  <MenuItem value="email">Email Only</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="notification-warning-label">Warning Alert Notifications</InputLabel>
                <Select
                  labelId="notification-warning-label"
                  defaultValue="email-push"
                  label="Warning Alert Notifications"
                >
                  <MenuItem value="all">All Methods (Email, SMS, Push)</MenuItem>
                  <MenuItem value="email-push">Email and Push Notifications</MenuItem>
                  <MenuItem value="email">Email Only</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box>
              <FormControl fullWidth size="small">
                <InputLabel id="notification-info-label">Info Alert Notifications</InputLabel>
                <Select
                  labelId="notification-info-label"
                  defaultValue="email"
                  label="Info Alert Notifications"
                >
                  <MenuItem value="all">All Methods (Email, SMS, Push)</MenuItem>
                  <MenuItem value="email-push">Email and Push Notifications</MenuItem>
                  <MenuItem value="email">Email Only</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save Settings
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Alerts; 