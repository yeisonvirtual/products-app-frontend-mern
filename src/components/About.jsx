import { Card, Media, Image, Heading, Content, Section } from "react-bulma-components"
import Owner from "../assets/images/owner.jpg"
import Logo from '../assets/images/logo.png'

export const About = () => {
  return (
    <Section>
      <Card style={{ width: 300, margin: 'auto' }}>
        <Card.Image
          src={Owner}
        />
        <Card.Content>
          <Media>

            <Media.Item renderAs="figure" align="left">
              <Image
                size={64}
                alt="64x64"
                src={Logo}
              />
            </Media.Item>

            <Media.Item>
              <Heading size={4}>Yeison Rojas</Heading>
              <Heading subtitle size={6}>
                <a href="https://github.com/yeisonvirtual">@yeisonvirtual</a>
              </Heading>
            </Media.Item>
            
          </Media>

          <Content className="has-text-centered">

            <Heading size={4}>Products App</Heading>

            Ecommerce application created with MERN stack technologies.
            The Frontend application was created with React.js, 
            React Bulma Components and the Rest API was created with Node.js. 
            Personal Project to improve my web development skills.

          </Content>

        </Card.Content>

      </Card>
    </Section>
  )
}
