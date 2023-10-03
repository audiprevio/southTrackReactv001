import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import MainPage from './Pages/MainPage';
import ProfilePage from './Pages/ProfilePage';
import PublicLayout from './Layouts/PublicLayout'; 
import AddPenguinForm from './Containers/AddPenguinContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<PublicLayout />}>
          <Route index element={<MainPage />} />
          <Route path="add-penguin" element={<AddPenguinForm />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
