import { Card, Heading, Content } from "react-bulma-components"
import Owner from "../../assets/images/owner.jpg"
import { useEffect, useState } from "react"
import { getUser } from "../services/users"
import { useParams } from "react-router-dom"

export const ProfileUser = () => {

  const [user, setUser] = useState({});
  const params = useParams();

  const loadUser = async () => {

    const userID = params.id;

    const response = await getUser(userID);
    const data = await response.json();
    console.log(data);

    if (response.status===200) {
      setUser(data.user);
    }else console.log(data.message);

  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
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
  )
}
