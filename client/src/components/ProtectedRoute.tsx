import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const ProtectedRoute = () => {
  return (
  <>
     <Navbar/>
    <Outlet/>
  </>
  )
}

export default ProtectedRoute