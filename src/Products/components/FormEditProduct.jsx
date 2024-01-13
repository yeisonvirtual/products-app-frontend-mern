import { useEffect, useState } from 'react';
import { Content, Card, Form, Button } from 'react-bulma-components';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services';

export const FormEditProduct = ({handleSubmit}) => {

  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    unitaryPrice: '',
    size: '',
    description: '',
    imgUrl: ''
  });

  const params = useParams();

  useEffect(() => {

    const loadProduct = async () => {
      if (params.id) {

        try {

          const response = await getProduct(params.id);
          const data = await response.json();
          const product = data.product;

          setFormValues({
            id: product._id,
            name: product.name,
            unitaryPrice: product.unitaryPrice,
            size: product.size,
            description: product.description,
            imgUrl: product.imgUrl
          });
          
        } catch (error) {
          console.log(error);
        }
        
      }
    }

    loadProduct();
    
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
    <>

      <Card style={{ width: 600, margin: 'auto' }}>
        <Card.Image size="16by9" src={formValues.imgUrl}></Card.Image>
          <Card.Content>
            <Content>
              <Form.Field>
                <Form.Label>Name</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Name" name="name" value={formValues.name} onChange={handleChange} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Unitary price</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Unitary price" name="unitaryPrice" value={formValues.unitaryPrice} onChange={handleChange} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Size</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Size" name="size" value={formValues.size} onChange={handleChange} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Description</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Description" name="description" value={formValues.description} onChange={handleChange} />
                </Form.Control>
              </Form.Field>
              <Button.Group>
                <Button fullwidth rounded color="primary" onClick={_handleSubmit}>Update</Button>
              </Button.Group>
            </Content>
          </Card.Content>
        </Card>
      
    </>
  )
}
