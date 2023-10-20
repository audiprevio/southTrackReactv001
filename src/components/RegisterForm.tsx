import React, { useEffect } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Card, message, Form as AntForm, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../config';

interface FormValues {
  username: string;
  employeeId: string;
  password: string;
  role: string;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  employeeId: Yup.string()
    .min(5, 'Too Short! Employee ID must start with EMP followed by at least 2 digits')
    .matches(/^EMP[0-9]{2,}/, 'Employee ID must start with EMP followed by at least 2 digits')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
    .required('Required'),
  role: Yup.string()
    .oneOf(['superadmin', 'developer'], 'Invalid role')
    .required('Required'),
});


const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Card style={{ width: '25rem' }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>SouthTrack Developer Registration</h2>
        <p style={{ marginBottom: '1rem', textAlign: 'center' }}>You can log in directly after registration with your credentials. Password data is secured with hash.</p>
        <Divider />
        <Formik
          initialValues={{
            username: '',
            employeeId: '',
            password: '',
            role: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values: FormValues, { setStatus }: FormikHelpers<FormValues>) => {
            try {
              const response = await fetch(`${baseURL}/admin/createadmin`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });

              if (response.ok) {
                message.success('Admin registered successfully');
                navigate('/login');
              } else {
                setStatus('Registration failed. Please try again.');
              }
            } catch (error) {
              setStatus('An error occurred. Please try again.');
            }
          }}
        >
          {({ errors, touched, status }) => (
            <Form style = {{ display: 'flex', flexDirection: 'column', padding: '0'}}>
              <AntForm.Item label="Username" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} htmlFor="username" help={errors.username && touched.username ? errors.username : null} validateStatus={errors.username && touched.username ? 'error' : ''}>
                <Field as={Input} name="username" id="username" />
              </AntForm.Item>
              <AntForm.Item label="Employee ID (format: EMPXXX)" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} htmlFor="employeeId" help={errors.employeeId && touched.employeeId ? errors.employeeId : null} validateStatus={errors.employeeId && touched.employeeId ? 'error' : ''}>
                <Field as={Input} name="employeeId" id="employeeId" />
              </AntForm.Item>
              <AntForm.Item label="Password" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} htmlFor="password" help={errors.password && touched.password ? errors.password : null} validateStatus={errors.password && touched.password ? 'error' : ''}>
                <Field as={Input.Password} name="password" id="password" />
              </AntForm.Item>
              <AntForm.Item label="Role (input: developer)" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} htmlFor="role" help={errors.role && touched.role ? errors.role : null} validateStatus={errors.role && touched.role ? 'error' : ''}>
                <Field as={Input} name="role" id="role" />
              </AntForm.Item>
              {status && <div>{status}</div>}
              <AntForm.Item>
                <Button className="primarybtn" type="primary" htmlType="submit" style={{ width: '100%' }}>Register</Button>
                <Button type="dashed" onClick={handleLoginClick} style={{ width: '100%', marginTop: '1rem' }}>Back to Login</Button>
              </AntForm.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default RegisterForm;
