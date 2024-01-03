import { Route, Routes } from 'react-router-dom';
import { Login } from './Auth/components/Login';
import { ProtectedRoute } from "./utils/ProtectedRoute"
import { ProductLayout } from "./Products/components/ProductLayout"
import { Register } from './Auth/components/Register';
import { MyProducts } from './Products/components/MyProducts';
import { About } from './components/About';
import { EditProduct } from './Products/components/EditProduct';

export const AppRoutes = () => {

  return (
    <Routes>

          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path = '/about' element={ <About />  } />

          <Route element={ <ProtectedRoute />  }>
            <Route path = '/products' element={ <ProductLayout />  } />
            <Route path = '/myproducts' element={ <MyProducts />  } />
            <Route path = '/myproducts/:id' element={ <EditProduct />  } />
          </Route>

          <Route path="/*" element={ <Login /> } />

    </Routes>
  )
}
