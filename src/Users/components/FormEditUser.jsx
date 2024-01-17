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
    type: '',
    active: ''
  });

  const params = useParams();

  const loadUser = async () => {

    const userID = params.id;

    const response = await getUser(userID);
    const data = await response.json();
    console.log(data.user);
    console.log(data.user.active)

    if (response.status===200) {

      // const active = ''

      // if (data.user.active) active = 'true'
      // else active = 'false'

      setFormValues({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        type: data.user.type,
        active: data.user.active
      });
      
    }else console.log(data.message);

  }

  useEffect(() => {
    loadUser();
  }, []);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
    console.log(formValues)
  }

  const _handleSubmit = (e) => {
    e.preventDefault()
    // enviar los valores de los campos y la image
    handleSubmit({...formValues});
  }

  return (
    <Card style={{ width: 300, margin: 'auto' }}>
        <Card.Image size="square" src={userImg}></Card.Image>
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
              <Form.Field>
                <Form.Label>Active</Form.Label>
                <Form.Control>
                  <Form.Select name="active" value={formValues.active} onChange={handleChange}>
                    <option value='true'>
                      Active
                    </option>
                    <option value='false'>
                      Inactive
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
