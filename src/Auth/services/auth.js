const urlBase = 'http://localhost:8080/v1/auth-token'

export const register = async (userData) => {
    
  try {

    const data = JSON.stringify(userData);

    const response = await fetch(`${urlBase}/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: data
    });

    console.log(response)
      
    return response

  } catch (error) {
    console.log({ message: error.message });
  }

}

export const login = async (userData) => {
    
  try {

    const data = JSON.stringify(userData);

    const response = await fetch(`${urlBase}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: data
    });
      
    return response

  } catch (error) {
    console.log({ message: error.message })
  }

}

export const logout = async () => {
    
  try {

    const response = await fetch(`${urlBase}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
      
    return response

  } catch (error) {
    console.log({ message: error.message })
  }

}

export const verifyTokenRequest = async () => {
    
  try {

    const response = await fetch(`http://localhost:8080/v1/verify`,{
      credentials: 'include',
    })
      
    return response

  } catch (e) {
    console.log({ message: e.message })
  }

}