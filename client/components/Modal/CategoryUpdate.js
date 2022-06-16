import { EditOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button } from 'antd';

const CategoryUpdate = ({
  visible,
  setVisible,
  handleUpdate,
  loadingUpdate,
  updatingCategory,
}) => {
  const { Item } = Form;

  return (
    <Modal
      title="Update category"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      className="creatly-container"
    >
      <Form
        className="creatly-simple-add-form"
        onFinish={handleUpdate}
        fields={[{ name: 'name', value: updatingCategory.name }]}
      >
        <Item name="name">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Category Name"
          />
        </Item>

        <Button type="primary" htmlType="submit" loading={loadingUpdate}>
          Update
        </Button>
      </Form>
    </Modal>
  );
};

export default CategoryUpdate;
