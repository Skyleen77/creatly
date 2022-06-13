import { useState } from 'react';
import { Menu } from 'antd';
import {
  SettingOutlined,
  CloudTwoTone,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ToggleTheme from '../ToggleTheme';
import Link from 'next/link';

const { SubMenu, Item, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState('mail');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
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
            <img className="creatly-logo-nav" src="/assets/creatlyWhite.png" />
          </a>
        </Link>
      </Item>
      <Item key="signup" icon={<UserAddOutlined />}>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </Item>
      <Item key="signin" icon={<UserOutlined />}>
        <Link href="/signin">
          <a>Signin</a>
        </Link>
      </Item>
      <SubMenu
        key="SubMenu"
        icon={<SettingOutlined />}
        title="Dashboard"
        style={{ marginLeft: 'auto' }}
      >
        <ItemGroup title="Management">
          <Item key="setting:1">
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </Item>
        </ItemGroup>
      </SubMenu>
      <Item className="creatly-theme-toggle">
        <ToggleTheme />
      </Item>
    </Menu>
  );
};

export default TopNav;
