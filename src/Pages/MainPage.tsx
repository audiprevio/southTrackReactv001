import MainPenguinManipulatorComponent from '../Containers/MainPenguinContainer';
import AddPenguinForm from '../Containers/AddPenguinContainer';
import { Route, Routes } from 'react-router-dom';

const MainPage = () => {
  return (
    <Routes>
      <Route index element={<MainPenguinManipulatorComponent />} />
      <Route path="/add-penguin" element={<AddPenguinForm />} />
    </Routes>
  );
};

export default MainPage;
