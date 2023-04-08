import { Link, Routes, Route } from "react-router-dom";
import SearchPage from './SearchPage';
import Dashboard from './Dashboard';
import Logout from './Logout';

function Navbar({ user, setUser, accessToken, refreshToken, setAccessToken, setRefreshToken }) {
    return (
        <>
            <nav>
                <h3>test ttest POKEDEX</h3>
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
                <Logout
                    setUser={setUser}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                    setAccessToken={setAccessToken}
                    setRefreshToken={setRefreshToken}
                />
            </nav>

            <Routes>
                <Route path="/" element={<SearchPage
                    user={user}
                    setUser={setUser}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                    setAccessToken={setAccessToken}
                    setRefreshToken={setRefreshToken}
                />} />
                <Route path="/search" element={<SearchPage
                    user={user}
                    setUser={setUser}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                    setAccessToken={setAccessToken}
                    setRefreshToken={setRefreshToken}
                />} />
                <Route path="/dashboard" element={<Dashboard
                    user={user}
                    setUser={setUser}
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                    setAccessToken={setAccessToken}
                    setRefreshToken={setRefreshToken} />} />
            </Routes>
        </>
    );
}
export default Navbar;