import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`

const glow = keyframes`
  0% { box-shadow: 0 0 10px var(--primary-color); }
  50% { box-shadow: 0 0 25px var(--primary-color); }
  100% { box-shadow: 0 0 10px var(--primary-color); }
`

const WhenWhereContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url('https://images.shiksha.com/mediadata/images/1607331935php7vaw4G.jpeg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border: 4px solid var(--primary-color);
    border-radius: 20px;
    pointer-events: none;
    animation: ${glow} 3s infinite;
  }
`

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 4rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out, ${float} 4s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
`

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  padding: 3rem;
  position: relative;
  z-index: 2;
  opacity: 0;
  animation: ${scaleUp} 1s forwards;
  animation-delay: 0.3s;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
    padding: 2rem;
  }
`

const InfoSection = styled.div`
  flex: 1;
  padding: 3rem 2rem;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  animation: ${slideIn} 0.8s forwards;
  animation-delay: ${props => props.delay}s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(255,215,0,0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    padding: 2rem;
  }
`

const InfoTitle = styled.h3`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const InfoText = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: var(--text-color);
  margin: 1rem 0;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.6s forwards;
  animation-delay: ${props => props.delay}s;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const WhenWhere = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-element').forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <WhenWhereContainer id="when-where">
      <Title className="animate-element">When & Where</Title>
      
      <ContentContainer className="animate-element">
        <InfoSection delay={0.4} className="animate-element">
          <InfoTitle>When</InfoTitle>
          <InfoText delay={0.6}>Friday, December 26th, 2025</InfoText>
          <InfoText delay={0.8}>6:00 PM - 11:00 PM</InfoText>
        </InfoSection>

        <InfoSection delay={0.6} className="animate-element">
          <InfoTitle>Where</InfoTitle>
          <InfoText delay={0.8}>NIT Rourkela Campus</InfoText>
          <InfoText delay={1.0}>Sector 1</InfoText>
          <InfoText delay={1.2}>Rourkela, Odisha 769008</InfoText>
        </InfoSection>
      </ContentContainer>
    </WhenWhereContainer>
  )
}

export default WhenWhere