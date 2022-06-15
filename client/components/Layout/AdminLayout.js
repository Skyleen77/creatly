import { useContext, useEffect, useState } from 'react';
import { Layout } from 'antd';
import AdminNav from '../Nav/AdminNav';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import axios from 'axios';

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(true);
  // router
  const router = useRouter();

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get('/current-admin');
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (auth?.user === null) {
        if (window.location.pathname === '/admin') {
          router.push('/signin');
        } else {
          router.push('/');
        }
        // console.log('location => ', window.location.pathname);
      } else {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    getCurrentAdmin();
  }, [auth?.token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <AdminNav />
      <Layout>
        <Content style={{ padding: '10px' }} className="creatly-container">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
