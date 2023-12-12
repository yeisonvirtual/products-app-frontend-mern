import { PropTypes } from "prop-types"
import { Container, Section } from "react-bulma-components"

export const Header = ({title}) => {
  return (
    <Section>
      <Container>
        <h1 className="title has-text-centered">{ title }</h1>
      </Container>
    </Section>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}
