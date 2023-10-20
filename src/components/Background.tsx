import backgroundImage from '../assets/bg.webp';

const Background = () => {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      overflow: 'none'
    }} />
  );
};

export default Background;
