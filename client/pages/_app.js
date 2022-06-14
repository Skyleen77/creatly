import { AuthProvider } from '../context/auth';
import TopNav from '../components/Nav/TopNav';
import { Toaster } from 'react-hot-toast';

import 'antd/dist/antd.css';
import '../public/css/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TopNav />
      <Toaster />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
