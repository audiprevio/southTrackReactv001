import React from 'react';
import { Modal, Button, Input, message, Space, Divider } from 'antd'; // Import Space
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface DeactivatePenguinModalProps {
  visible: boolean;
  onCancel: () => void;
  onDeactivate: (secretKey: string) => void;
  id: string;
}

const DeactivatePenguinModal: React.FC<DeactivatePenguinModalProps> = ({
  visible,
  onCancel,
  onDeactivate,
}) => {
  const formik = useFormik({
    initialValues: {
      secretKey: '',
    },
    validationSchema: Yup.object().shape({
      secretKey: Yup.string()
        .required('Secret Key is required'),
    }),
    onSubmit: (values) => {
      onDeactivate(values.secretKey); 
      message.success('Penguin tracking deactivated successfully. Refreshing the map...'); // Display success message
      onCancel(); // Close the modal
    },
  });

  return (
    <Modal
      title="Deactivate Penguin Tracking"
      width={'20rem'}
      visible={visible}
      onCancel={onCancel}
      footer={
        <Space size={16} style={{ gap: '0.5rem', width: '100%', display: 'inline-flex', flexDirection: 'column-reverse'}}>
          <Button key="cancel" onClick={onCancel} style={{ width: '17rem' }}>
            Cancel
          </Button>
          <Button
            key="deactivate"
            type="primary"
            htmlType="submit"
            className='primarybtn'
            style={{ width: '17rem' }}
            disabled={formik.isSubmitting}
          >
            Deactivate Now
          </Button>
        </Space>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label style= {{ marginBottom: '1rem' }}>For Security Reasons, please input the TVK to deactivate penguin tracking</label>
          <Divider />
          <Input
            type="password"
            name="secretKey"
            placeholder="Secret Key"
            onChange={formik.handleChange}
            value={formik.values.secretKey}
          />
          {formik.errors.secretKey && formik.touched.secretKey && (
            <div className="error">{formik.errors.secretKey}</div>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default DeactivatePenguinModal;
