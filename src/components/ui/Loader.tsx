import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 24, 
  color = '#336B3F',
  thickness = 4
}) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{
          color: color,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
    </Box>
  );
};

export default Loader;

