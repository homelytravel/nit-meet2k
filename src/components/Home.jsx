import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

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
  background-size: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  border: 8px double var(--primary-color);
  margin: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`

const TopSection = styled(ParallaxSection)`
  background-image: url('https://nitrkl.ac.in/eptp/images/fraction-slider/101.jpg');
`

const BottomSection = styled(ParallaxSection)`
  background-image: url('https://images.shiksha.com/mediadata/images/1607331935php7vaw4G.jpeg');
`

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.div`
  font-size: 2rem;
  margin-bottom: 3rem;
  font-family: 'Cinzel', serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const CountdownContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

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
`

const CountdownValue = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const CountdownLabel = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;

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
    const reunionDate = new Date('2025-12-26T00:00:00').getTime()

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