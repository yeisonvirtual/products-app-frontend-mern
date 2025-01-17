import { Button, Message, Container, Section, Card, Content } from 'react-bulma-components';
import { FormRegister } from './FormRegister';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Register = () => {

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    
    const response = await register(userData);

    const data = await response.json();

    console.log(data);

    if (response.status === 201) {

      navigate(`/login/registered`);

    }
    else setErrors(data.message);
    
  }

  return (
    <Content>
      <Section>
        <Card style={{ width: 800, margin: 'auto' }}>
        <Section>
          <Container>
            <h1 className="title has-text-centered">Register</h1>
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
            <FormRegister handleSubmit={handleSubmit} />
          </Container>
        </Section>
        </Card>
      </Section>
    </Content>
  )
}
