import { useState, useContext } from 'react';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';

const { SubMenu, Item, ItemGroup } = Menu;

const TopNav = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const signOut = () => {
    // remove from localStorage
    localStorage.removeItem('auth');
    // remove from context
    setAuth({
      user: null,
      token: '',
    });
    // redirect
    router.push('/');
  };

  return (
    <>
      {auth?.user !== null && (
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme="dark"
          className="creatly-nav"
        >
          <Item key="mail">
            <Link href="/">
              <a>
                <img
                  className="creatly-logo-nav"
                  src="/assets/creatlyWhite.png"
                  alt="logo creatly"
                />
              </a>
            </Link>
          </Item>

          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title="Dashboard"
            className="creatly-submenu"
          >
            <ItemGroup title="Management">
              <Item key="setting:1" className="creatly-submenu-item">
                <Link href="/admin">
                  <a>Admin</a>
                </Link>
              </Item>
            </ItemGroup>
            <Item
              className="creatly-submenu-item"
              key="setting:2"
              onClick={signOut}
            >
              <a>Signout</a>
            </Item>
          </SubMenu>
        </Menu>
      )}
    </>
  );
};

export default TopNav;
