import React, { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:6010/login", { username, password });
            setUser(res.data.user);
            console.log(res.headers);
            const auth = res.headers['authorization'];
            const accessParsed = auth.split(' ')[1];
            const refreshParsed = auth.split(' ')[3];
            setAccessToken(accessParsed);
            setRefreshToken(refreshParsed);
            console.log("here"+auth)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='homepage'>
            {(() => {
                if (user?.role) {
                    return (
                        <>
                        <Navbar
                            user={user}
                            setUser={setUser}
                            accessToken={accessToken}
                            refreshToken={refreshToken}
                            setAccessToken={setAccessToken}
                            setRefreshToken={setRefreshToken}/>
                        </>
                    );
                } else {
                    return (
                        <form onSubmit={handleSubmit}>
                            <h2 className='titleText'> The Ultimate PokeDex </h2>
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
                            <button id="loginButton" type="submit">LOGIN</button>
                        </form>
                    );
                }
            })()}
        </div>
    )
}

export default Login