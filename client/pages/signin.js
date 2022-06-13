import { useState } from 'react';
import Link from 'next/link';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { FiLock } from 'react-icons/fi';

const Signin = () => {
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

            {/* Remember me */}
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
              >
                Login
              </Button>
              Or{' '}
              <Link href="/signin">
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
