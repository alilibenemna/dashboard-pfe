import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleSaveSettings = () => {
    setSnackbarMessage('Settings saved successfully');
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<SettingsIcon />} label="General" id="settings-tab-0" />
            <Tab icon={<PersonIcon />} label="User Profile" id="settings-tab-1" />
            <Tab icon={<NotificationsIcon />} label="Notifications" id="settings-tab-2" />
            <Tab icon={<SecurityIcon />} label="Security" id="settings-tab-3" />
            <Tab icon={<StorageIcon />} label="Data Management" id="settings-tab-4" />
          </Tabs>
        </Box>
        
        {/* General Settings */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Dashboard Configuration
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="theme-select-label">Theme</InputLabel>
                  <Select
                    labelId="theme-select-label"
                    defaultValue="light"
                    label="Theme"
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System Default</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="refresh-rate-label">Data Refresh Rate</InputLabel>
                  <Select
                    labelId="refresh-rate-label"
                    defaultValue="30"
                    label="Data Refresh Rate"
                  >
                    <MenuItem value="10">Every 10 seconds</MenuItem>
                    <MenuItem value="30">Every 30 seconds</MenuItem>
                    <MenuItem value="60">Every minute</MenuItem>
                    <MenuItem value="300">Every 5 minutes</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Enable real-time updates" 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Display Settings
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="temperature-unit-label">Temperature Unit</InputLabel>
                  <Select
                    labelId="temperature-unit-label"
                    defaultValue="celsius"
                    label="Temperature Unit"
                  >
                    <MenuItem value="celsius">Celsius (°C)</MenuItem>
                    <MenuItem value="fahrenheit">Fahrenheit (°F)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="date-format-label">Date Format</InputLabel>
                  <Select
                    labelId="date-format-label"
                    defaultValue="medium"
                    label="Date Format"
                  >
                    <MenuItem value="short">Short (MM/DD/YY)</MenuItem>
                    <MenuItem value="medium">Medium (MMM DD, YYYY)</MenuItem>
                    <MenuItem value="long">Long (MMMM DD, YYYY)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Show tooltips" 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                >
                  Save Settings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* User Profile */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            User Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  defaultValue="John Doe"
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue="john.doe@example.com"
                  size="small"
                />
              </Box>
              
              <Box>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue="+1 123-456-7890"
                  size="small"
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Position"
                  defaultValue="System Administrator"
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Department"
                  defaultValue="Operations"
                  size="small"
                />
              </Box>
              
              <Box>
                <FormControl fullWidth size="small">
                  <InputLabel id="timezone-label">Timezone</InputLabel>
                  <Select
                    labelId="timezone-label"
                    defaultValue="utc-5"
                    label="Timezone"
                  >
                    <MenuItem value="utc-8">Pacific Time (UTC-8)</MenuItem>
                    <MenuItem value="utc-7">Mountain Time (UTC-7)</MenuItem>
                    <MenuItem value="utc-6">Central Time (UTC-6)</MenuItem>
                    <MenuItem value="utc-5">Eastern Time (UTC-5)</MenuItem>
                    <MenuItem value="utc">UTC</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                >
                  Save Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Notifications */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Email Notifications
              </Typography>
              
              <Box>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Critical Alerts" 
                />
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Warning Alerts" 
                />
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch />} 
                  label="Info Alerts" 
                />
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Maintenance Reminders" 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Push Notifications
              </Typography>
              
              <Box>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Critical Alerts" 
                />
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Warning Alerts" 
                />
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch />} 
                  label="Info Alerts" 
                />
              </Box>
              
              <Box>
                <FormControlLabel 
                  control={<Switch />} 
                  label="Maintenance Reminders" 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                >
                  Save Notification Settings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Security */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Change Password
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  size="small"
                />
              </Box>
              
              <Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleSaveSettings}
                >
                  Update Password
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Two-Factor Authentication
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControlLabel 
                  control={<Switch defaultChecked />} 
                  label="Enable Two-Factor Authentication" 
                />
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Two-factor authentication adds an extra layer of security to your account
              </Alert>
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                Session Management
              </Typography>
              
              <Box>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel id="session-timeout-label">Session Timeout</InputLabel>
                  <Select
                    labelId="session-timeout-label"
                    defaultValue="30"
                    label="Session Timeout"
                  >
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">1 hour</MenuItem>
                    <MenuItem value="120">2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box>
                <Button 
                  variant="outlined" 
                  color="error"
                  startIcon={<RefreshIcon />}
                >
                  Log Out All Other Sessions
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Data Management */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h6" gutterBottom>
            Data Management
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Data Retention
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="data-retention-label">Retain Detailed Data For</InputLabel>
                  <Select
                    labelId="data-retention-label"
                    defaultValue="90"
                    label="Retain Detailed Data For"
                  >
                    <MenuItem value="30">30 days</MenuItem>
                    <MenuItem value="60">60 days</MenuItem>
                    <MenuItem value="90">90 days</MenuItem>
                    <MenuItem value="180">6 months</MenuItem>
                    <MenuItem value="365">1 year</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box>
                <FormControl fullWidth size="small">
                  <InputLabel id="aggregated-data-label">Retain Aggregated Data For</InputLabel>
                  <Select
                    labelId="aggregated-data-label"
                    defaultValue="365"
                    label="Retain Aggregated Data For"
                  >
                    <MenuItem value="180">6 months</MenuItem>
                    <MenuItem value="365">1 year</MenuItem>
                    <MenuItem value="730">2 years</MenuItem>
                    <MenuItem value="1095">3 years</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Data Export
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Export Current Month Data (CSV)
                </Button>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Export Current Year Data (CSV)
                </Button>
              </Box>
              
              <Box>
                <Button 
                  variant="outlined" 
                  fullWidth
                >
                  Export All Historical Data (CSV)
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                >
                  Save Data Settings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Settings; 