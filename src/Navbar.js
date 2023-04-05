import { Link, Routes, Route } from "react-router-dom";
import Search from './search';

function Navbar({ user, setUser, accessToken, refreshToken, setAccessToken, setRefreshToken }) {
    return (
        <>
            <nav>
                <h3>POKEDEX</h3>
                <ul>
                    <li>
                        <Link to="/search">SEARCH</Link>
                    </li>
                    {user?.role === 'admin' ? 
                    (
                        <li>
                            <Link to="/dashboard">DASHBOARD</Link>
                        </li>
                    ) : null}

                </ul>
                {/* <Logout
                    setUser={setUser}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                    setAccessToken={setAccessToken}
                    setRefreshToken={setRefreshToken}
                /> */}
            </nav>

            <Routes>
                <Route path="/" element={<Search
                    user={user}
                    setUser={setUser}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                    setAccessToken={setAccessToken}
                    setRefreshToken={setRefreshToken}
                />} />
                <Route path="/search" element={<Search
                    user={user}
                    setUser={setUser}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                    setAccessToken={setAccessToken}
                    setRefreshToken={setRefreshToken}
                />} />
            </Routes>
        </>
    );
}
export default Navbar