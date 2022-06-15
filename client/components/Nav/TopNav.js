import { useState, useContext } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { AuthContext } from '../../context/auth';

const { SubMenu, Item, ItemGroup } = Menu;

const TopNav = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const roleBasedLink = () => {
    if (auth?.user?.role === 'Admin') {
      return '/admin';
    } else if (auth?.user?.role === 'Author') {
      return '/author';
    } else {
      return '/subscriber';
    }
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
            icon={<UserOutlined />}
            title={auth?.user?.name || 'Dashboard'}
            className="creatly-submenu"
          >
            <ItemGroup title="Management">
              <Item key="setting:1" className="creatly-submenu-item">
                <Link href={roleBasedLink()}>
                  <a>Dashboard</a>
                </Link>
              </Item>
            </ItemGroup>
            <Item className="creatly-submenu-item" key="setting:2">
              <Link href="/signout">
                <a>Signout</a>
              </Link>
            </Item>
          </SubMenu>
        </Menu>
      )}
    </>
  );
};

export default TopNav;
