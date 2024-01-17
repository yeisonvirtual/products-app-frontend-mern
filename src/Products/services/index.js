const urlBase = 'http://localhost:8080/v1/products'

const saveProduct = async (productData) => {

  if (!productData.name || !productData.unitaryPrice || !productData.image) {
    const response = {
      message: 'Faltan datos'
    }
    return response
  }
    
  try {

    // para enviar imagenes
    const formData = new FormData();

    const unitaryPrice = await Number(productData.unitaryPrice);

    formData.append('name', productData.name);
    formData.append('unitaryPrice', unitaryPrice);
    if (productData.size) {
      formData.append('size', size);
    }
    formData.append('description', productData.description);
    formData.append('image', productData.image);
    formData.append('user', productData.user);

    const response = await fetch(`${urlBase}`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
      
    return response

  } catch (e) {
    console.log({ message: e.message });
  }

}

const getProducts = async () => {
    
  try {

    const response = await fetch(`${urlBase}`,{
      credentials: 'include',
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }

}

const getProductsUser = async () => {
    
  try {

    const response = await fetch(`${urlBase}/myproducts/`,{
      credentials: 'include',
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }

}

const getProduct = async (productID) => {

  try {

    const response = await fetch(`${urlBase}/myproducts/${productID}`,{
      credentials: 'include',
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }

}

const updateProduct = async (productData) => {
    
  try {

    const data = JSON.stringify(productData);

    const response = await fetch(`${urlBase}/update/${productData.id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: data
    });
      
    return response

  } catch (e) {
    console.log({ message: e.message });
  }

}

const deleteProduct = async (productID) => {
    
  try {

    const response = await fetch(`${urlBase}/delete/${productID}`, {
      method: "POST",
      credentials: 'include'
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }

}

export {
  getProducts,
  getProductsUser,
  saveProduct,
  getProduct,
  updateProduct,
  deleteProduct
}