import { Link, NavLink, Navigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { logout } from "../Auth/services/auth";
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navbar } from "react-bulma-components";
import Logo from "../assets/images/logo.png"

export const NavBar = () => {

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(UserContext);
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
      setUser({})
      setIsAuthenticated(false)
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
        <Navbar.Burger />
      </Navbar.Brand>

      <Navbar.Menu>

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
                    <Navbar.Item>
                      Name: {user.name}
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
