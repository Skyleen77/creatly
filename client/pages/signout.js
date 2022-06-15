import { useEffect, useContext } from 'react';
import Loading from '../components/Loading';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';

const Signout = () => {
  //context
  const [auth, setAuth] = useContext(AuthContext);
  // router
  const router = useRouter();

  useEffect(() => {
    // remove from localStorage
    localStorage.removeItem('auth');
    // remove from context
    setAuth({
      user: null,
      token: '',
    });
    // redirect
    router.push('/');
  }, []);

  return <Loading />;
};

export default Signout;
