const urlBase = 'http://localhost:8080/v1'

const getProducts = async () => {
    
  try {

    const response = await fetch(`${urlBase}/allproducts`,{
      credentials: 'include',
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }

}

const getProductsUser = async () => {
    
  try {

    const response = await fetch(`${urlBase}/products`,{
      credentials: 'include',
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }

}

const saveProduct = async (productData) => {
    
  try {

    // para enviar imagenes
    const formData = new FormData();

    const unitaryPrice = await Number(productData.unitaryPrice);
    const size = await Number(productData.size);

    formData.append('name', productData.name);
    formData.append('unitaryPrice', unitaryPrice);
    formData.append('size', size);
    formData.append('description', productData.description);
    formData.append('image', productData.image);
    formData.append('user', productData.user);

    const response = await fetch(`${urlBase}/products`, {
      method: "POST",
      credentials: 'include',
      body: formData
    });

    console.log(await response.json());
      
    return response

  } catch (error) {
    console.log({ message: e.message });
  }

}

const deleteProduct = async (productID) => {
    
  try {

    const data = JSON.stringify({
      "productID": productID
    });

    const response = await fetch(`${urlBase}/deleteproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: data
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
  deleteProduct
}