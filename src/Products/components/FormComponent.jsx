import { useRef, useState } from "react"
import { Form, Button } from "react-bulma-components"

const { Field, Control, Label, Input } = Form

export const FormComponent = ({ handleSubmit }) => {

  const [formValues, setFormValues] = useState({
    name: '',
    unitaryPrice: '',
    size: '',
    description: ''
  })

  const inputFileRef = useRef()

  const handleChange = (e) =>{
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value })
  }

  const _handleSubmit = (e) => {
    e.preventDefault()
    // enviar los valores de los campos y la image
    handleSubmit({...formValues, image: inputFileRef.current.files[0]})
  }

  return (
    <>
      <form onSubmit={_handleSubmit}>
        <Field>
          <Label>Name</Label>
          <Control>
            <Input 
              placeholder="Text input" 
              name="name" value={formValues.name} 
              onChange={handleChange}
            />
          </Control>
        </Field>
        <Field>
          <Label>Unitary price</Label>
          <Control>
            <Input 
              placeholder="Text input" 
              type="number"
              name="unitaryPrice" 
              value={formValues.unitaryPrice} 
              onChange={handleChange}
            />
          </Control>
        </Field>
        <Field>
          <Label>Size</Label>
          <Control>
            <Input 
              placeholder="Text input" 
              type="number"
              name="size" 
              value={formValues.size} 
              onChange={handleChange}
            />
          </Control>
        </Field>
        <Field>
          <Label>Description</Label>
          <Control>
            <Input 
              placeholder="Text input" 
              name="description" 
              value={formValues.description} 
              onChange={handleChange}
            />
          </Control>
        </Field>
        <Field>
          <Label>Image</Label>
          <Control>
            <input type="file" ref={inputFileRef} />
          </Control>
        </Field>

        <Button onClick={handleSubmit} color="primary">Save</Button>

      </form>
    </>
  )
}
