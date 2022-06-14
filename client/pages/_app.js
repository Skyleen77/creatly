import { ThemeProvider } from '../context/theme';
import { AuthProvider } from '../context/auth';
import TopNav from '../components/Nav/TopNav';
import { Toaster } from 'react-hot-toast';

// import 'antd/dist/antd.css';
// import 'antd/dist/antd.dark.css';
import '../public/css/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TopNav />
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
