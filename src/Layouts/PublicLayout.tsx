
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
    <div style={{ position: 'relative' }}>
      <SouthTrackInfoCard />
      <Button type="primary" className="buttonOpen" onClick={toggleDrawer} style={{ height: '100%', position: 'fixed', zIndex: 1000, right: 0, borderRadius: 0, border: 0, backgroundColor: 'white', color: '#0f7fd4', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
        {visible ? '»' : '«'}
      </Button>
      <Drawer
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        visible={visible}
        mask={false}
        style={{ height: '100%', zIndex: '1002'}}
        className="Drawer"
      >
        <NavBar />
        <Routes>
          <Route path="/*" index element={<MainPage />} />
          <Route path="add-penguin/*" element={<AddPenguinForm />} />
          <Route path="profile/*" element={<ProfilePage />} />
        </Routes>
      </Drawer>
      <div style={{ width: '100vw', height: '100vh', overscrollBehavior: 'none' }}>
        <MapComponent />
      </div>
      <Outlet />
    </div>
  );
}

export default PublicLayout;
