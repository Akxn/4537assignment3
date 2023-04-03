import React, {useState} from "react";
import axios from "axios";
import './login.css'

const login = async (username, password) => {
    const BASE_AUTH_API_URL = "http://localhost:3000/"
    return await axios.post(`${BASE_AUTH_API_URL}login`, {
        username, password
    })
}

function LoginPage({setLogin}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [showErr, setShowErr] = useState(false)

    const onSubmit = async () => {
        try {
            const loginRes = await login(username, password)
            setLogin(loginRes.data.userType)
            document.cookie = `userType=${loginRes.data.userType}`
            document.cookie = `token=${loginRes.data.token}`
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
            <button type="button" value="Submit" onClick={onSubmit}>Submit</button>
            <button type="button" value="Register" onClick={() => {setLogin("register")}}>Register</button>
            {showErr && <span>Oh No!!Please try again</span>}
            </div>
        </>
    )
}

export default LoginPage;