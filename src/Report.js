import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import customTable from './customTable';
import customChart from './customChart';

function Report({ id, accessToken, setAccessToken, refreshToken, setRefreshToken }) {
    const [reportTable, setReportTable] = useState('');
    const axiosJWT = axios.create()

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
    );

    const refreshAccessToken = async () => {
        try {
            const res = await axios.post("http://localhost:6010/requestNewAccessToken", {}, {
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

    useEffect(() => {
        const start = async () => {
            try {
                console.log(accessToken);
                const res = await axiosJWT.get(`http://localhost:6010/report?id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken} Refresh ${refreshToken}`
                    }
                })
                setReportTable(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        start();
    }, [id]);

    if(id == 1){
        return (<customChart id={id} reportTable={reportTable} />)
    }else if(id == 2){
        return (<customChart id={id} reportTable ={reportTable} />)
    }else if(id == 3){
        return (<customTable id={id} header1="Endpoint" header2="User" header3="Count" reportTable ={reportTable} />)
    }else if(id == 4) {
        return (<customTable id={id} header1="Endpoint" header2="Status" header3="Count" reportTable={reportTable} />)
    }else if(id == 5){
        return (<customTable id={id} header1="Date" header2="Method" header3="Status" reportTable={reportTable} />)
    }


}

export default Report