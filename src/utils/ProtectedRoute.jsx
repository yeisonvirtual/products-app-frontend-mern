import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { Message } from "react-bulma-components";

export const ProtectedRoute = () => {

  const { isLoading, isAuthenticated } = useContext(UserContext);
  
  // Si esta cangando
  if (isLoading) {
    return (
      <Message color="warning">
        <Message.Header>
          <span>Loading...</span>
        </Message.Header>
      </Message>
    )
  }

  // si no esta cargando y no esta autenticado redirecciona
  if (!isLoading && !isAuthenticated) {
    // cuando accedo desde la url me envia aca
    return <Navigate to={'/login'} replace />
  }

  // si no esta cargando y esta autenticado sigue con la ruta deseada
  return <Outlet />

}
