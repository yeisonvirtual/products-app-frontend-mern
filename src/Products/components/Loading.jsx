import { Container, Loader, Section } from "react-bulma-components"

export const Loading = () => {
  return (

    <Section>
      <div className="columns is-centered">
        <Loader style={{
          width: 100,
          height: 100
        }}></Loader>
      </div>
    </Section>
    
    
  )
}
