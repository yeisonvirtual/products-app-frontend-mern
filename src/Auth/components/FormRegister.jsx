import { useState } from 'react';
import { Form, Button } from 'react-bulma-components';

export const FormRegister = ({ handleSubmit }) => {

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  }

  const _handleSubmit = (e) => {
    e.preventDefault()
    // enviar los valores de los campos y la image
    handleSubmit({...formValues})
  }

  return (
    <>
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
        <Form.Label>Password</Form.Label>
        <Form.Control>
          <Form.Input placeholder="Password" name="password" type="password" value={formValues.password} onChange={handleChange} />
        </Form.Control>
      </Form.Field>
      <Button.Group>
        <Button fullwidth rounded color="primary" onClick={_handleSubmit}>Register</Button>
      </Button.Group>
    </>
  )
}
