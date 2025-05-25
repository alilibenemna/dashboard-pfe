import React from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

/**
 * A card component for displaying status metrics
 * 
 * @param {Object} props - The component props
 * @param {string} props.title - The card title
 * @param {string|number} props.value - The main value to display
 * @param {string} [props.subtitle] - Optional subtitle or description
 * @param {string} [props.color] - Optional color for the value text
 * @param {React.ReactNode} [props.icon] - Optional icon to display
 * @param {boolean} [props.loading] - Whether the data is loading
 */
const StatusCard = ({ title, value, subtitle, color = 'primary.main', icon, loading = false }) => {
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary">
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: color }}>
              {icon}
            </Box>
          )}
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: color,
                mb: 1
              }}
            >
              {value || 'N/A'}
            </Typography>
            
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard; 