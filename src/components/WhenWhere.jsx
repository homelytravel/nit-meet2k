import React from 'react'
import styled from 'styled-components'

const WhenWhereContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--background-color);
  background-image: url('https://images.shiksha.com/mediadata/images/1607331935php7vaw4G.jpeg');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
  }
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 12px double var(--primary-color);
  border-radius: 8px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const InfoTitle = styled.h3`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const InfoText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const WhenWhere = () => {
  return (
    <WhenWhereContainer id="when-where">
      <Title>When & Where</Title>
      <ContentContainer>
        <InfoSection>
          <InfoTitle>When</InfoTitle>
          <InfoText>
            Friday, December 26th, 2025
            <br />
            6:00 PM - 11:00 PM
          </InfoText>
        </InfoSection>
        <InfoSection>
          <InfoTitle>Where</InfoTitle>
          <InfoText>
            NIT Rourkela Campus
            <br />
            Sector 1
            <br />
            Rourkela, Odisha 769008
          </InfoText>
        </InfoSection>
      </ContentContainer>
    </WhenWhereContainer>
  )
}

export default WhenWhere