import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'

const Main = () => {
  return (
    <div className="min-h-screen w-full bg-[#FFF5F2] overflow-x-hidden">
      {/* Navigation Bar */}
      <div className="z-50 ">
        <Navbar />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mt-20">
        <div className=" min-h-[calc(100vh-68px)]">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default Main