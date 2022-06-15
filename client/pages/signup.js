import { useState, useEffect, useContext } from 'react';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiLock } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth';
import Loading from '../components/Loading';

const Signup = () => {
  // Context
  const [auth, setAuth] = useContext(AuthContext);
  // Router
  const router = useRouter();
  // State
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

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

  useEffect(() => {
    if (auth?.user !== null) {
      router.push('/');
    } else {
      setLoadingPage(false);
    }
  }, [auth?.user]);

  return (
    <>
      {loadingPage ? (
        <Loading />
      ) : (
        <div className="creatly-background-form creatly-container">
          <div className="creatly-form-container">
            <img
              className="creatly-logo"
              src="/assets/creatly.png"
              alt="logo creatly"
            />

            <hr />

            <h1 className="creatly-title-form">Signup</h1>

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
                  loading={loading}
                >
                  Register
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
      )}
    </>
  );
};

export default Signup;
