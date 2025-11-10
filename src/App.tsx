import { useState } from 'react'
import CheckIn from './pages/CheckIn'
import CheckOut from './pages/CheckOut'
import Navbar from './components/ui/Navbar'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'checkin' | 'checkout'>('checkin')

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="app-main">
        {currentPage === 'checkin' ? <CheckIn /> : <CheckOut />}
      </main>
    </div>
  )
}

export default App