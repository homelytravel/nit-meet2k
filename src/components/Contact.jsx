import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

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

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--background-color);
  overflow: hidden;
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out, ${float} 4s ease-in-out infinite;

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
  animation: ${scaleUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--primary-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateX(${props => props.direction === 'left' ? '-50px' : '50px'});
  animation: ${props => props.direction === 'left' ? slideInLeft : slideInRight} 0.6s forwards;
  animation-delay: ${props => props.delay * 0.2}s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.2);
  }

  &:last-child {
    border-bottom: none;
  }
`

const IconWrapper = styled.div`
  font-size: 2rem;
  color: var(--primary-color);
  width: 40px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
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
  animation: ${scaleUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.6s forwards;
  animation-delay: ${props => props.delay * 0.2}s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);
  }
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ContactContainer id="contact">
      <Title>Contact Us</Title>
      <ContactContent>
        <ContactInfo direction="left" delay={0} className="animate-on-scroll">
          <IconWrapper>
            <FontAwesomeIcon icon={faEnvelope} />
          </IconWrapper>
          <InfoText>
            <InfoTitle>Email</InfoTitle>
            <InfoDetails>reunion2025@nitrourkela.ac.in</InfoDetails>
          </InfoText>
        </ContactInfo>

        <ContactInfo direction="right" delay={1} className="animate-on-scroll">
          <IconWrapper>
            <FontAwesomeIcon icon={faPhone} />
          </IconWrapper>
          <InfoText>
            <InfoTitle>Phone</InfoTitle>
            <InfoDetails>(+91) 123-4567</InfoDetails>
          </InfoText>
        </ContactInfo>

        <ContactInfo direction="left" delay={2} className="animate-on-scroll">
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

      <CommitteeMembers className="animate-on-scroll">
        <CommitteeTitle>Reunion Committee</CommitteeTitle>
        <MembersList>
          {committeeMembers.map((member, index) => (
            <MemberCard key={index} delay={index} className="animate-on-scroll">
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