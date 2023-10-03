import { Typography, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

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
      <Typography><h3>Profile Page</h3></Typography>
      <Paragraph>
        Welcome, <b>{username}!</b>
      </Paragraph>
      <Paragraph>
        Thank you for trying out SouthTrack React Application. This react application is under continuous development. As I dive even deeper into the world of frontend engineering 😁
      </Paragraph>
      <Paragraph>
        For more information on the technicalities of this application, you can visit <a href="https://github.com/audiprevio/southTrackReactv001">SouthTrack's GitHub Repo.</a>
      </Paragraph>
      <Button type="primary" onClick={handleLogout}>Logout</Button>
      <Divider />
      <Paragraph>
        Made with love by <a href="https://www.linkedin.com/in/audi-previo/">Audi Previo</a>
      </Paragraph>
    </div>
  );
};

export default ProfilePage;
