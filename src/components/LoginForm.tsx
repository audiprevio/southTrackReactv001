import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Card, message, Form as AntForm, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import southT from '../assets/southTrack.svg';
import { baseURL } from '../config';

interface FormValues {
  username: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>      <Card style={{ width: '25rem', alignContent: 'center'}}>
        <img alt="South Track" src={southT} style={{ width: '100%', height: '3rem'}}/>
        <Divider style={{ margin: '0.625rem 0'}} />
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Developer Login</h2>
        <p style={{ marginBottom: '1rem', textAlign: 'center' }}>SouthTrack v.0.0.1 (Alpha) is a React & LeafletJS-based GUI for Latitude Longitude Penguin Tracker API</p>
        <Divider />
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values: FormValues, { setStatus, setErrors }: FormikHelpers<FormValues>) => {
            try {
              const response = await fetch(`${baseURL}/admin/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
          
              if (response.ok) {
                const data = await response.json();
                console.log(data)
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('username', values.username);
                message.success('Logged in successfully');
                navigate('/');
              } else {
                setErrors({
                  username: 'Wrong password or username',
                  password: 'Wrong password or username',
                });
              }
            } catch (error) {
              setStatus('An error occurred. Please try again.');
            }
          }}          
        >
          {({ errors, touched, status }) => (
            <Form data-testid="login-form" style = {{ display: 'flex', flexDirection: 'column', padding: '0'}}>
              <AntForm.Item label="Username" htmlFor="username" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                <Field as={Input} name="username" id="username" />
                {errors.username && touched.username && <div>{errors.username}</div>}
              </AntForm.Item>
              <AntForm.Item label="Password" htmlFor="password" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                <Field as={Input.Password} name="password" id="password" />
                {errors.password && touched.password && <div>{errors.password}</div>}
              </AntForm.Item>
              {status && <div>{status}</div>}
              <AntForm.Item>
                <Button className="primarybtn" type="primary" htmlType="submit" style={{ width: '100%' }}>Submit</Button>
                <Button type="dashed" onClick={handleRegisterClick} style={{ width: '100%', marginTop: '1rem' }}>Register</Button>
              </AntForm.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default LoginForm;
