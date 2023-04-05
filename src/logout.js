import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";

const axiosJWT = axios.create()

function Logout({ setUser, accessToken, refreshToken, setAccessToken, setRefreshToken }) {
    const [loading, setLoading] = useState(false);
    const [showLogoutButton] = useState(true);
    const nav = useNavigate();

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const newAccessToken = await refreshAccessToken();
                config.headers['Authorization'] = newAccessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    const refreshAccessToken = async () => {
        try {
            const res = await axios.post("http://localhost:6001/requestNewAccessToken", {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken} Refresh ${refreshToken}`
                }
            });
            console.log("refresh token requested");
            const authHeader = res.headers["authorization"];
            setAccessToken(authHeader.split(" ")[1]);
            setRefreshToken(authHeader.split(" ")[3]);
            return authHeader;
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await axiosJWT.post('http://localhost:6001/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken} Refresh ${refreshToken}`
                }
            })
            if(res.status === 200) {
                setLoading(false);
                setAccessToken(null);
                setRefreshToken(null);
                setUser(null);
                nav("/");
            }else{
                throw new Error("Logout failed")
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    return (
        showLogoutButton &&  (
            <button className="logout-button" onClick={handleLogout} disabled={loading}>
                {loading ? 'Logging out...' : 'LOGGEDOUT'}
            </button>
        )
        
    );
}

export default Logout;