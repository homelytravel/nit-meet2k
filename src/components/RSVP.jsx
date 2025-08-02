import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { supabase } from '../supabaseClient';

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
  `;

const RSVPContainer = styled.div`
  padding: 4rem 4rem;
  background: #fff;
  color: #333;
  animation: ${fadeIn} 0.8s ease-out;
  font-family: 'Segoe UI', sans-serif;
`;

const HeaderContent = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #000;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const Subtitle = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const Note = styled.div`
  font-size: 1rem;
  color: red;
  margin-bottom: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;

  th, td {
    border: 1px solid #ccc;
    padding: 0.75rem;
    font-size: 1rem;
  }

  th {
    background-color: #222;
    color: white;
  }
`;

const Caption = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const List = styled.ol`
  padding-left: 1.25rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const Disclaimer = styled.p`
  font-size: 0.95rem;
  margin-top: 1rem;
  color: #666;
`;

const RightForm = styled.form`
  flex: 1;
  min-width: 300px;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  animation: ${scaleUp} 0.6s ease-out forwards;
  opacity: 0;
`;

const FormGroup = styled.div`
  position: relative;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay || '0.3s'};
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  background: #f9f9f9;
  padding: 0 0.25rem;
  transition: 0.2s;
  pointer-events: none;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 0.75rem 0.25rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: transparent;

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: 0;
    transform: translateY(-50%) scale(0.85);
    background: #f9f9f9;
    color: #333;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 0.75rem 0.25rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: transparent;

   &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: 0;
    transform: translateY(-50%) scale(0.85);
    background: #f9f9f9;
    color: #333;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  > * {
    flex: 1;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  background-color: #fbbc05;
  border: none;
  border-radius: 5px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  animation: ${pulse} 2s infinite;
  &:hover {
    background-color: #eccb73ff;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  color: ${props => props.error ? 'red' : 'green'};
  margin-top: 1rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const RSVP = () => {
  const [formData, setFormData] = useState({
    rollNumber: '', name: '', email: '', country: '', state: '', city: '',
    phonePrefix: '+91', phone: '', whatsapp: '', registrationType: 'Individual only'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) setFormData(prev => ({ ...prev, email: data.user.email }));
    }
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); setError(''); setIsSubmitting(true);
    try {
      const { error } = await supabase.from('registrations').insert([{ ...formData, user_id: user?.id }]);
      if (error) throw error;
      setMessage('🎉 Registration successful!');
      setFormData({ rollNumber: '', name: '', email: user?.email || '', country: '', state: '', city: '', phonePrefix: '+91', phone: '', whatsapp: '', registrationType: 'Individual only' });
    } catch (err) {
      setError('❌ Failed to register. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <RSVPContainer id="rsvp">
      <HeaderContent>
        <Title>REGISTRATION</Title>
        <Subtitle>
          Don’t miss the 2000 Silver Jubilee event! <strong>Register now</strong> to secure your spot and confirm your rsvp by making a payment.
        </Subtitle>
        <Note>
          We understand that plans can change. That’s why we offer a full refund if you need to cancel your rsvp until September 30th.
        </Note>
      </HeaderContent>

      <ContentWrapper>
        <LeftContent>
          <Table>
            <thead>
              <tr><th>REGISTRATION Type</th><th>Charges</th></tr>
            </thead>
            <tbody>
            Registration Fee:



              <tr><td>
                <div>
                  Self 
                  Spouse/Child - ₹5000
                  (No charges for children less than 13 years)
                </div>
                </td><td>₹25,000</td></tr>
              <tr><td>
                <div>
                Nostalgic Starter Discount
                    💸 Discount Amount: ₹3,000
                    🎯 Revised Registration Fee: 
                    ⏳ Valid Until: August 5th, midnight IST
                </div>
                </td><td>₹25,000 → ₹22,000</td></tr>
              <tr><td>Additional guest (12+ years old), Per Head</td><td>₹5,000</td></tr>
            </tbody>
          </Table>
          <Caption>
            Alumni donating/contributing more than ₹50,000 can pay "Individual Only (without family)" rsvp fee for their family rsvp and they do not need to pay "With Family (spouse + kids)" rsvp fee.
          </Caption>
          <Subtitle>The rsvp fee covers the following</Subtitle>
          <List>
            <li>Food and non-alcoholic beverages for Dec 25th evening through Dec 27th Breakfast.</li>
            <li>Cultural and Entertainment activities for Dec 25th and Dec 26th.</li>
            <li>Stage setup, photography, party hall rental, music systems, orchestra, etc.</li>
            <li>Souvenirs and gifts for registered Alumni.</li>
            <li>Teacher felicitations, and other memorabilia.</li>
            <li>RSVP kit which includes lanyard with name tag, ID card for NITR campus visit, goodie bag and event itinerary.</li>
            <li>Transportation and logistics to and from hotel to venue/NIT Rourkela from Dec 25th through Dec 26th</li>
          </List>
          <Disclaimer>The fee does not include accommodation.</Disclaimer>
        </LeftContent>

        <RightForm onSubmit={handleSubmit}>
          <FormGroup>
            <Input name="rollNumber" value={formData.rollNumber} onChange={handleChange} required placeholder=" " />
            <Label htmlFor="rollNumber">REC Roll Number</Label>
          </FormGroup>
          <FormGroup>
            <Input name="name" value={formData.name} onChange={handleChange} required placeholder=" " />
            <Label htmlFor="name">Name</Label>
          </FormGroup>
          <FormGroup>
            <Input name="email" value={formData.email} onChange={handleChange} required placeholder=" " />
            <Label htmlFor="email">Email Address</Label>
          </FormGroup>
          <InputRow>
            <FormGroup>
              <Input name="country" value={formData.country} onChange={handleChange} required placeholder=" " />
              <Label htmlFor="country">Country</Label>
            </FormGroup>
            <FormGroup>
              <Input name="state" value={formData.state} onChange={handleChange} placeholder=" " />
              <Label htmlFor="state">State</Label>
            </FormGroup>
            <FormGroup>
              <Input name="city" value={formData.city} onChange={handleChange} placeholder=" " />
              <Label htmlFor="city">City</Label>
            </FormGroup>
          </InputRow>
          
          <InputRow>
            <FormGroup>
              <Input name="phonePrefix" value={formData.phonePrefix} onChange={handleChange} required placeholder=" " />
              <Label>Prefex</Label>
            </FormGroup>
            <FormGroup>
              <Input name="phone" value={formData.phone} onChange={handleChange} required placeholder=" " />
              <Label>Phone Number</Label>
            </FormGroup>
            <FormGroup>
              <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder=" " />
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
            </FormGroup>
          </InputRow>

          <FormGroup>
            <Select name="registrationType" value={formData.registrationType} onChange={handleChange} required>
              <option value="Individual only">Individual only (₹23,000)</option>
              <option value="With Family">With Family (₹30,000)</option>
            </Select>
            <Label htmlFor="registrationType">RSVP Type</Label>
          </FormGroup>
          <Caption style={{ color: '#000' }}>
            The "Individual Only" and "With Family" rsvp fee is discounted by about 60% to allow increased attendance – actual cost is about ₹50,000. Please contribute generously.
          </Caption>
          {message && <Message>{message}</Message>}
          {error && <Message error>{error}</Message>}
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </SubmitButton>
        </RightForm>
      </ContentWrapper>
    </RSVPContainer>
  );
};

export default RSVP;
