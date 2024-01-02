import { Button, Card, Columns, Content, Heading } from "react-bulma-components"

export const ListMyProducts = ({products, handleDelete}) => {

  const _handleDelete = (productID) =>{
    handleDelete(productID);
  }

  return (
    <Columns>
    {
      products.map(product=> 
        (
          <Columns.Column size={3} key={product._id}>
            <Card>
              <Card.Image size="16by9" src={product.imgUrl}></Card.Image>
              <Card.Content>
                <Content>
                  <Heading>{product.name}</Heading>
                  <Heading subtitle size={6}>Price: {product.unitaryPrice}</Heading>
                  <Heading subtitle size={6}>Size: {product.size}</Heading>
                  <p>
                    {product.description}
                  </p>
                  <Button.Group>
                    <Button onClick={ () => console.log(id) } color="info" renderAs="span">
                      Edit
                    </Button>
                    <Button onClick={ () => _handleDelete(product._id) } color="danger" renderAs="span">
                      Delete
                    </Button>
                  </Button.Group>
                </Content>
              </Card.Content>
            </Card>
          </Columns.Column>
        )
      )
    }
    </Columns>
  )
  
}
