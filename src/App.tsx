// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Drawer, Button } from 'antd';
// import { useState } from 'react';
// import LoginPage from './Pages/LoginPage';
// import RegisterPage from './Pages/RegisterPage';
// import MainPage from './Pages/MainPage';
// import ProfilePage from './Pages/ProfilePage';
// import SouthTrackInfoCard from './components/SouthTrackInfoCard';
// // import PublicLayout from './Layouts/PublicLayout';
// import NavBar from './components/NavBar'; 
// import AddPenguinForm from './Containers/AddPenguinContainer';
// import MapComponent from "./Containers/MapContainer"

// //JWT AUTH IS FAILING DUE TO NO LAYOUT

// function App() {
//   const [visible, setVisible] = useState(false);

//   const toggleDrawer = () => {
//     setVisible(!visible);
//   };

//   return (
//     <Router>
//       <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: 'transparent', flexDirection: 'column' }}>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/*" element={
//             <div>
//               <Button type="primary" className="buttonOpen" onClick={toggleDrawer} style={{ height: '100vh', position: 'fixed', zIndex: 1000, right: 0, borderRadius: 0, border: 0, backgroundColor: 'white', color: '#0f7fd4', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
//                 {visible ? '»' : '«'}
//               </Button>
//               <Drawer
//                 placement="right"
//                 closable={false}
//                 onClose={toggleDrawer}
//                 visible={visible}
//                 mask={false}
//                 style={{ height: '100', zIndex: '1002'}}
//                 className="Drawer"
//               >
//                 <Button type="primary" className="buttonClose"onClick={toggleDrawer} style={{ height: '100vh', position: 'fixed', zIndex: 1000, right: '23.625rem', top: 0, borderRadius: 0, border: 0, backgroundColor: 'white', color: '#0f7fd4', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
//                   {visible ? '»' : '«'}
//                 </Button>
//                 <div className="nav-container NavBar" style={{ position: 'absolute', top: 0, display: 'flex', flexDirection: 'column', minWidth: '100%', width: '100%;', backgroundColor: 'white' }}>
//                 <NavBar />
//                 </div>
//                 <Routes>
//                   <Route index element={<MainPage />} />
//                   <Route path="add-penguin" element={<AddPenguinForm />} />
//                   <Route path="profile" element={<ProfilePage />} />
//                 </Routes>
//               </Drawer>
//               <SouthTrackInfoCard />
//                <div style={{ width: '100vw' }}>
//                 <MapComponent />
//               </div>
//             </div>
//           }/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PublicLayout from './Layouts/PublicLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

