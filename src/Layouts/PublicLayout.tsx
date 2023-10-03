import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom"
import MapComponent from "../Containers/MapContainer"
import NavBar from "../components/NavBar"

const PublicLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checker = localStorage.getItem('jwt');
        if (!checker) {
            navigate('/login');
        }
    }, []); 

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: 'transparent' }}>
            <div style={{ width: '75vw' }}>
                <MapComponent />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: '320px', width: '25vw', height: '100vh', overflow: 'scroll', backgroundColor: 'transparent' }}>
                <div>
                    <NavBar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )    
}

export default PublicLayout;
