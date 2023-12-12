import { Header } from './Header';
import { AddButton } from './AddButton';
import { ListProducts } from './ListProducts';
import { Container, Modal } from 'react-bulma-components';
import { FormComponent } from './FormComponent'
import { useEffect, useState } from 'react';
import { saveProduct } from '../services';
import { Loading } from './Loading';
import { getProducts } from "../services"

export const ProductLayout = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setisLoading] = useState(true)
  const [products, setProducts] = useState([])

  async function loadProducts () {
      
    const response = await getProducts()
  
    if (response.status === 200){
      const data = await response.json()
      setProducts(data.products)
    }
  
    setisLoading(false)
  
    return response
  
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSubmit = async (data) => {
    await saveProduct(data)
    loadProducts()
    setIsModalOpen(false)
  }

  return (

    <Container>
      <Header title={'Products App'}></Header>
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
        !isLoading && products.length && (
          <ListProducts products={products}></ListProducts>
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
