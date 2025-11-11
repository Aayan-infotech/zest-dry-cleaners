import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'colored';
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ variant = 'default', backgroundColor, className = '', onClick, children, ...props }) => {
  return (
    <div
      className={`custom-card custom-card--${variant} ${onClick ? 'custom-card--clickable' : ''} ${className}`}
      onClick={onClick}
      style={{ background: backgroundColor || undefined }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
