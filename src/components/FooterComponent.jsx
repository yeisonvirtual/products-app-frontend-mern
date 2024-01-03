import { Footer, Container, Content } from "react-bulma-components"

export const FooterComponent = () => {
  return (
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
  )
}

//<p>Copyright © Yeison Rojas. All rights reserved.</p>