import { Card, Columns, Content, Heading } from "react-bulma-components"
import { Link } from "react-router-dom"

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
                  { product.size && <Heading subtitle size={6}>Size: {product.size}</Heading> }
                  <p>{product.description}</p>
                  <Heading subtitle size={6}>Owner: <Link to={`/users/${product.user._id}`}>{product.user.email}</Link></Heading>
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
