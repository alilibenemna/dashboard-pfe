import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Chip
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { formatTimestamp } from '../../utils/formatters';

/**
 * Component for displaying a single alert
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The alert message
 * @param {string} props.timestamp - The alert timestamp
 * @param {string} [props.severity='warning'] - The severity level of the alert
 */
const AlertItem = ({ message, timestamp, severity = 'warning' }) => {
  // Determine color based on severity
  const getSeverityColor = () => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return '#f44336'; // red
      case 'warning':
        return '#ff9800'; // orange
      case 'info':
        return '#2196f3'; // blue
      default:
        return '#ff9800'; // default to orange
    }
  };

  // Get severity text
  const getSeverityText = () => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'Critical';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
      default:
        return 'Warning';
    }
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        mb: 2,
        borderLeft: `4px solid ${getSeverityColor()}`,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon sx={{ color: getSeverityColor(), mr: 1 }} />
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
              {message}
            </Typography>
          </Box>
          <Chip 
            label={getSeverityText()} 
            size="small" 
            sx={{ 
              bgcolor: getSeverityColor(),
              color: 'white',
              fontWeight: 'bold'
            }} 
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {formatTimestamp(timestamp)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AlertItem; 