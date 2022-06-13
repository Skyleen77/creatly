import { Layout } from 'antd';
import AdminNav from '../Nav/AdminNav';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  return (
    <Layout>
      <AdminNav />
      <Layout>
        <Content style={{ padding: '10px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
