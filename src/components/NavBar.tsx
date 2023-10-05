import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Penguin List',
    key: '/',
  },
  {
    label: 'Add Penguin',
    key: '/add-penguin',
  },
  {
    label: 'Profile',
    key: '/profile',
  },
];

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    if (e.key === '/logout') {
      localStorage.removeItem('jwt');
      navigate('/login');
    } else {
      navigate(e.key);
    }
  };

  return (
    <Menu 
      className="nav-menu navBar" // apply the navBar class
      onClick={onClick} 
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} 
      style={{ 
        position: 'fixed', 
        marginBottom: '2rem',
        zIndex: '1000',
        minWidth: '18rem',
        width: '100%', 
      }}
    />
  );
};

export default NavBar;
