import { useState } from 'react';
import { Divider, Form, Input, Button, DatePicker, message, Typography } from 'antd';
import { secretKey } from '../config';

interface Penguin {
  penguinName: string;
  lastPosition: number[];
  lastUpdate: string;
  speciesName: string;
  ageAtTagging: string;
  taggedPosition: string;
  taggedTime: string;
  taggedBy: string;
  token: string;
  secretKey: string;
}

const AddPenguinForm = () => {
  const [penguin] = useState<Penguin>({
    penguinName: '',
    lastPosition: [0, 0],
    lastUpdate: '',
    speciesName: '',
    ageAtTagging: '',
    taggedPosition: '',
    taggedTime: '',
    taggedBy: '',
    token: '',
    secretKey: ''
  });
  const handleSubmit = (values: Penguin) => {

    if (values.secretKey !== secretKey) {
      message.error('Invalid Secret Key - wenk wenk!');
      return;
    }

    values.lastPosition = values.lastPosition.map(Number);
  
    values.lastUpdate = values.lastUpdate.toISOString();
    values.taggedTime = values.taggedTime.toISOString();
  
    console.log(values);
  
    fetch('https://penguintrackerapi.fly.dev/admin/penguins/addpenguin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${values.token}`
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (!response.ok) {
        console.error('HTTP status:', response.status);
        console.error('Status text:', response.statusText);
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      message.success('Penguin data added successfully. Refreshing the Map...');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch(error => {
      console.error('Error:', error);
      message.error('Failed to add penguin data');
    });
  };
  
  

  return (
    <div style ={{ paddingLeft: '2rem', paddingRight: '2rem', marginTop: '4rem'}}>
        <Typography><h3>Add a Penguin</h3></Typography>
        <Typography><p>Here you can add a penguin that has been tagged with our tagging device. Please contact today's PIC for the Tracking Validation Key (TVK).</p></Typography>
        <Divider />
        <Typography style={{ color: '#333'}}><p>Note: you cannot add another penguin with the same name, even if their have been deactivated.</p></Typography>
        <Divider />
        <Form onFinish={values => handleSubmit(values)} layout="vertical">
            <Form.Item 
              label="Penguin Name" 
              name="penguinName" 
              initialValue={penguin.penguinName}
              rules={[{ required: true, message: 'Please input the penguin name!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.List name="lastPosition" initialValue={penguin.lastPosition}>
                {(fields) => (
                <>
                    {fields.map((field, index) => (
                    <Form.Item
                        {...field}
                        label={`Last Position ${index + 1} (Lat & Long)`}
                        key={field.key}
                        rules={[{ required: true, message: 'Please input the last position (Lat & Long)!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    ))}
                </>
                )}
            </Form.List>
            <Form.Item 
              label="Last Update" 
              name="lastUpdate" 
              initialValue={penguin.lastUpdate}
              rules={[{ required: true, message: 'Please select the last update!' }]}
            >
                <DatePicker showTime style = {{ width: '100%'}} />
            </Form.Item>
            <Form.Item 
              label="Species Name" 
              name="speciesName" 
              initialValue={penguin.speciesName}
              rules={[{ required: true, message: 'Please input the species name!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item 
              label="Age At Tagging" 
              name="ageAtTagging" 
              initialValue={penguin.ageAtTagging}
              rules={[{ required: true, message: 'Please input the age at tagging!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item 
              label="Tagged Position" 
              name="taggedPosition" 
              initialValue={penguin.taggedPosition}
              rules={[{ required: true, message: 'Please input the tagged position!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item 
              label="Tagged Time" 
              name="taggedTime" 
              initialValue={penguin.taggedTime}
              rules={[{ required: true, message: 'Please select the tagged time!' }]}
            >
                <DatePicker showTime style = {{ width: '100%'}}/>
            </Form.Item>
            <Form.Item 
              label="Tagged By" 
              name="taggedBy" 
              initialValue={penguin.taggedBy}
              rules={[{ required: true, message: 'Please input who tagged the penguin!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item 
              label="Tracking Validation Key" 
              name="secretKey"
              rules={[{ required: true, message: 'Please input the tracking validation key!' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Add Penguin</Button>
            </Form.Item>
        </Form>
  </div>
  );
};

export default AddPenguinForm;
