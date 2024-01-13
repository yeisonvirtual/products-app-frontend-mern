const urlBase = 'http://localhost:8080/v1/users'

const getUser = async (userID) => {
    
  try {

    const response = await fetch(`${urlBase}/${userID}`,{
      credentials: 'include'
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }
}

const getUsers = async (page, formValues) => {

  console.log('page:' ,page)
  console.log('formvalues:' ,formValues)
    
  try {

    const response = await fetch(`${urlBase}?limit=5&page=${page}&field=${formValues.field}&value=${formValues.query}`,{
      credentials: 'include'
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }
}

const deleteUser = async (userID) => {
    
  try {

    const response = await fetch(`${urlBase}/delete/${userID}`,{
      method: 'POST',
      credentials: 'include'
    });
      
    return response;

  } catch (e) {
    console.log({ message: e.message });
  }
}

const updateUser = async (userData) => {

  const data = JSON.stringify(userData);
    
  try {

    const response = await fetch(`${urlBase}/update/${userData.id}`,{
      method: 'POST',
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
  getUser,
  getUsers,
  deleteUser,
  updateUser
}