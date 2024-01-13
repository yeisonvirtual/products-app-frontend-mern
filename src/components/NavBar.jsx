import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { logout } from "../Auth/services/auth";
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";
import { Navbar } from "react-bulma-components";
import Logo from "../assets/images/logo.png";

export const NavBar = () => {

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const userData = async () =>{

      const token = Cookies.get('token');

      if(token!==undefined) {

        setIsAuthenticated(true);
        
      }
    }

    userData();

  }, []);

  const handleLogout = async (e) =>{
    
    const response = await logout();

    if (response.status === 201) {
      setUser({});
      setIsAuthenticated(false);
      navigate('/login');
    }
    
  }

  return (

    <Navbar>

      <Navbar.Brand>
        <Navbar.Item href="/products">
          <img
            alt="Logo"
            src={Logo}
            width="40"
          />
        </Navbar.Item>
        <Navbar.Item href="/products">
          <h1>Products App</h1>
        </Navbar.Item>
        <Navbar.Burger onClick={()=>{ setIsOpen(!isOpen)} } className={`${isOpen ? 'is-active' : ''}`}/>
      </Navbar.Brand>

      <Navbar.Menu className={`${isOpen ? 'is-active' : ''}`}>

        <Navbar.Container>

          {
            !isAuthenticated && (
              <>
                <Navbar.Item href="/login">
                  Login
                </Navbar.Item>
                <Navbar.Item href="/register">
                  Register
                </Navbar.Item>
              </>
            )
          }

          {
            isAuthenticated && (
              <>
                <Navbar.Item href="/products">
                  Products
                </Navbar.Item>
              </>
            )
          }

          {
            isAuthenticated && user.type==='admin' && (
              <>
                <Navbar.Item href="/users">
                  Users
                </Navbar.Item>
              </>
            )
          }

          <Navbar.Item href="/about">
            About
          </Navbar.Item>
          
        </Navbar.Container>

        {
          isAuthenticated && (
            <>
              <Navbar.Container align="right">
                <Navbar.Item hoverable>
                  <Navbar.Link>{user.email}</Navbar.Link>
                  <Navbar.Dropdown>
                    <Navbar.Item href="/profile">
                      My profile
                    </Navbar.Item>
                    <Navbar.Item href="/myproducts">
                      My products
                    </Navbar.Item>
                    <Navbar.Divider />
                    <Navbar.Item onClick={ handleLogout }>
                      Logout
                    </Navbar.Item>
                  </Navbar.Dropdown>
                </Navbar.Item>
              </Navbar.Container>
            </>
          )
        }

      </Navbar.Menu>
    </Navbar>

    // <nav>
    //   <Link to="/products">Products App</Link>
    //   <ul>
    //     {
    //       !isAuthenticated && (
    //         <>
    //           <NavLink to="/login">Login</NavLink>
    //           <NavLink to="/register">Register</NavLink>
    //         </>
    //       )
    //     }
    //     {
    //       isAuthenticated && (
    //         <>
    //           <NavLink to="/products">Products</NavLink>
    //           <NavLink to="/" onClick={ handleLogout }>Logout</NavLink>
    //         </>
    //       )
    //     }
    //   </ul>
    //   <h1>{user.name}</h1>
    // </nav>
  )
}
