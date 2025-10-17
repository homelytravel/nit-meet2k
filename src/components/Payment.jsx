 import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faQrcode, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Animations
const cardEntrance = keyframes`
  0% { opacity: 0; transform: perspective(1000px) rotateX(90deg) scale(0.5); }
  100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); }
`;

const neonPulse = keyframes`
  0% { filter: drop-shadow(0 0 2px var(--primary-color)); }
  50% { filter: drop-shadow(0 0 8px var(--primary-color)); }
  100% { filter: drop-shadow(0 0 2px var(--primary-color)); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const PaymentContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(45deg, #0a0a0a, #1e1e1e, #0a0a0a);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-color);
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-transform: uppercase;
  animation: ${neonPulse} 2s infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 3px;
    background: var(--primary-color);
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const EmailInstruction = styled.div`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  background: rgba(255,255,255,0.05);
  padding: 1.2rem 2rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  animation: ${cardEntrance} 1s ease forwards;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: var(--primary-color);
    font-size: 1.5rem;
  }
`;

const PaymentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const PaymentCard = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  animation: ${cardEntrance} 1s ease forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  font-size: 1rem;
  text-align: center;

  p {
    margin: 0.4rem 0;
  }

  strong {
    color: var(--primary-color);
  }
`;

const QRImage = styled.img`
  margin-top: 1rem;
  width: 180px;
  border-radius: 8px;
`;

const Payment = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-payment').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PaymentContainer id="payment">
      <Title className="animate-payment">Payment</Title>

      <EmailInstruction className="animate-payment">
        <FontAwesomeIcon icon={faEnvelope} />
        <span>Send an email to <strong>nitry2k@gmail.com</strong> with screenshot of your payment.</span>
      </EmailInstruction>

      <PaymentGrid>
        {/* Bank Transfer */}
        <PaymentCard className="animate-payment">
          <IconWrapper>
            <FontAwesomeIcon icon={faUniversity} />
          </IconWrapper>
          <CardTitle>Bank Transfer</CardTitle>
          <CardContent>
            <p><strong>Bank:</strong> State Bank of India</p>
            <p><strong>Account Name:</strong> NITRAA</p>
            <p><strong>Account Number:</strong> 44133183133</p>
            <p><strong>IFSC:</strong> SBIN0002109</p>
            <p><strong>MICR:</strong> 769002007</p>
            <p><strong>SWIFT Code:</strong> SBININBB137</p>
            <p><strong>Branch Code:</strong> 002109</p>
            <p><strong>Email Contact:</strong>nitry2k@gmail.com</p>
          </CardContent>
        </PaymentCard>

        {/* UPI QR Payment */}
        <PaymentCard className="animate-payment">
          <IconWrapper>
            <FontAwesomeIcon icon={faQrcode} />
          </IconWrapper>
          <CardTitle>Scan & Pay (UPI)</CardTitle>
          <CardContent>
            <p><strong>UPI ID:</strong> 9692242766@SBI</p>
            <img src="https://drive.google.com/file/d/1kHb2pruGl4zSmeGwJUGFp0AySjKUqkdo/view?usp=sharing" alt="QR Code" />
          </CardContent>
        </PaymentCard>
      </PaymentGrid>

      <CardContent className="animate-payment">
        <p>Please contact the organizers if you want to pay in installments or one of the above methods does not work for you.</p>
      </CardContent>
    </PaymentContainer>
  );
};

export default Payment;
