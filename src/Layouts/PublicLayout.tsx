// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Outlet } from "react-router-dom"
// import NavBar from "../components/NavBar"

// const PublicLayout = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checker = localStorage.getItem('jwt');
//         if (!checker) {
//             navigate('/login');
//         }
//     }, []); 

//     return (
//         <div style={{ position: 'relative', height: '100vh' }}>
//             <div className="nav-container NavBar" style={{ position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', minWidth: '20rem', width: '22vw', height: '100vh', backgroundColor: 'white' }}>
//                 <NavBar />
//                 <Outlet />
//             </div>
//         </div>
//     )    
// }

// export default PublicLayout;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { useState } from 'react';
import NavBar from '../components/NavBar'; 
import AddPenguinForm from '../Containers/AddPenguinContainer';
import MapComponent from "../Containers/MapContainer"
import SouthTrackInfoCard from '../components/SouthTrackInfoCard';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainPage from '../Pages/MainPage';
import ProfilePage from '../Pages/ProfilePage';

const PublicLayout = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checker = localStorage.getItem('jwt');
    if (!checker) {
      navigate('/login');
    }
  }, []);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Button type="primary" className="buttonOpen" onClick={toggleDrawer} style={{ height: '100vh', position: 'fixed', zIndex: 1000, right: 0, borderRadius: 0, border: 0, backgroundColor: 'white', color: '#0f7fd4', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
        {visible ? '»' : '«'}
      </Button>
      <Drawer
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
        style={{ height: '100', zIndex: '1002'}}
        className="Drawer"
      >
        <NavBar />
        <Routes>
          <Route path="/*" index element={<MainPage />} />
          <Route path="add-penguin/*" element={<AddPenguinForm />} />
          <Route path="profile/*" element={<ProfilePage />} />
        </Routes>
      </Drawer>
      <SouthTrackInfoCard />
      <div style={{ width: '100vw' }}>
        <MapComponent />
      </div>
      <Outlet />
    </div>
  );
}

export default PublicLayout;
