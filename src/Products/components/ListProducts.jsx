import { Card, Columns, Content, Heading } from "react-bulma-components"

export const ListProducts = ({products}) => {

  return (
    <Columns>
    {
      products.map(product=> 
        (
          <Columns.Column size={3} key={product._id}>
            <Card style={{ width: 300, margin: 'auto' }}>
              <Card.Image size="square" src={product.imgUrl}></Card.Image>
              <Card.Content>
                <Content>
                  <Heading>{product.name}</Heading>
                  <Heading subtitle size={6}>Price: {product.unitaryPrice}</Heading>
                  <Heading subtitle size={6}>Size: {product.size}</Heading>
                  <p>
                    {product.description}
                  </p>
                  { product.user && <Heading subtitle size={6}>Owner: {product.user.email}</Heading> }
                  { !product.user && <Heading subtitle size={6}>Owner: Unknown</Heading> }
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
