import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import Link from 'next/link';
import { FiLock } from 'react-icons/fi';

const Signup = () => {
  const { Item } = Form;
  const { Password } = Input;

  const onFinish = (values) => {
    console.log('values => ', values);
  };

  return (
    <Row>
      <Col span={8} offset={8}>
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
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {/* Username */}
            <Item
              name="username"
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
