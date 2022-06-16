import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { Form, Input, Button, Space, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryUpdate from '../../../components/Modal/CategoryUpdate';

const Categories = () => {
  const { Item } = Form;
  const [form] = Form.useForm();

  const { Column } = Table;

  // states
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [updatingCategory, setUpdatingCategory] = useState({});
  const [visible, setVisible] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/category', values);

      if (data?.error) {
        toast.error(data.error);
      } else {
        setCategories([data, ...categories]);
        toast.success('Category created successfully');
        setLoading(false);
        form.resetFields(['name']);
      }
    } catch (err) {
      console.log(err);
      toast.error('Category create failed');
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/category/${item.slug}`);
      setCategories(categories.filter((cat) => cat._id !== data._id));
      toast.success('Category deleted successfully');
    } catch (err) {
      toast.error('Category delete failed');
      console.log(err);
    }
  };

  const handleEdit = async (item) => {
    setUpdatingCategory(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    setLoadingUpdate(true);
    try {
      const { data } = await axios.put(
        `/category/${updatingCategory.slug}`,
        values,
      );
      const newCategories = categories.map((cat) => {
        if (cat._id === data._id) {
          return data;
        }
        return cat;
      });
      setCategories(newCategories);
      setUpdatingCategory({});
      setVisible(false);
      setLoadingUpdate(false);
      toast.success('Category updated successfully');
    } catch (err) {
      toast.error('Category update failed');
      console.log(err);
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <AdminLayout>
      <h1 className="creatly-page-title">Categories</h1>

      <div className="creatly-dashboard-section">
        <p className="creatly-page-subtitle">Create new category</p>
        <Form
          onFinish={onFinish}
          form={form}
          className="creatly-simple-add-form"
        >
          <Item name="name">
            <Input
              prefix={<PlusCircleOutlined className="site-form-item-icon" />}
              placeholder="Category Name"
            />
          </Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Create Category
          </Button>
        </Form>
      </div>

      <div className="creatly-dashboard-section">
        <p className="creatly-page-subtitle">All categories</p>
        <Table dataSource={categories}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Created At" dataIndex="createdAt" key="createdAt" />
          <Column title="Updated At" dataIndex="updatedAt" key="updatedAt" />
          <Column
            title="Actions"
            key="actions"
            render={(item) => (
              <Space size="middle">
                <a onClick={() => handleEdit(item)}>Edit</a>
                <a onClick={() => handleDelete(item)}>Delete</a>
              </Space>
            )}
          />
        </Table>
      </div>

      <CategoryUpdate
        visible={visible}
        setVisible={setVisible}
        handleUpdate={handleUpdate}
        loadingUpdate={loadingUpdate}
        updatingCategory={updatingCategory}
      />
    </AdminLayout>
  );
};

export default Categories;
