import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleIn = keyframes`
  0% { transform: scale(0); }
  90% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

const glow = keyframes`
  0% { filter: drop-shadow(0 0 5px var(--primary-color)); }
  50% { filter: drop-shadow(0 0 20px var(--primary-color)); }
  100% { filter: drop-shadow(0 0 5px var(--primary-color)); }
`

const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`

const ParallaxSection = styled.div`
  position: relative;
  height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
    z-index: 1;
    animation: ${gradientAnimation} 8s ease infinite;
    background-size: 400% 400%;
  }

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      rgba(255, 255, 255, 0.2),
      var(--primary-color)
    );
    z-index: 0;
    animation: ${gradientAnimation} 6s ease infinite;
    background-size: 400% 400%;
    opacity: 0.3;
    filter: blur(20px);
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`

const TopSection = styled(ParallaxSection)`
  background-image: url('https://nitrkl.ac.in/eptp/images/fraction-slider/101.jpg');
`

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary-color), #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${float} 4s ease-in-out infinite, ${fadeIn} 1.5s ease-out;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.div`
  font-size: 2rem;
  margin-bottom: 3rem;
  font-family: 'Cinzel', serif;
  color: rgba(255, 255, 255, 0.9);
  animation: ${fadeIn} 2s ease-out 0.5s backwards;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const CountdownContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  perspective: 1000px;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  animation: ${scaleIn} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateY(-10px) scale(1.05);
  }
`

const CountdownValue = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  position: relative;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  border: 2px solid var(--primary-color);
  animation: ${glow} 2s ease-in-out infinite;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, var(--primary-color), transparent);
    opacity: 0.3;
    z-index: -1;
  }
`

const CountdownLabel = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
  text-shadow: 0 0 10px var(--primary-color);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const reunionDate = new Date('2025-12-25T14:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = reunionDate - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <HomeContainer id="home">
      <TopSection>
        <Title>NIT Rourkela 2000</Title>
        <Subtitle>Class Reunion</Subtitle>
        <CountdownContainer>
          <CountdownItem>
            <CountdownValue>{timeLeft.days}</CountdownValue>
            <CountdownLabel>Days</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownValue>{timeLeft.hours}</CountdownValue>
            <CountdownLabel>Hours</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownValue>{timeLeft.minutes}</CountdownValue>
            <CountdownLabel>Minutes</CountdownLabel>
          </CountdownItem>
          <CountdownItem>
            <CountdownValue>{timeLeft.seconds}</CountdownValue>
            <CountdownLabel>Seconds</CountdownLabel>
          </CountdownItem>
        </CountdownContainer>
      </TopSection>
    </HomeContainer>
  )
}

export default Home