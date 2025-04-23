import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotel, faBed, faHouse } from '@fortawesome/free-solid-svg-icons'

const AccommodationContainer = styled.div`
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

const AccommodationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const AccommodationCard = styled.div`
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

const AccommodationTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`

const AccommodationDetails = styled.div`
  text-align: left;
  width: 100%;
`

const DetailItem = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`

const BookingLink = styled.a`
  display: inline-block;
  background-color: var(--primary-color);
  color: var(--background-color);
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    transform: translateY(-2px);
  }
`

const Accommodation = () => {
  const accommodations = [
    {
      id: 1,
      icon: faHotel,
      name: 'Hotel Mayfair Rourkela',
      description: 'Our main venue hotel with special reunion rates.',
      address: 'Panposh Road, Rourkela',
      rate: '₹5000/night (Reunion Special)',
      phone: '+91 661 2400500',
      bookingUrl: '#'
    },
    {
      id: 2,
      icon: faBed,
      name: 'Hotel Deepti',
      description: 'Comfortable accommodations near NIT campus.',
      address: 'Civil Township, Rourkela',
      rate: '₹3000/night',
      phone: '+91 661 2400700',
      bookingUrl: '#'
    },
    {
      id: 3,
      icon: faHouse,
      name: 'NIT Guest House',
      description: 'On-campus accommodation for alumni.',
      address: 'NIT Campus, Rourkela',
      rate: '₹2000/night',
      phone: '+91 661 2462021',
      bookingUrl: '#'
    }
  ]

  return (
    <AccommodationContainer id="accommodation">
      <Title>Accommodation</Title>
      <AccommodationsGrid>
        {accommodations.map(accommodation => (
          <AccommodationCard key={accommodation.id}>
            <IconWrapper>
              <FontAwesomeIcon icon={accommodation.icon} />
            </IconWrapper>
            <AccommodationTitle>{accommodation.name}</AccommodationTitle>
            <AccommodationDetails>
              <DetailItem>{accommodation.description}</DetailItem>
              <DetailItem>{accommodation.address}</DetailItem>
              <DetailItem>{accommodation.rate}</DetailItem>
              <DetailItem>{accommodation.phone}</DetailItem>
            </AccommodationDetails>
            <BookingLink href={accommodation.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </BookingLink>
          </AccommodationCard>
        ))}
      </AccommodationsGrid>
    </AccommodationContainer>
  )
}

export default Accommodation