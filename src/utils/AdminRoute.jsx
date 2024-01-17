import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { Message } from "react-bulma-components";

export const AdminRoute = () => {

  const { user } = useContext(UserContext);

  // si el usuario no es admin
  if (user.type!=='admin') {
    // cuando accedo desde la url me envia aca
    return <Navigate to={'/products'} replace />
  }

  // si el usuario es admin sigue con la ruta deseada
  return <Outlet />

}