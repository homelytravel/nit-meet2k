import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMoneyBill, faQrcode } from '@fortawesome/free-solid-svg-icons'

// New Animations
const cardEntrance = keyframes`
  0% { opacity: 0; transform: perspective(1000px) rotateX(90deg) scale(0.5); }
  100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); }
`

const neonPulse = keyframes`
  0% { filter: drop-shadow(0 0 2px var(--primary-color)); }
  50% { filter: drop-shadow(0 0 8px var(--primary-color)); }
  100% { filter: drop-shadow(0 0 2px var(--primary-color)); }
`

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const PaymentContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(45deg, 
    var(--background-color) 0%, 
    rgba(0,0,0,0.9) 50%, 
    var(--background-color) 100%
  );
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  position: relative;
  overflow: hidden;
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 4rem;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${neonPulse} 2s infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const PaymentCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transform-style: preserve-3d;
  perspective: 1000px;
  opacity: 0;
  animation: ${cardEntrance} 1s forwards;
  animation-delay: ${props => props.delay * 0.3}s;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255,215,0,0.1),
      transparent
    );
    animation: ${gradientFlow} 6s linear infinite;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 20px 40px rgba(255,215,0,0.2);
  }
`

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;

  ${PaymentCard}:hover & {
    transform: scale(1.2) rotateY(360deg);
  }
`

const CardTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  z-index: 1;
`

const CardContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  position: relative;
  z-index: 1;
  text-align: center;
`

const PaymentDetails = styled.div`
  margin-top: 4rem;
  padding: 2.5rem;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  position: relative;
  opacity: 0;
  animation: ${cardEntrance} 1s forwards;
  animation-delay: 1s;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255,215,0,0.1) 10px,
      rgba(255,215,0,0.1) 20px
    );
    z-index: 0;
  }
`

const DetailItem = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 1.2rem;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateX(-50px);
  animation: ${cardEntrance} 0.6s forwards;
  animation-delay: ${props => props.delay * 0.2 + 1.2}s;

  strong {
    color: var(--primary-color);
    animation: ${neonPulse} 2s infinite;
  }
`

const Payment = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.animate-payment').forEach(el => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])

  return (
    <PaymentContainer id="payment">
      <Title className="animate-payment">Payment Options</Title>
      
      <PaymentGrid>
        <PaymentCard delay={0} className="animate-payment">
          <IconWrapper>
            <FontAwesomeIcon icon={faCreditCard} />
          </IconWrapper>
          <CardTitle>Credit Card</CardTitle>
          <CardContent>
            Secure online payment via credit or debit card through our encrypted payment gateway.
          </CardContent>
        </PaymentCard>

        <PaymentCard delay={1} className="animate-payment">
          <IconWrapper>
            <FontAwesomeIcon icon={faMoneyBill} />
          </IconWrapper>
          <CardTitle>Bank Transfer</CardTitle>
          <CardContent>
            Direct NEFT/RTGS transfers to our official reunion account with instant confirmation.
          </CardContent>
        </PaymentCard>

        <PaymentCard delay={2} className="animate-payment">
          <IconWrapper>
            <FontAwesomeIcon icon={faQrcode} />
          </IconWrapper>
          <CardTitle>Digital Wallet</CardTitle>
          <CardContent>
            Instant payments through UPI, Google Pay, PhonePe, and other digital wallets.
          </CardContent>
        </PaymentCard>
      </PaymentGrid>

      <PaymentDetails className="animate-payment">
        <DetailItem delay={0}><strong>Early Bird:</strong> ₹750/person (Till March 15, 2024)</DetailItem>
        <DetailItem delay={1}><strong>Regular:</strong> ₹1000/person</DetailItem>
        <DetailItem delay={2}><strong>Guest Pass:</strong> ₹500/additional person</DetailItem>
        <DetailItem delay={3}><strong>* Deadline:</strong> May 15, 2025</DetailItem>
      </PaymentDetails>
    </PaymentContainer>
  )
}

export default Payment