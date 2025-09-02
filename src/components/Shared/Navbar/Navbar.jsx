import Container from '../Container'
import MenuDropdown from './MenuDropdown'
import Logo from '../Logo'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Add background blur/opacity when scrolled
      setScrolled(currentScrollY > 10)

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
        
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="py-2 px-3 sm:py-3 md:py-4 lg:py-3">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 md:gap-6">

            {/* Logo Section */}
            <div className="flex-shrink-0  rounded-full z-10">
              <Logo />
            </div>


            {/* Menu Dropdown */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              <MenuDropdown />
            </div>

          </div>
        </Container>
      </div>

      {/* Mobile overlay backdrop when menu is open */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden opacity-0 pointer-events-none transition-opacity duration-300"
        id="mobile-menu-overlay"
      />
    </nav>
  )
}

export default Navbar