import { UserProvider } from "./context/UserProvider"
import { NavBar } from "./components/NavBar"
import { AppRoutes } from "./AppRoutes"
import { FooterComponent } from "./components/FooterComponent"

export const App = () => {

  return (
    <>
      <UserProvider>
        
        <NavBar></NavBar>

        <AppRoutes />

        <FooterComponent />
        
      </UserProvider>
    </>
  )
}
