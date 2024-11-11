import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import VerificationToken from "./pages/verificationToken"
import { useState } from "react"

function App() {

  const [id, setID] = useState("")
  console.log("final id :", id);



  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-user" element={<VerificationToken />} />
        <Route path="/forget-password" element={<ForgetPassword value={{ id, setID }} />} />
        <Route path="/reset-password/:id" element={<ResetPassword value={{ id }} />} />
        <Route path="/home" element={<span>Home</span>} />
        <Route path="*" element={<span>404 not found</span>} />
      </Routes>
    </div>
  )
}

export default App
