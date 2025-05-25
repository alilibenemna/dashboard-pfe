import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  ChevronLeft as ChevronLeftIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

// Drawer width
const drawerWidth = 260;

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Menu items with optimization added
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Engine Data', icon: <TimelineIcon />, path: '/engine-data' },
    { text: 'Optimization', icon: <SpeedIcon />, path: '/optimization' },
  ];

  const drawer = (
    <>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
      }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
              <span style={{ color: theme.palette.primary.main }}>Dashboard</span>
            </Typography>
          </Box>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} size="small" sx={{ ml: 1 }}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Box>
        
        <Divider sx={{ mx: 2 }} />
        
        <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 2 }}>
          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 1, px: 2 }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={isActive}
                    onClick={isMobile ? handleDrawerToggle : undefined}
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      position: 'relative',
                      '&.Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '25%',
                          height: '50%',
                          width: 3,
                          bgcolor: 'primary.main',
                          borderRadius: '0 4px 4px 0',
                        }
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? theme.palette.primary.main : 'text.secondary',
                        minWidth: 44,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      sx={{
                        color: isActive ? 'text.primary' : 'text.secondary',
                        '& .MuiTypography-root': {
                          fontWeight: isActive ? '600' : '400',
                        }
                      }}
                    />
                    {isActive && (
                      <Chip 
                        label="Active" 
                        size="small" 
                        sx={{ 
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          fontSize: '0.65rem',
                          fontWeight: 'bold',
                        }} 
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <Chip 
            label="v1.0.0" 
            size="small" 
            variant="outlined" 
            sx={{ ml: 2, height: 20, fontSize: '0.65rem' }} 
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 1,
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 