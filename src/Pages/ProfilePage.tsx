import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <br />
      <br />
      <Title>Profile Page</Title>
      <Paragraph>
        Welcome, {username}!
      </Paragraph>
      <Button type="primary" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default ProfilePage;
