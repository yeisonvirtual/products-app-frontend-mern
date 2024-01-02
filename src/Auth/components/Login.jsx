import { FormLogin } from './FormLogin'
import { Button, Container, Message, Section } from 'react-bulma-components';
import { login } from '../services/auth';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const { setIsAuthenticated, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    
    const response = await login(userData);

    const data = await response.json();

    console.log(data);

    if (response.status === 201) {

      setUser(data)
      setIsAuthenticated(true);
      navigate('/products');

    }
    else setErrors(data.message);
    
  }

  return (
    <>
      <Section>
        <Container>
          <h1 className="title has-text-centered">Login</h1>
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
          <FormLogin handleSubmit={handleSubmit} />
        </Container>
      </Section>
    </>
  )
}
