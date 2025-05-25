/**
 * Format a timestamp string to a readable date/time format
 * @param {string} timestamp - The timestamp to format
 * @returns {string} - The formatted date/time string
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  try {
    // Handle different timestamp formats
    let date;
    if (timestamp.includes('T')) {
      // ISO format: "2025-05-17T00:02:37.520Z"
      date = new Date(timestamp);
    } else {
      // Custom format: "17/05/2025, 00:02:38"
      const parts = timestamp.split(', ');
      const dateParts = parts[0].split('/');
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const year = parseInt(dateParts[2]);
      
      if (parts.length > 1) {
        const timeParts = parts[1].split(':');
        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);
        const second = parseInt(timeParts[2] || 0);
        
        date = new Date(year, month, day, hour, minute, second);
      } else {
        date = new Date(year, month, day);
      }
    }
    
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return timestamp;
  }
};

/**
 * Get status color based on engine status code
 * @param {number} statusCode - The engine status code
 * @returns {string} - The color representing the status
 */
export const getStatusColor = (statusCode) => {
  if (!statusCode && statusCode !== 0) return '#9e9e9e'; // Grey for unknown
  
  // Define status colors based on engine status codes
  if (statusCode === 24) return '#4caf50'; // Green for "Ready"
  if (statusCode < 10) return '#f44336';   // Red for critical issues
  if (statusCode < 20) return '#ff9800';   // Orange for warnings
  
  return '#2196f3'; // Blue for other statuses
};

/**
 * Get color based on battery level
 * @param {string} batteryLevel - The battery level string (e.g. "12V")
 * @returns {string} - The color representing the battery status
 */
export const getBatteryColor = (batteryLevel) => {
  if (!batteryLevel) return '#9e9e9e'; // Grey for unknown
  
  // Extract numeric value from string like "12V"
  const value = parseFloat(batteryLevel);
  
  if (isNaN(value)) return '#9e9e9e';
  
  if (value < 11.8) return '#f44336'; // Red for critical
  if (value < 12.2) return '#ff9800'; // Orange for warning
  return '#4caf50'; // Green for good
};

/**
 * Format a percentage string to a consistent format
 * @param {string|number} percentage - The percentage value
 * @returns {string} - The formatted percentage string
 */
export const formatPercentage = (percentage) => {
  if (percentage === undefined || percentage === null) return 'N/A';
  
  // If it's already a string with % symbol
  if (typeof percentage === 'string' && percentage.includes('%')) {
    return percentage;
  }
  
  // Convert to number if it's a string without % symbol
  const value = typeof percentage === 'string' ? parseFloat(percentage) : percentage;
  
  if (isNaN(value)) return 'N/A';
  
  return `${value.toFixed(1)}%`;
};

/**
 * Get color based on a percentage value
 * @param {string|number} percentage - The percentage value
 * @returns {string} - The color representing the percentage status
 */
export const getPercentageColor = (percentage) => {
  if (percentage === undefined || percentage === null) return '#9e9e9e';
  
  // Extract numeric value
  let value;
  if (typeof percentage === 'string') {
    value = parseFloat(percentage);
  } else {
    value = percentage;
  }
  
  if (isNaN(value)) return '#9e9e9e';
  
  if (value < 25) return '#f44336'; // Red for low
  if (value < 50) return '#ff9800'; // Orange for medium-low
  if (value < 75) return '#2196f3'; // Blue for medium-high
  return '#4caf50'; // Green for high
}; 