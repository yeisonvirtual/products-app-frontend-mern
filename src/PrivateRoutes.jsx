import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "./requireAuth"
import { ProductLayout } from "./Products/components/ProductLayout"
import { About } from "./About"

export const PrivateRoutes = () => {
  return (
    // rutas privadas
    <Routes>
      <Route path = '/products' element={ <RequireAuth> <ProductLayout /> </RequireAuth> } />
      <Route path = '/about' element={ <RequireAuth> <About /> </RequireAuth> } />
    </Routes>
  )
}
