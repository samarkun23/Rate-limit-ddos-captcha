import './App.css'
import axios from 'axios'
import { Turnstile } from "react-turnstile"

function App() {

  return (
    <>
      <input placeholder="OTP"></input>
      <input type="text" placeholder='New password' />
      <Turnstile sitekey='' /> 
      {/* you need to put the side key  */}
      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: 'harkirat@gmail.com',
          opt: "123456",
          token: ""
        })
      }}>Update password</button>
    </>
  )
}

export default App
