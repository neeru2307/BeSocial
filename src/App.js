
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Leftbar from './Components/Leftbar/Leftbar'
import Rightbar from './Components/Rightbar/Rightbar'
import "./styles.scss"
import { useContext } from 'react';
import { DarkModeContext } from './Context/darkModeContext';
import { AuthContext } from './Context/authContext';

function App() {

  const {currentUser} = useContext(AuthContext); 
  
  const {darkMode} = useContext(DarkModeContext)

  const Layout = () => {
    return(
      <div className={`theme-${darkMode? "dark": "light"}`}>
        <Navbar/>
        <div style={{display: "flex"}}>
          <Leftbar/>
          <div style={{flex:"6"}}>
          <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to = "/login/"/>
    }

    return children
  } 

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>, 
      children: [
        {
          path:"/", 
          element: <Home/>
        },
        {
          path:"/profile/:id", 
          element: <Profile/>
        }
      ]
    },
    {
      path: "/login", 
      element: <Login/>
    }, 
    {
      path: "/register", 
      element: <Register/>
    }
  ])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  );
}

export default App;
