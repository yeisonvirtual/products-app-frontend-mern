import { Button, Message, Container, Section } from 'react-bulma-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormEditUser } from './FormEditUser';
import { updateUser } from '../services/users';

export const EditUser = () => {
  
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {

    console.log(userData);
    
    const response = await updateUser(userData);

    const data = await response.json();

    console.log(data)

    if (response.status === 200) {
      
      navigate('/users');
    }
    else setErrors(data.message);

  }

  return (
    <Section>
      <Container>
        <h1 className="title has-text-centered">User Edit</h1>
        {
            errors && (
              <Message color="danger">
                <Message.Header>
                  <span>
                    Errors
                  </span>
                  <Button remove onClick={()=> setErrors(null)} />
                </Message.Header>
                <Message.Body>
                  {errors}
                </Message.Body>
              </Message>
            )
          }
        <FormEditUser handleSubmit={handleSubmit} />

      </Container>
    </Section>
  )
}
