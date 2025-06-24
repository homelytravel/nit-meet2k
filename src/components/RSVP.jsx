import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { supabase } from '../supabaseClient'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const scaleUp = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const RSVPContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--background-color);
  animation: ${fadeIn} 0.8s ease-out;
`

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${scaleUp} 0.6s ease-out forwards;
  opacity: 0;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay || '0.3s'};
`

const Label = styled.label`
  font-size: 1.2rem;
  color: var(--primary-color);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-left: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #fff;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #fff;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }

  option {
    background: var(--background-color);
  }
`

const SubmitButton = styled.button`
  background: linear-gradient(45deg, var(--primary-color), #ff6b6b);
  color: var(--background-color);
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  animation: ${pulse} 2s infinite;

  &:hover {
    animation: none;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: translate(-50%, -50%) scale(1);
  }
`

const Message = styled.p`
  color: ${props => props.error ? '#ff4444' : '#4CAF50'};
  font-size: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.6s ease-out;
`

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    guests: '0'
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      if (data.user) {
        setFormData(prev => ({ ...prev, email: data.user.email }))
      }
    }
    getUser()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([{ 
          ...formData,
          guests: parseInt(formData.guests),
          user_id: user?.id
        }])

      if (error) throw error

      setMessage('Thank you for your RSVP! 🎉 We look forward to seeing you.')
      setFormData({
        name: '',
        email: user?.email || '',
        attendance: 'yes',
        guests: '0'
      })
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setError('❌ There was an error submitting your RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RSVPContainer id="rsvp">
      <Title>RSVP</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup delay="0.3s">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup delay="0.4s">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup delay="0.5s">
          <Label htmlFor="attendance">Will you attend?</Label>
          <Select
            id="attendance"
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
          >
            <option value="yes">Yes, I will attend</option>
            <option value="no">No, I cannot attend</option>
            <option value="maybe">Maybe</option>
          </Select>
        </FormGroup>

        <FormGroup delay="0.6s">
          <Label htmlFor="guests">Number of Additional Guests</Label>
          <Select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
          >
            {[0, 1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </Select>
        </FormGroup>

        {message && <Message>{message}</Message>}
        {error && <Message error>{error}</Message>}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending... ✈️' : 'Submit RSVP 🎉'}
        </SubmitButton>
      </Form>
    </RSVPContainer>
  )
}

export default RSVP