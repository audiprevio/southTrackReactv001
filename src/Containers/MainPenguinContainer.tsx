// import { useState, useEffect, useCallback } from 'react';
// import PenguinCard from '../components/PenguinCard';
// import { message, Typography, Divider, Skeleton, Select } from 'antd';

// const { Option } = Select;

// interface Penguin {
//   penguinName: string;
//   lastPosition: number[];
//   lastUpdate: string;
//   speciesName: string;
//   ageAtTagging: string;
//   taggedPosition: string;
//   taggedTime: string;
//   taggedBy: string;
//   _id: string;
// }

// const MainPenguinManipulatorContainer = () => {
//   const [data, setData] = useState<Penguin[] | null>(null);
//   const [filteredData, setFilteredData] = useState<Penguin[] | null>(null);

//   const fetchPenguins = useCallback(async () => {
//     try {
//       const response = await fetch('https://penguintrackerapi.fly.dev/admin/penguins');
//       if (!response.ok) {
//         throw new Error('Failed to fetch penguin data.');
//       }
//       const data = await response.json();
//       setData(data);
//       setFilteredData(data);
//     } catch (error) {
//       message.error('An error occurred while fetching penguin data. Please try again.');
//     }
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(`https://penguintrackerapi.fly.dev/admin/penguins/softdeletepenguin/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('jwt')}`
//         },
//         body: JSON.stringify({ _id: id })
//       });
  
//       if (response.ok) {
//         message.success('Penguin tracking deactivated successfully. Refreshing the map...');
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       } else {
//         message.error('Failed to deactivate tracking due to server error.');
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   };

//   const handleFilterByAge = (value: string) => {
//     if (!data) return;

//     if (value === 'All') {
//       setFilteredData(data);
//     } else {
//       const filteredPenguins = data.filter((penguin) =>
//         penguin.ageAtTagging.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredData(filteredPenguins);
//     }
//   };

//   useEffect(() => {
//     fetchPenguins();
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
//       <div style={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '2.5rem' }}>
//         <Typography>
//           <h3>Penguin List</h3>
//         </Typography>
//         <Typography>
//           <p>See all tracked penguins, update their movements, or deactivate the tracking.</p>
//         </Typography>
//         <Divider />
//         <Typography style={{ color: '#333'}}><p>Note: Deactivated penguin is not deleted from database. However, their name cannot be reused in new tracking.</p></Typography>
//         <Divider />
//         <Select
//           defaultValue="Select Filter by Age At Tagging"
//           style={{ width: '100%' }}
//           onChange={handleFilterByAge}
//         >
//           <Option value="All">All</Option>
//           <Option value="Adult">Adult</Option>
//           <Option value="Teen">Teen</Option>
//         </Select>
//       </div>
//       {filteredData ? (
//         filteredData.map((penguin, index) => (
//           <PenguinCard key={index} penguin={penguin} onDelete={handleDelete} onUpdate={() => {}} />
//         ))
//       ) : (
//         <Skeleton key="skeleton1" active style={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '3rem' }} />
//       )}
//     </div>
//   );
// };

import { useState, useEffect, useCallback } from 'react';
import PenguinCard from '../components/PenguinCard';
import DeactivatePenguinModal from '../components/DeactivatePenguinModal';
import { message, Typography, Divider, Skeleton, Select } from 'antd';

const { Option } = Select;

interface Penguin {
  penguinName: string;
  lastPosition: number[];
  lastUpdate: string;
  speciesName: string;
  ageAtTagging: string;
  taggedPosition: string;
  taggedTime: string;
  taggedBy: string;
  _id: string;
}

const MainPenguinManipulatorContainer = () => {
  const [data, setData] = useState<Penguin[] | null>(null);
  const [filteredData, setFilteredData] = useState<Penguin[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPenguin, setSelectedPenguin] = useState<string | null>(null);

  const fetchPenguins = useCallback(async () => {
    try {
      const response = await fetch('https://penguintrackerapi.fly.dev/admin/penguins');
      if (!response.ok) {
        throw new Error('Failed to fetch penguin data.');
      }
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      message.error('An error occurred while fetching penguin data. Please try again.');
    }
  }, []);

  const handleDelete = async (id: string, secretKey: string) => {
    try {
      const response = await fetch(`https://penguintrackerapi.fly.dev/admin/penguins/softdeletepenguin/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({ _id: id, secretKey })
      });
  
      if (response.ok) {
        // message.success('Penguin tracking deactivated successfully. Refreshing the map...');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        message.error('Failed to deactivate tracking due to server error.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const handleFilterByAge = (value: string) => {
    if (!data) return;

    if (value === 'All') {
      setFilteredData(data);
    } else {
      const filteredPenguins = data.filter((penguin) =>
        penguin.ageAtTagging.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredPenguins);
    }
  };

  const openModal = (id: string) => {
    setSelectedPenguin(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPenguin(null);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchPenguins();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <div style={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '2.5rem' }}>
        <Typography>
          <h3>Penguin List</h3>
        </Typography>
        <Typography>
          <p>See all tracked penguins, update their movements, or deactivate the tracking.</p>
        </Typography>
        <Divider />
        <Typography style={{ color: '#333'}}><p>Note: Deactivated penguin is not deleted from database. However, their name cannot be reused in new tracking.</p></Typography>
        <Divider />
        <Select
          defaultValue="Select Filter by Age At Tagging"
          style={{ width: '100%' }}
          onChange={handleFilterByAge}
        >
          <Option value="All">All</Option>
          <Option value="Adult">Adult</Option>
          <Option value="Teen">Teen</Option>
        </Select>
      </div>
      {filteredData ? (
        filteredData.map((penguin, index) => (
          <PenguinCard key={index} penguin={penguin} onDelete={() => openModal(penguin._id)} onUpdate={() => {}} />
        ))
      ) : (
        <Skeleton key="skeleton1" active style={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '3rem' }} />
      )}
      {selectedPenguin && (
        <DeactivatePenguinModal
          visible={modalVisible}
          onCancel={closeModal}
          onDeactivate={(secretKey) => handleDelete(selectedPenguin, secretKey)}
          id={selectedPenguin}/>
      )}
    </div>
  );
};

export default MainPenguinManipulatorContainer;
