import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
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
    <div className="creatly-background-form creatly-container">
      <div className="creatly-form-container">
        <img
          className="creatly-logo"
          src="/assets/creatly.png"
          alt="logo creatly"
        />

        <hr />

        <h1 className="creatly-title-form">Signin</h1>

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
          <Item className="forgot-password">
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
              loading={loading}
            >
              Login
            </Button>

            <div className="creatly-text-center">
              <span>If you don't already have an account </span>
              <Link href="/signup">
                <a>register now!</a>
              </Link>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
