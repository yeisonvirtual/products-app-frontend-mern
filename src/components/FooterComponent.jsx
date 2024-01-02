import { Hero, Footer, Container, Content } from "react-bulma-components"

export const FooterComponent = () => {
  return (
    <Hero>
      <Hero.Header renderAs="header" />
      <Hero.Body />
      <Hero.Footer>
        <Footer>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <p>
                Copyright © <a href="https://github.com/yeisonvirtual">Yeison Rojas</a>.
                All rights reserved.
              </p>
            </Content>
          </Container>
        </Footer>
      </Hero.Footer>
    </Hero>
    
  )
}

//<p>Copyright © Yeison Rojas. All rights reserved.</p>