import { Header } from './Header';
import { AddButton } from './AddButton';
import { ListProducts } from './ListProducts';
import { Container, Modal } from 'react-bulma-components';
import { FormComponent } from './FormComponent'
import { useEffect, useState } from 'react';
import { saveProduct } from '../services';
import { Loading } from './Loading';
import { getProductsUser, getProducts } from "../services"

export const ProductLayout = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function loadProducts () {
      
    const response = await getProducts();

    const data = await response.json();

    console.log(data);
  
    if (response.status === 200){
      setProducts(data.products);
    } else console.log('Error');
  
    setisLoading(false)
  
    return response
  
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (

    <Container>
      <Header title={'Products App'}></Header>
      
      {
        isLoading && <Loading></Loading>
      }

      {
        !isLoading && !products.length && (
          <h1 className="title has-text-centered">
            There are no products
          </h1>
        )
      }

      {
        !isLoading && products.length>0 && (
          <ListProducts products={products}></ListProducts>
        )
      }
      
    </Container>
    
  )
}
