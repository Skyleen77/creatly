import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Col, Form, Input, Row } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { FiLock } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth';

const Signin = () => {
  // Context
  const [auth, setAuth] = useContext(AuthContext);
  // State
  const [loading, setLoading] = useState(false);
  // Router
  const router = useRouter();

  const { Item } = Form;
  const { Password } = Input;

  const onFinish = async (values) => {
    setLoading(true);
    // console.log('values => ', values);
    try {
      const { data } = await axios.post('/signin', values);

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save in context
        setAuth(data);
        // save in localStorage
        localStorage.setItem('auth', JSON.stringify(data));

        // Successfully
        toast.success('Successfully signed in');

        // Redirect
        router.push('/admin');
      }
    } catch (err) {
      console.log(err);
      toast.error('Signin failed. Try again.');
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col lg={{ span: 8, offset: 8 }} xs={{ span: 22, offset: 1 }}>
        <div className="creatly-form-container">
          <h1
            style={{
              paddingBottom: '10px',
              textAlign: 'center',
            }}
          >
            Signin
          </h1>

          <Form
            name="normal_login"
            className="creatly-login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {/* Email */}
            <Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Item>

            {/* Password */}
            <Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Password
                prefix={<FiLock className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Item>

            {/* Forgot password */}
            <Item>
              <Link href="/forgot-password">
                <a>Forgot password</a>
              </Link>
            </Item>

            {/* Button Submit */}
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="creatly-login-form-button"
                style={{ marginBottom: '10px' }}
                loading={loading}
              >
                Login
              </Button>
              Or{' '}
              <Link href="/signup">
                <a>register now!</a>
              </Link>
            </Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Signin;
