import { Card, Divider } from 'antd';
import southT from '../assets/southTrack.svg';

const SouthTrackInfoCard = () => {
  return (
    <Card
      style={{ 
        position: 'fixed',
        bottom: '1rem',
        zIndex: '1000',
        left: '0.625rem',
        paddingTop: '0.5rem',
        paddingRight: '0.75rem',
        paddingLeft: '0.75rem',
        paddingBottom: '0.75rem',
        maxWidth: '15rem',
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
        <img alt="South Track" src={southT} style={{ height: '2rem'}}/>
        <Divider style={{ margin: '0.625rem 0'}} />
        <Card.Meta description={<p style={{color: '#666666' }}>SouthTrack simulates a penguin tracking REST API on a <a style={{ textDecoration: 'underline' }} href="https://leafletjs.com/">Leaflet-React 🇺🇦</a> Frontend and MongoDB for the database.</p>} />
      </div>
    </Card>
  );
};

export default SouthTrackInfoCard;
