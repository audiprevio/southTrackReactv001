import React from 'react';
import { Modal, Button, Input, message, Divider } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface UpdatePenguinModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (newPosition: number[]) => void;
  id: string;
  currentPosition?: number[];
}

const UpdatePenguinModal: React.FC<UpdatePenguinModalProps> = ({
  visible,
  onCancel,
  currentPosition,
  id,
}) => {
  const handleUpdatePosition = async (id: string, newPosition: number[]) => {
    try {
      const requestBody = {
        id: id, 
        lastPosition: newPosition.map(Number), 
      };
  
      const response = await fetch(`https://penguintrackerapi.fly.dev/admin/penguins/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        message.success('Penguin position updated successfully. Refreshing the map...');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        message.error('Failed to update penguin position due to a server error.');
      }
    } catch (error) {
      message.error('An error occurred while updating penguin position. Please try again.');
    }
  };
  

  const formik = useFormik({
    initialValues: {
      lastPosition: currentPosition || [],
    },
    validationSchema: Yup.object().shape({
      lastPosition: Yup.array()
        .of(Yup.number().required('Position is required'))
        .required('At least one position is required'),
    }),
    onSubmit: (values) => {
      if (values.lastPosition.length !== 2) {
        message.error('Please provide valid coordinates.');
      } else {
        handleUpdatePosition(id, values.lastPosition); 
        onCancel();
      }
    },
  });

  return (
    <Modal
      title="Update Penguin Movement"
      width={'20rem'}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit(e as any);
          }}
          disabled={formik.isSubmitting}
        >
          Update Now
        </Button>
      ]}
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Please Input the Penguin's Latest Position (Latitude, Longitude)</label>
          <Divider />
          <Input
            style={{ marginBottom: '1rem' }}
            type="number"
            name="lastPosition[0]"
            placeholder="Latitude"
            onChange={formik.handleChange}
            value={formik.values.lastPosition[0]}
          />
          <Input
            type="number"
            name="lastPosition[1]"
            placeholder="Longitude"
            onChange={formik.handleChange}
            value={formik.values.lastPosition[1]}
          />
          {formik.errors.lastPosition && formik.touched.lastPosition && (
            <div className="error">{formik.errors.lastPosition}</div>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default UpdatePenguinModal;
