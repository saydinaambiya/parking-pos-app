interface NavbarProps {
  currentPage: 'checkin' | 'checkout',
  onPageChange: (page: 'checkin' | 'checkout') => void,
}

const Navbar = ({ currentPage, onPageChange }: NavbarProps) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger sticky-top shadow">
      <div className="container-fluid px-4">
        <span className="navbar-brand mb-0 h1 fs-3 fw-bold" style={{fontFamily: 'Stack Sans Notch'}}>
          Parking POS Application
        </span>
        <div className="d-flex gap-3">
          <button 
            className={`btn btn-lg fw-semibold px-4 ${
              currentPage === 'checkin' 
                ? 'btn-light text-danger' 
                : 'btn-outline-light'
            }`}
            onClick={() => onPageChange('checkin')}
          >
            Check In
          </button>
          <button 
            className={`btn btn-lg fw-semibold px-4 ${
              currentPage === 'checkout' 
                ? 'btn-light text-danger' 
                : 'btn-outline-light'
            }`}
            onClick={() => onPageChange('checkout')}
          >
            Check Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;