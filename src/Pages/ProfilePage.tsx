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
    <div style ={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '4rem'}}>
      <Typography><h3>Welcome, <b>{username}!</b></h3></Typography>
      <Paragraph>
        It's time for you to save the penguins.
      </Paragraph>
      <Button className="primarybtn" type="primary" onClick={handleLogout} style={{ width: '100%' }} >Logout</Button>
      <Divider />
      <Paragraph>
        Creator's Note:
      </Paragraph>
      <Paragraph>
        Thank you for trying out SouthTrack React Application. This is my first-ever fullstack web application.
      </Paragraph>
      <Paragraph>
      As I dive even deeper into the world of frontend engineering, I will develop this app or some other mutations of this leaflet-based app 😁
      </Paragraph>
      <Paragraph>
        For more information on the technicalities of this application, you can visit <a href="https://github.com/audiprevio/southTrackReactv001">SouthTrack's GitHub Repo.</a>
      </Paragraph>
      <Divider />
      <Paragraph>
        Made with love by <a href="https://www.linkedin.com/in/audi-previo/">Audi Previo</a>
      </Paragraph>
    </div>
  );
};

export default ProfilePage;
