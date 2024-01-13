import { Route, Routes } from 'react-router-dom';
import { Login } from './Auth/components/Login';
import { ProtectedRoute } from "./utils/ProtectedRoute"
import { ProductLayout } from "./Products/components/ProductLayout"
import { Register } from './Auth/components/Register';
import { MyProducts } from './Products/components/MyProducts';
import { About } from './components/About';
import { EditProduct } from './Products/components/EditProduct';
import { Profile } from './Users/components/Profile';
import { Users } from './Users/components/Users';
import { ProfileUser } from './Users/components/ProfileUser';
import { EditUser } from './Users/components/EditUser';

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
            <Route path = '/profile' element={ <Profile />  } />
            
            <Route path = '/users' element={ <Users />  } />
            <Route path = '/users/:id' element={ <ProfileUser />  } />
            <Route path = '/users/edit/:id' element={ <EditUser />  } />

          </Route>

          <Route path="/*" element={ <Login /> } />

    </Routes>
  )
}
