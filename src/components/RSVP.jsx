import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { supabase } from '../supabaseClient'

const RSVPContainer = styled.div`
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
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 1.2rem;
  color: var(--primary-color);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #fff;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #fff;
  }

  option {
    background: var(--background-color);
  }
`

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #fff;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
    transform: none;
  }
`

const Message = styled.p`
  color: ${props => props.error ? '#ff4444' : '#4CAF50'};
  font-size: 1rem;
  margin-top: 1rem;
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
    // Get current user
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      
      // Pre-fill email if user is logged in
      if (data.user) {
        setFormData(prev => ({
          ...prev,
          email: data.user.email
        }))
      }
    }
    
    getUser()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setIsSubmitting(true)

    try {
      // Submit RSVP to Supabase
      const { error } = await supabase
        .from('rsvps')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            attendance: formData.attendance,
            guests: parseInt(formData.guests),
            user_id: user?.id
          }
        ])

      if (error) throw error

      setMessage('Thank you for your RSVP! We look forward to seeing you.')
      setFormData({
        name: '',
        email: user?.email || '',
        attendance: 'yes',
        guests: '0'
      })
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setError('There was an error submitting your RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RSVPContainer id="rsvp">
      <Title>RSVP</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
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
        <FormGroup>
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
        <FormGroup>
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
        <FormGroup>
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
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </SubmitButton>
      </Form>
    </RSVPContainer>
  )
}

export default RSVP