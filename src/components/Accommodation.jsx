import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel, faBed, faHouse } from '@fortawesome/free-solid-svg-icons'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const AccommodationContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(rgba(164, 157, 157, 0.8), rgba(0, 0, 0, 0.8)),
    url('/R.jpg') center/cover fixed;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 1;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 3rem;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1300px;
  width: 100%;
  padding: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
`

const Card = styled.div`
  background: rgba(0, 0, 0, 0.85);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
  animation: ${scaleUp} 0.8s forwards;
  animation-delay: ${props => props.delay * 0.2}s;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 35px rgba(255, 215, 0, 0.25);
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 1.5rem;
  }
`

const Icon = styled.div`
  font-size: 2.75rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`

const CardTitle = styled.h3`
  font-size: 1.75rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  line-height: 1.3;
  text-align: center;
`

const Details = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const Detail = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  line-height: 1.6;
  padding: 0 1rem;
`

const BookButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: var(--background-color);
  padding: 1rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  &:hover {
    background: #fff;
    color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }
`

const Accommodation = () => {
  const accommodations = [
    {
      id: 1,
      icon: faHotel,
      title: 'Hotel Mayfair Rourkela',
      description: 'Luxurious accommodations with special alumni rates',
      address: 'Panposh Road, Rourkela',
      rate: '₹5000/night (Special Rate)',
      phone: '+91 661 2400500',
      link: '#'
    },
    {
      id: 2,
      icon: faBed,
      title: 'Hotel Deepti',
      description: 'Premium comfort near campus',
      address: 'Civil Township, Rourkela',
      rate: '₹3000/night',
      phone: '+91 661 2400700',
      link: '#'
    },
    {
      id: 3,
      icon: faHouse,
      title: 'NIT Guest House',
      description: 'On-campus heritage accommodation',
      address: 'NIT Rourkela Campus',
      rate: '₹2000/night',
      phone: '+91 661 2462021',
      link: '#'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = 'translateY(0) scale(1)'
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-card').forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <AccommodationContainer id="accommodation">
      <Title>Accommodation Options</Title>
      <GridContainer>
        {accommodations.map((item, index) => (
          <Card key={item.id} delay={index} className="animate-card">
            <Icon>
              <FontAwesomeIcon icon={item.icon} />
            </Icon>
            <CardTitle>{item.title}</CardTitle>
            <Details>
              <Detail>{item.description}</Detail>
              <Detail>📍 {item.address}</Detail>
              <Detail>💲 {item.rate}</Detail>
              <Detail>📞 {item.phone}</Detail>
            </Details>
            <BookButton href={item.link} target="_blank" rel="noopener noreferrer">
              Book Now
            </BookButton>
          </Card>
        ))}
      </GridContainer>
    </AccommodationContainer>
  )
}

export default Accommodation