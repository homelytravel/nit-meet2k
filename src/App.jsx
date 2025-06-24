import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Home from './components/Home'
import WhenWhere from './components/WhenWhere'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import Payment from './components/Payment'
import Accommodation from './components/Accommodation'
import Contact from './components/Contact'
import { supabase } from './supabaseClient'

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(26, 26, 26, 0.97);
  backdrop-filter: blur(12px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border-bottom: 2px solid var(--primary-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  opacity: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  &.hidden {
    transform: translateY(-100%);
    opacity: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Logo = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: 700;
  letter-spacing: 1.2px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateX(2px);
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--background-color);
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
    border-bottom: 2px solid var(--primary-color);
    transform: ${({ isOpen }) => isOpen ? 'translateY(0) scaleY(1)' : 'translateY(-20%) scaleY(0.8)'};
    opacity: ${({ isOpen }) => isOpen ? 1 : 0};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.2s ease,
                transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: top center;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    pointer-events: ${({ isOpen }) => isOpen ? 'all' : 'none'};
  }
`

const NavLink = styled(Link)`
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem;
  border-radius: 4px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: #fff;
    transform: translateY(-3px);

    &::after {
      width: 100%;
      left: 0;
    }
  }

  &.active {
    color: #fff;
    font-weight: 600;

    &::after {
      width: 100%;
      left: 0;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 1rem;
    font-size: 1.1rem;
    transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-15px)'};
    opacity: ${({ isOpen }) => isOpen ? 1 : 0};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${({ index }) => index * 0.06}s;
  }
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.6rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(0deg);
  
  &:hover {
    background: rgba(255, 215, 0, 0.15);
    transform: scale(1.15);
  }

  @media (max-width: 768px) {
    display: block;
  }

  ${({ isOpen }) => isOpen && css`
    transform: rotate(90deg);
  `}
`

const AuthButton = styled.button`
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 0.7rem 1.8rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.2rem;
    margin-top: 1rem;
    font-size: 1.1rem;
  }
`

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const sections = [
    { id: 'home', title: 'Home' },
    { id: 'when-where', title: 'When & Where' },
    { id: 'gallery', title: 'Gallery' },
    { id: 'rsvp', title: 'RSVP' },
    { id: 'payment', title: 'Payment' },
    { id: 'accommodation', title: 'Accommodation' },
    { id: 'contact', title: 'Contact' }
  ]

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user || null)
      setLoading(false)
    }
    
    getSession()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])

  const handleAuth = async () => {
    if (user) {
      await supabase.auth.signOut()
    } else {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
    }
  }

  return (
    <>
      <NavBar>
        <Link to="home" smooth={true} duration={500}>
          <Logo>NIT Rourkela 2000</Logo>
        </Link>
        <MenuButton 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          isOpen={isMenuOpen}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          {sections.map((section, index) => (
            <NavLink
              key={section.id}
              to={section.id}
              smooth={true}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
              spy={true}
              activeClass="active"
              index={index}
              isOpen={isMenuOpen}
            >
              {section.title}
            </NavLink>
          ))}
          <AuthButton onClick={handleAuth}>
            {user ? 'Logout' : 'Login'}
          </AuthButton>
        </NavLinks>
      </NavBar>

      <Home />
      <WhenWhere />
      <Gallery />
      <RSVP />
      <Payment />
      <Accommodation />
      <Contact />
    </>
  )
}

export default App