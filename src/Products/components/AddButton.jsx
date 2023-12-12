import { Container, Section, Button } from "react-bulma-components"


export const AddButton = ({onClick}) => {
  return (
    <Section>
      <Container>
        <div className="is-pulled-right">
        <Button onClick={onClick} color="primary">Add</Button>
        </div>
      </Container>
    </Section>
  )
}
