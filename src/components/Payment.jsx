import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMoneyBill, faQrcode } from '@fortawesome/free-solid-svg-icons'

const PaymentContainer = styled.div`
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

const PaymentOptionsContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const PaymentOption = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`

const OptionTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`

const OptionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
`

const PaymentInfo = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
`

const InfoText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 1rem;
`

const Payment = () => {
  return (
    <PaymentContainer id="payment">
      <Title>Payment Options</Title>
      <PaymentOptionsContainer>
        <PaymentOption>
          <IconWrapper>
            <FontAwesomeIcon icon={faCreditCard} />
          </IconWrapper>
          <OptionTitle>Credit Card</OptionTitle>
          <OptionDescription>
            Secure online payment via credit or debit card through our payment portal.
          </OptionDescription>
        </PaymentOption>

        <PaymentOption>
          <IconWrapper>
            <FontAwesomeIcon icon={faMoneyBill} />
          </IconWrapper>
          <OptionTitle>Bank Transfer</OptionTitle>
          <OptionDescription>
            Direct bank transfer to our reunion account. Details will be provided upon RSVP.
          </OptionDescription>
        </PaymentOption>

        <PaymentOption>
          <IconWrapper>
            <FontAwesomeIcon icon={faQrcode} />
          </IconWrapper>
          <OptionTitle>Digital Wallet</OptionTitle>
          <OptionDescription>
            Quick and easy payment using your preferred digital wallet service.
          </OptionDescription>
        </PaymentOption>
      </PaymentOptionsContainer>

      <PaymentInfo>
        <InfoText>
          Early Bird Registration: ₹750 per person (until March 15th, 2024)
        </InfoText>
        <InfoText>
          Regular Registration: ₹1000 per person
        </InfoText>
        <InfoText>
          Additional Guest: ₹500 per person
        </InfoText>
        <InfoText>
          * All payments must be completed by May 15th, 2025
        </InfoText>
      </PaymentInfo>
    </PaymentContainer>
  )
}

export default Payment