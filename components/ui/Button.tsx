import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-dark-bg btn-lift';

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary shadow-md hover:shadow-lg dark:bg-primary-light dark:hover:bg-primary dark:text-textDark',
    secondary: 'bg-success hover:bg-success-dark text-white focus:ring-success shadow-md hover:shadow-lg dark:bg-success-light dark:hover:bg-success',
    outline: 'bg-warm-surface dark:bg-dark-card border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-gradient-to-r hover:from-gradient-start hover:to-gradient-mid dark:hover:from-dark-surface dark:hover:to-dark-card focus:ring-primary'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
