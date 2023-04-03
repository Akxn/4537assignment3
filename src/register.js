import {useEffect, useState} from "react"
import axios from "axios"
import './register.css'

const register = async (username, password, email, userType = "User") => {
    const BASE_AUTH_API_URL = "http://localhost:6060/"
    return await axios.post(`${BASE_AUTH_API_URL}register`, {
        username, password, email, userType
    })
}

function RegisterPage ({setLogin}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setAdminFlag] = useState(false)

    const [showErr, setShowErr] = useState(false)

    const onSubmit = async () => {
        try {
            const registerRes = await register(username, password, email, isAdmin ? "Admin" : "User")
            console.log('registerRes', registerRes)
            setLogin(undefined)
        } catch (err) { 
            setShowErr(true)
        }
    }

    return (
        <>
        <div class ="login-form">
            <label>
                Username:
                <input type="text" name="username" onChange={(e) => {setUsername(e.target.value.trim().toLowerCase())}}/>
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={(e) => {setPassword(e.target.value.trim().toLowerCase())}}/>
            </label>
            <label>
                Email:
                <input type="text" name="email" onChange={(e) => {setEmail(e.target.value.trim().toLowerCase())}}/>
            </label>
            <input type="checkbox" id="isAdmin" name="isAdmin" value="Boat" onClick={() => {setAdminFlag(!isAdmin)}}/>
            <label htmlFor="isAdmin"> Administrator</label>

            <button type="button" value="Submit" onClick={onSubmit}>Register</button>
            <button type="button" value="Login" onClick={() => {setLogin(undefined)}}>Login</button>
            {showErr && <span>Oh NO! Please try again</span>}
            </div>
        </>
    )
}

export default RegisterPage