import { useState } from 'react';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiLock } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  // Router
  const router = useRouter();
  // State
  const [loading, setLoading] = useState(false);

  const { Item } = Form;
  const { Password } = Input;

  const onFinish = async (values) => {
    // console.log('values => ', values);
    setLoading(true);
    try {
      const { data } = await axios.post('/signup', values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // Successfully
        toast.success('Successfully signed up');

        // Redirect
        router.push('/signin');
      }
    } catch (err) {
      console.log(err);
      toast.error('Signup failed. Try again.');
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
            Signup
          </h1>

          <Form
            name="normal_login"
            className="creatly-login-form"
            onFinish={onFinish}
          >
            {/* Username */}
            <Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Item>

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

            {/* Button Submit */}
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="creatly-login-form-button"
                style={{ marginBottom: '10px' }}
                loading={loading}
              >
                Register
              </Button>
              Or{' '}
              <Link href="/signin">
                <a>login now!</a>
              </Link>
            </Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Signup;
