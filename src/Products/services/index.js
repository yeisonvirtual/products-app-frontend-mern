const urlBase = 'http://localhost:8080/v1'

export const getProducts = async () => {
    
  try {

    // const response = await axios({
    //   url: `${urlBase}/products`,
    //   method: 'GET'
    // })

    const response = await fetch(`${urlBase}/products`)
      
    return response

  } catch (e) {
    console.log({ message: e.message })
  }

}

export const saveProduct = async (productData) => {
    
  try {

    // para enviar imagenes
    const formData = new FormData()

    formData.append('name', productData.name)
    formData.append('unitaryPrice', productData.unitaryPrice)
    formData.append('size', productData.size)
    formData.append('description', productData.description)
    formData.append('image', productData.image)

    const response = await fetch(`${urlBase}/products`, {
      method: "POST",
      body: formData
    })
      
    return response

  } catch (error) {
    console.log({ message: e.message })
  }

}