import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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
  background-color: var(--background-color);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border-bottom: 2px solid var(--primary-color);
`

const Logo = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  color: var(--primary-color);
  font-weight: 600;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--background-color);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    border-bottom: 2px solid var(--primary-color);
  }
`

const NavLink = styled(Link)`
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  
  &:hover {
    color: #fff;
  }
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`

const LoginButton = styled.button`
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
  }
`

const LoginModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 2000;
`

const ModalContent = styled.div`
  background-color: var(--background-color);
  padding: 2rem;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
`

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
`

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ModalInput = styled.input`
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: #fff;
  }
`

const ModalButton = styled.button`
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check for active session on load
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        setUser(data.session.user)
      }
      setLoading(false)
    }
    
    getSession()
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    try {
      if (isLogin) {
        // Handle login
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        })
        
        if (error) throw error
      } else {
        // Handle signup
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        })
        
        if (error) throw error
      }
      
      // Close modal on success
      setShowLoginModal(false)
      setFormData({ email: '', password: '' })
    } catch (error) {
      setError(error.message || 'An error occurred during authentication')
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setError('')
  }

  const sections = [
    { id: 'home', title: 'Home' },
    { id: 'when-where', title: 'When & Where' },
    { id: 'gallery', title: 'Gallery' },
    { id: 'rsvp', title: 'RSVP' },
    { id: 'payment', title: 'Payment' },
    { id: 'accommodation', title: 'Accommodation' },
    { id: 'contact', title: 'Contact' }
  ]

  return (
    <>
      <NavBar>
        <Link to="home" smooth={true} duration={500}>
          <Logo>NIT Rourkela 2000</Logo>
        </Link>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          {sections.map(section => (
            <NavLink
              key={section.id}
              to={section.id}
              smooth={true}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
            >
              {section.title}
            </NavLink>
          ))}
          {/*{user ? (
            <LoginButton onClick={async () => {
              await supabase.auth.signOut()
            }}>
              Logout
            </LoginButton>
          ) : (
            <LoginButton onClick={() => setShowLoginModal(true)}>
              Login / Signup
            </LoginButton>
          )}*/}
        </NavLinks>
      </NavBar>

      <LoginModal isOpen={showLoginModal}>
        <ModalContent>
          <CloseButton onClick={() => {
            setShowLoginModal(false)
            setError('')
            setFormData({ email: '', password: '' })
          }}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <ModalTitle>{isLogin ? 'Login' : 'Create Account'}</ModalTitle>
          <ModalForm onSubmit={handleSubmit}>
            <ModalInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ModalButton type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </ModalButton>
            <ModalButton type="button" onClick={toggleAuthMode}>
              {isLogin ? 'Create Account' : 'Back to Login'}
            </ModalButton>
          </ModalForm>
        </ModalContent>
      </LoginModal>

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