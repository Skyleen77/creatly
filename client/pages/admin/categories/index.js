import { useState } from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { Form, Input, Row, Col, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import toast from 'react-hot-toast';

const Categories = () => {
  const { Item } = Form;

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/category', values);
      console.log(data);
      toast.success('Category created successfully');
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Category create failed');
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <h1>Categories</h1>
          <p>Add new category</p>
          <Form onFinish={onFinish}>
            <Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the new Category!',
                },
              ]}
            >
              <Input
                prefix={<EditOutlined className="site-form-item-icon" />}
                placeholder="Category Name"
              />
            </Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Create Category
            </Button>
          </Form>
        </Col>

        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <p>Show categories list</p>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Categories;
