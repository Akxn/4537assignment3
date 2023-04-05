import React, { useState } from "react";
import axios from "axios";
import './login.css'


function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({});
    // const [showErr, setShowErr] = useState(false)
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8008/login", { username, password });
            setUser(response.data.user);
            console.log(response.headers);
            const auth = response.headers['authorization'];
            const accessFilter = auth.split(' ')[1];
            const refreshFilter = auth.split(' ')[3];
            setAccessToken(accessFilter);
            setRefreshToken(refreshFilter);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='landing'>
                {user?.role ? (
                    <NavbarComponent
                        user={user}
                        setUser={setUser}
                        accessToken={accessToken}
                        refreshToken={refreshToken}
                        setAccessToken={setAccessToken}
                        setRefreshToken={setRefreshToken} />
                ) : (
                    <form onSubmit={onSubmit}>
                        <h1 className='title'> POKEDEX </h1>
                        <br />
                        <input
                            id="username-input"
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <input
                            id="password-input"
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button id="login-button" type="submit">LOGIN</button>
                    </form>
                )}
            </div>
        </>
    )
}

export default LoginPage;