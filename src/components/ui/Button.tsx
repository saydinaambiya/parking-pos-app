interface ButtonProps {
  children: React.ReactNode,
  onClick?: () => void,
  disabled?: boolean,
  type?: 'button' | 'submit',
  variant?: 'primary' | 'secondary',
  className?: string,
}

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = 'button',
  variant = 'primary',
  className = ''
}: ButtonProps) => {
  const variantClass = variant === 'secondary' ? 'btn-success' : 'btn-danger';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} btn-lg w-100 fw-semibold ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;