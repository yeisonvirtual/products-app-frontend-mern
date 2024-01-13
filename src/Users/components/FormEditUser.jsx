import { Content, Card, Form, Button } from 'react-bulma-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/users';
import userImg from '../../assets/images/owner.jpg'

export const FormEditUser = ({handleSubmit}) => {

  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    email: '',
    type: ''
  });

  const params = useParams();

  const loadUser = async () => {

    const userID = params.id;

    const response = await getUser(userID);
    const data = await response.json();
    console.log(data.user);

    if (response.status===200) {
      setFormValues({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        type: data.user.type
      });
      
    }else console.log(data.message);

  }

  useEffect(() => {
    loadUser();
  }, []);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  }

  const _handleSubmit = (e) => {
    e.preventDefault()
    // enviar los valores de los campos y la image
    handleSubmit({...formValues});
  }

  return (
    <Card style={{ width: 400, margin: 'auto' }}>
        <Card.Image size="16by9" src={userImg}></Card.Image>
          <Card.Content>
            <Content>
              <Form.Field>
                <Form.Label>Name</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Name" name="name" value={formValues.name} onChange={handleChange} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Email" name="email" value={formValues.email} onChange={handleChange} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Type</Form.Label>
                <Form.Control>
                  <Form.Select name="type" value={formValues.type} onChange={handleChange}>
                    <option value="guest">
                      guest
                    </option>
                    <option value="admin">
                      admin
                    </option>
                  </Form.Select>
                </Form.Control>
              </Form.Field>
              <Button.Group>
                <Button fullwidth rounded color="primary" onClick={_handleSubmit}>Update</Button>
              </Button.Group>
            </Content>
          </Card.Content>
        </Card>
  )
}
