import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { FiLock } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signin = () => {
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
    <div className="creatly-background-form creatly-container">
      <div className="creatly-form-container">
        <img
          className="creatly-logo"
          src="/assets/creatly.png"
          alt="logo creatly"
        />

        <hr />

        <h1 className="creatly-title-form">Forgot Password</h1>

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
              loading={loading}
            >
              Submit
            </Button>

            <div className="creatly-text-center">
              <span>If you already have an account </span>
              <Link href="/signin">
                <a>login now!</a>
              </Link>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
