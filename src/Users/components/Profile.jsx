import { Card, Media, Image, Heading, Content, Section } from "react-bulma-components"
import Owner from "../../assets/images/owner.jpg"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

export const Profile = () => {

  const { user } = useContext(UserContext);

  return (
    <Section>
      <Card style={{ width: 300, margin: 'auto' }}>
        <Card.Image
          src={Owner}
        />
        <Card.Content>
          
          <Content className="has-text-centered">

            <Heading size={4}>Profile</Heading>
            <Heading size={6}>Email: {user.email}</Heading>
            <Heading size={6}>Name: {user.name}</Heading>
            <Heading size={6}>Type: {user.type}</Heading>

          </Content>

        </Card.Content>

      </Card>
    </Section>
  )
}
