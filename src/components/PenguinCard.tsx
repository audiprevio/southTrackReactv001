import { useState } from 'react';
import UpdatePenguinModal from './UpdatePenguinModal';
import { Card, Typography, Button, Space } from 'antd';

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

interface PenguinCardProps {
  penguin: Penguin;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newPosition: number[]) => void; // Add onUpdate prop
}

const PenguinCard: React.FC<PenguinCardProps> = ({ penguin, onDelete, onUpdate }) => {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [newPosition] = useState<number[]>([]);

  const handleUpdatePosition = () => {
    if (newPosition.length !== 2) {
      // Handle invalid input
      return;
    }

    onUpdate(penguin._id, newPosition); // Call the onUpdate prop with penguin ID and new position
    setUpdateModalVisible(false); // Close the modal
  };

  return (
    <Card hoverable className="penguinCard" title={penguin.penguinName} style={{ marginBottom: '1rem', marginTop: '1rem', minWidth: '18rem', width: '20rem', maxWidth: '48rem'}}>
      <Typography.Text>Last Position: {penguin.lastPosition.join(', ')}</Typography.Text><br/>
      <Typography.Text>Last Update: {new Date(penguin.lastUpdate).toLocaleString()}</Typography.Text><br/>
      <Typography.Text>Species Name: {penguin.speciesName}</Typography.Text><br/>
      <Typography.Text>Age at Tagging: {penguin.ageAtTagging}</Typography.Text><br/>
      <Typography.Text>Tagged Position: {penguin.taggedPosition}</Typography.Text><br/>
      <Typography.Text>tagged time: {new Date(penguin.taggedTime).toLocaleString()}</Typography.Text><br/>
      <Typography.Text>Tagged By: {penguin.taggedBy}</Typography.Text>
      <br />
      <br />
      <Space className="Spacer" size={16}>
        <Button 
          className="updatebtn" 
          type="primary" 
          onClick={() => setUpdateModalVisible(true)}
          style={{ minWidth: '100%', width: '8.5rem', maxWidth: '8.5rem' }}
        >
          Update Position
        </Button>
        <Button 
          className="warningbtn" 
          type="primary" 
          danger 
          onClick={() => onDelete(penguin._id)}
          style={{ width: '8.5rem', maxWidth: '8.5rem' }}
        >
          Deactivate
        </Button>
      </Space>

      <UpdatePenguinModal
        visible={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        onUpdate={handleUpdatePosition}
        id={penguin._id}
      />
    </Card>
  );
};

export default PenguinCard;
