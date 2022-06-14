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
  const [visible, setVisible] = useState(false);
  // Router
  const router = useRouter();

  const { Item } = Form;
  const { Password } = Input;

  const forgotPasswordRequest = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/forgot-password', values);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success('Password reset code has been sent to your email.');
        setVisible(true);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Submit failed. Try again.');
      setLoading(false);
    }
  };

  const resetPasswordRequest = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/reset-password', values);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success('Password changed successfully.');
        router.push('signin');
      }
    } catch (err) {
      console.log(err);
      toast.error('Submit failed. Try again.');
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
            Forgot Password
          </h1>

          <Form
            name="normal_login"
            className="creatly-login-form"
            onFinish={visible ? resetPasswordRequest : forgotPasswordRequest}
          >
            {/* Email */}
            <Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your email',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Item>

            {/* Password */}
            {visible && (
              <>
                <Item
                  name="resetCode"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your reset code',
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Reset Code"
                  />
                </Item>
                <Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your new password',
                    },
                  ]}
                >
                  <Password
                    prefix={<FiLock className="site-form-item-icon" />}
                    type="password"
                    placeholder="New Password"
                  />
                </Item>
              </>
            )}

            {/* Button Submit */}
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="creatly-login-form-button"
                style={{ marginBottom: '10px' }}
                loading={loading}
              >
                Submit
              </Button>
              Or{' '}
              <Link href="/signup">
                <a>login now!</a>
              </Link>
            </Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Signin;
