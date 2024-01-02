import { Header } from './Header';
import { AddButton } from './AddButton';
import { Button, Container, Message, Modal } from 'react-bulma-components';
import { FormComponent } from './FormComponent'
import { useEffect, useState } from 'react';
import { saveProduct } from '../services';
import { Loading } from './Loading';
import { getProductsUser } from "../services"
import { ListMyProducts } from './ListMyProducts';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from "../services";

export const MyProducts = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setisLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  async function loadProducts () {
      
    const response = await getProductsUser();
  
    if (response.status === 200){
      
      const data = await response.json()
      console.log(data)
      setProducts(data.products)

    } else setErrors(data.message);
  
    setisLoading(false)
  
    return response
  
  }

  const handleDelete = async (productID) => {
    
    const response = await deleteProduct(productID);

    console.log(response)

    const data = await response.json();
    console.log(data)

    if (response.status === 200) {
      loadProducts();
    }
    else setErrors(data.message);
    
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (data) => {
    await saveProduct(data)
    loadProducts()
    setIsModalOpen(false)
  }

  return (

    <Container>
      <Header title={'Products App'}></Header>
      
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

      <AddButton onClick={() => setIsModalOpen(true)}></AddButton>
      
      {
        isLoading && <Loading></Loading>
      }

      {
        !isLoading && !products.length && (
          <h1 className="title has-text-centered">
            You don't have products
          </h1>
        )
      }

      {
        !isLoading && products.length>0 && (
          <ListMyProducts handleDelete={handleDelete} products={products}></ListMyProducts>
        )
      }
      
      
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>
              Add product
            </Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <FormComponent handleSubmit={handleSubmit}></FormComponent>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
      
      
    </Container>
    
  )
}
