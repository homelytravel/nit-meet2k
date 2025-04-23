import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--background-color);
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const ContactContent = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--primary-color);

  &:last-child {
    border-bottom: none;
  }
`

const IconWrapper = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  width: 40px;
`

const InfoText = styled.div`
  text-align: left;
  flex: 1;
`

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`

const InfoDetails = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
`

const CommitteeMembers = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
`

const CommitteeTitle = styled.h3`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`

const MembersList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MemberCard = styled.div`
  padding: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
`

const MemberName = styled.h4`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`

const MemberRole = styled.p`
  font-size: 1rem;
  color: var(--text-color);
`

const Contact = () => {
  const committeeMembers = [
    { name: 'John Smith', role: 'Committee Chair' },
    { name: 'Sarah Johnson', role: 'Event Coordinator' },
    { name: 'Michael Brown', role: 'Treasurer' },
    { name: 'Emily Davis', role: 'Communications' }
  ]

  return (
    <ContactContainer id="contact">
      <Title>Contact Us</Title>
      <ContactContent>
        <ContactInfo>
          <IconWrapper>
            <FontAwesomeIcon icon={faEnvelope} />
          </IconWrapper>
          <InfoText>
            <InfoTitle>Email</InfoTitle>
            <InfoDetails>reunion2025@nitrourkela.ac.in</InfoDetails>
          </InfoText>
        </ContactInfo>

        <ContactInfo>
          <IconWrapper>
            <FontAwesomeIcon icon={faPhone} />
          </IconWrapper>
          <InfoText>
            <InfoTitle>Phone</InfoTitle>
            <InfoDetails>(+91) 123-4567</InfoDetails>
          </InfoText>
        </ContactInfo>

        <ContactInfo>
          <IconWrapper>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </IconWrapper>
          <InfoText>
            <InfoTitle>Address</InfoTitle>
            <InfoDetails>
              NIT Rourkela Alumni Association<br />
              National Institute of Technology<br />
              Rourkela, Odisha 769008
            </InfoDetails>
          </InfoText>
        </ContactInfo>
      </ContactContent>

      <CommitteeMembers>
        <CommitteeTitle>Reunion Committee</CommitteeTitle>
        <MembersList>
          {committeeMembers.map((member, index) => (
            <MemberCard key={index}>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
            </MemberCard>
          ))}
        </MembersList>
      </CommitteeMembers>
    </ContactContainer>
  )
}

export default Contact