import { FormLogin } from './FormLogin'
import { Button, Card, Container, Content, Message, Section } from 'react-bulma-components';
import { login } from '../services/auth';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../../Users/services/users';

export const Login = () => {

  const { setIsAuthenticated, setUser } = useContext(UserContext);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  
  const params = useParams();

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

  const verifyParam = async () => {
    
    if (params.value) {
      
      if (params.value==='registered') {

        setSuccess(`Usuario registrado exitósamente. Verifique la cuenta en su correo.`);
      
      } else {

        const userID = params.value;

        const response = await verifyUser(userID);
        const data = await response.json();

        if (response.status===200) {
          setSuccess(`Usuario ${data.verifiedUser.email} verificado exitósamente.`);
        } else {
          setErrors(data.message);
        }

      }

    }
    
  }

  useEffect(() => {
    verifyParam();
  }, []);

  return (
    <>
    <Content>
      <Section>
        <Card style={{ width: 800, margin: 'auto' }}>
          <Section>
            <Container>
              <h1 className="title has-text-centered">Login</h1>

              {
                success && (
                  <Message color="success">
                    <Message.Header>
                      <span>
                        Success
                      </span>
                      <Button remove onClick={()=> setSuccess(null)} />
                    </Message.Header>
                    <Message.Body>
                      {success}
                    </Message.Body>
                  </Message>
                )
              }

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
          </Card>
        </Section>
      </Content>
    </>
  )
}
