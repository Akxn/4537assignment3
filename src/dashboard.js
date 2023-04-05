import React from 'react'
import Report from './Report';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, setUser, accessToken, refreshToken, setAccessToken, setRefreshToken }) {
    const reports = [
        { id: 1, title: "Unique API Users Over a Period of Time" },
        { id: 2, title: "Top API Users Over Period of Time" },
        { id: 3, title: "Top Users for Each Endpoint" },
        { id: 4, title: "4xx Errors By Endpoint" },
        { id: 5, title: "4xx/5xx Errors" },
    ];

    return (
        <div>
            <h3 className='title-h3'>API Dashboard</h3>
            {user?.role === 'admin' ? (
                <div className="chart-container">
                    {reports.map((report) => (
                        <div className="chart" key={report.id}>
                            <h3>{report.title}</h3>
                            <Report
                                id={report.id}
                                accessToken={accessToken}
                                setAccessToken={setAccessToken}
                                refreshToken={refreshToken}
                                setRefreshToken={setAccessToken}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <h2>Sorry, you are not authorized to view this page</h2>
            )}
        </div>
    );
}

export default Dashboard