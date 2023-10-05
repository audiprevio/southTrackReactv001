import { Card, Divider } from 'antd';
import southT from '../assets/southTrack.svg';

const SouthTrackInfoCard = () => {
  return (
    <Card
      style={{ 
        position: 'absolute',
        bottom: '1rem',
        left: '0.625rem',
        zIndex: '1000',
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
        <Card.Meta description={<span>SouthTrack simulates a penguin tracking REST API on a <a href="https://leafletjs.com/">Leaflet-React 🇺🇦</a> Frontend and MongoDB for the database.</span>} />
      </div>
    </Card>
  );
};

export default SouthTrackInfoCard;
