interface CardProps {
  children: React.ReactNode,
  title?: string,
  className?: string,
}

const Card = ({ children, title, className = '' }: CardProps) => {
  return (
    <div className={`card shadow-lg ${className}`}>
      <div className="card-body p-4">
        {title && <h2 className="card-title text-center mb-4 fs-2 fw-bold text-dark">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Card;