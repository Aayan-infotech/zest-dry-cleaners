import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface LoaderProps {
  size?: number;
  color?: string;
  animationType?: 'spinner' | 'pulse' | 'dots' | 'ring' | 'washing' | 'dryclean';
  showText?: boolean;
  text?: string;
  speed?: number;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 60, 
  color = '#2E7D32',
  animationType = 'spinner',
  showText = true,
  text = "Zest Dry Cleaner",
  speed = 1
}) => {
  
  // Spinner animation
  if (animationType === 'spinner') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: size,
            height: size,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: `4px solid ${color}20`,
              borderRadius: '50%',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: `4px solid transparent`,
              borderTop: `4px solid ${color}`,
              borderRadius: '50%',
              animation: `spin ${1 / speed}s linear infinite`,
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        </Box>
        {showText && (
          <Typography
            variant="body1"
            sx={{
              color: color,
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  // Pulse animation
  if (animationType === 'pulse') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            animation: `pulse ${1.5 / speed}s ease-in-out infinite`,
            '@keyframes pulse': {
              '0%': { transform: 'scale(0.8)', opacity: 0.7 },
              '50%': { transform: 'scale(1)', opacity: 1 },
              '100%': { transform: 'scale(0.8)', opacity: 0.7 },
            },
          }}
        />
        {showText && (
          <Typography
            variant="body1"
            sx={{
              color: color,
              fontWeight: 500,
              animation: `textPulse ${1.5 / speed}s ease-in-out infinite`,
              '@keyframes textPulse': {
                '0%': { opacity: 0.6 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.6 },
              },
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  // Dots animation
  if (animationType === 'dots') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: size / 10 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: size / 4,
                height: size / 4,
                borderRadius: '50%',
                backgroundColor: color,
                animation: `bounce ${1.2 / speed}s infinite`,
                animationDelay: `${i * 0.15}s`,
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: `translateY(-${size / 5}px)` },
                },
              }}
            />
          ))}
        </Box>
        {showText && (
          <Typography
            variant="body1"
            sx={{
              color: color,
              fontWeight: 500,
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  // Ring animation
  if (animationType === 'ring') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ position: 'relative', width: size, height: size }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: `${size / 15}px solid transparent`,
                borderTop: `${size / 15}px solid ${color}`,
                borderRadius: '50%',
                animation: `ringRotate ${1.5 / speed}s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                animationDelay: `${i * -0.15}s`,
                '@keyframes ringRotate': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          ))}
        </Box>
        {showText && (
          <Typography
            variant="body1"
            sx={{
              color: color,
              fontWeight: 500,
              marginTop: 1,
            }}
          >
            {text}
          </Typography>
        )}
      </Box>
    );
  }

  // Washing machine inspired animation
  if (animationType === 'washing') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: size,
            height: size,
            border: `3px solid ${color}40`,
            borderRadius: '10%',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              border: `2px solid ${color}30`,
              borderRadius: '50%',
            }}
          />
          {[0, 1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: size / 8,
                height: size / 8,
                backgroundColor: color,
                borderRadius: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 90}deg) translate(0, -${size / 3}px)`,
                animation: `washingSpin ${2 / speed}s linear infinite`,
                '@keyframes washingSpin': {
                  '0%': { transform: `translate(-50%, -50%) rotate(${i * 90}deg) translate(0, -${size / 3}px) rotate(0deg)` },
                  '100%': { transform: `translate(-50%, -50%) rotate(${i * 90}deg) translate(0, -${size / 3}px) rotate(360deg)` },
                },
              }}
            />
          ))}
        </Box>
        {showText && (
          <Typography
            variant="body1"
            sx={{
              color: color,
              fontWeight: 500,
            }}
          >
            Cleaning in progress...
          </Typography>
        )}
      </Box>
    );
  }

  // Dry cleaning specific animation (clothes on hanger)
  if (animationType === 'dryclean') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ position: 'relative', width: size, height: size * 1.2 }}>
          {/* Hanger */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: size * 0.8,
              height: size * 0.15,
              borderTop: `3px solid ${color}`,
              borderLeft: `3px solid ${color}`,
              borderRight: `3px solid ${color}`,
              borderTopLeftRadius: size * 0.4,
              borderTopRightRadius: size * 0.4,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: size * 0.07,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 3,
              height: size * 0.4,
              backgroundColor: color,
            }}
          />
          
          {/* Shirt */}
          <Box
            sx={{
              position: 'absolute',
              top: size * 0.47,
              left: '50%',
              transform: 'translateX(-50%)',
              width: size * 0.6,
              height: size * 0.6,
              backgroundColor: `${color}30`,
              border: `2px solid ${color}50`,
              borderRadius: '5px',
              animation: `swing ${2 / speed}s ease-in-out infinite`,
              '@keyframes swing': {
                '0%, 100%': { transform: 'translateX(-50%) rotate(-5deg)' },
                '50%': { transform: 'translateX(-50%) rotate(5deg)' },
              },
            }}
          />
          
          {/* Shirt details */}
          <Box
            sx={{
              position: 'absolute',
              top: size * 0.5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: size * 0.15,
              height: size * 0.2,
              backgroundColor: `${color}40`,
              borderRadius: '3px',
            }}
          />
        </Box>
        {showText && (
          <Typography
            variant="body1"
            sx={{
              color: color,
              fontWeight: 500,
            }}
          >
            Dry cleaning your clothes...
          </Typography>
        )}
      </Box>
    );
  }

  // Default fallback
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          border: `4px solid ${color}30`,
          borderTop: `4px solid ${color}`,
          borderRadius: '50%',
          animation: `spin ${1 / speed}s linear infinite`,
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />
      {showText && (
        <Typography
          variant="body1"
          sx={{
            color: color,
            fontWeight: 500,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

// Demo component to showcase all loader types
export const LoaderDemo: React.FC = () => {
  const [selectedAnimation, setSelectedAnimation] = useState<string>('spinner');
  const [loaderSize, setLoaderSize] = useState<number>(60);
  const [loaderSpeed, setLoaderSpeed] = useState<number>(1);
  const [loaderColor, setLoaderColor] = useState<string>('#2E7D32');

  const animationTypes = [
    { value: 'spinner', label: 'Spinner' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'dots', label: 'Bouncing Dots' },
    { value: 'ring', label: 'Multi-ring' },
    { value: 'washing', label: 'Washing Machine' },
    { value: 'dryclean', label: 'Dry Clean Hanger' },
  ];

  const colors = [
    { value: '#2E7D32', label: 'Forest Green' },
    { value: '#388E3C', label: 'Green' },
    { value: '#43A047', label: 'Light Green' },
    { value: '#4CAF50', label: 'Material Green' },
    { value: '#66BB6A', label: 'Pastel Green' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: 4,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          color: '#2E7D32', 
          fontWeight: 'bold', 
          marginBottom: 1,
          textAlign: 'center'
        }}
      >
        Zest Dry Cleaner
      </Typography>
      
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#555', 
          marginBottom: 4,
          textAlign: 'center'
        }}
      >
        Animated Loaders for Your E-commerce Website
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          marginBottom: 6,
          maxWidth: '1000px',
        }}
      >
        {animationTypes.map((type) => (
          <Box
            key={type.value}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: '200px',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, color: '#333' }}>
              {type.label}
            </Typography>
            <Loader
              size={60}
              animationType={type.value as any}
              color="#2E7D32"
              showText={false}
              speed={1}
            />
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                color: '#2E7D32',
                borderColor: '#2E7D32',
                '&:hover': {
                  borderColor: '#1B5E20',
                  backgroundColor: '#E8F5E9',
                },
              }}
              onClick={() => setSelectedAnimation(type.value)}
            >
              Select
            </Button>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, color: '#333' }}>
          Loader Customization
        </Typography>
        
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Loader
            size={loaderSize}
            animationType={selectedAnimation as any}
            color={loaderColor}
            speed={loaderSpeed}
            text="Zest Dry Cleaner"
            showText={true}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
          <Box>
            <Typography variant="body1" sx={{ marginBottom: 1, color: '#555' }}>
              Animation Type: {animationTypes.find(t => t.value === selectedAnimation)?.label}
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Animation Type</InputLabel>
              <Select
                value={selectedAnimation}
                label="Animation Type"
                onChange={(e) => setSelectedAnimation(e.target.value)}
              >
                {animationTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="body1" sx={{ marginBottom: 1, color: '#555' }}>
              Size: {loaderSize}px
            </Typography>
            <input
              type="range"
              min="30"
              max="120"
              value={loaderSize}
              onChange={(e) => setLoaderSize(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </Box>

          <Box>
            <Typography variant="body1" sx={{ marginBottom: 1, color: '#555' }}>
              Speed: {loaderSpeed}x
            </Typography>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={loaderSpeed}
              onChange={(e) => setLoaderSpeed(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </Box>

          <Box>
            <Typography variant="body1" sx={{ marginBottom: 1, color: '#555' }}>
              Color
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {colors.map((colorOption) => (
                <Box
                  key={colorOption.value}
                  onClick={() => setLoaderColor(colorOption.value)}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: colorOption.value,
                    cursor: 'pointer',
                    border: loaderColor === colorOption.value ? '3px solid #333' : '1px solid #ddd',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                  title={colorOption.label}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 4, color: '#777', textAlign: 'center' }}>
          Use this loader in your Zest Dry Cleaner e-commerce website for loading states,
          processing payments, or any waiting period to keep customers engaged.
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;