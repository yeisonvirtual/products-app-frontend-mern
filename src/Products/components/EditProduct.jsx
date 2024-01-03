import { Button, Message, Container, Section } from 'react-bulma-components';
import { FormEditProduct } from './FormEditProduct';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormComponent } from './FormComponent';
import { updateProduct } from '../services';

export const EditProduct = () => {

  const params = useParams();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (productData) => {

    console.log(productData)
    
    const response = await updateProduct(productData);

    const data = await response.json();

    console.log(data)

    if (response.status === 200) {
      
      navigate('/myproducts');
    }
    else setErrors(data.message);

  }

  // const handleSubmit = (productData) => {
  //   console.log(productData)
  //   navigate(`/myproducts/`)
  // }

  return (
    <Section>
      <Container>
        <h1 className="title has-text-centered">Edit Product</h1>
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
        <FormEditProduct handleSubmit={handleSubmit} />

      </Container>
    </Section>
  )
}
