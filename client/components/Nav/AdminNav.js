import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useWindowWidth } from '@react-hook/window-size';
import {
  PushpinOutlined,
  CameraOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const AdminNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('');

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth >= 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current === name && 'active'}`;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      className="creatly-admin-nav"
    >
      <Menu
        defaultOpenKeys={['2', '6', '10']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Item
          className={`creatly-ant-menu-item ${activeName('/admin')}`}
          key="1"
          icon={<SettingOutlined />}
        >
          <Link href="/admin">
            <a>Dashboard</a>
          </Link>
        </Item>

        {/* posts */}
        <SubMenu key="2" icon={<PushpinOutlined />} title="Posts">
          <Item
            className={`creatly-ant-menu-item ${activeName('/admin/posts')}`}
            key="3"
          >
            <Link href="/admin/posts">
              <a>All Posts</a>
            </Link>
          </Item>
          <Item
            className={`creatly-ant-menu-item ${activeName(
              '/admin/posts/new',
            )}`}
            key="4"
          >
            <Link href="/admin/posts/new">
              <a>New Post</a>
            </Link>
          </Item>
          <Item
            className={`creatly-ant-menu-item ${activeName(
              '/admin/categories',
            )}`}
            key="5"
          >
            <Link href="/admin/categories">
              <a>Categories</a>
            </Link>
          </Item>
        </SubMenu>

        {/* library */}
        <SubMenu key="6" icon={<CameraOutlined />} title="Media">
          <Item
            className={`creatly-ant-menu-item ${activeName(
              '/admin/media/library',
            )}`}
            key="7"
          >
            <Link href="/admin/media/library">
              <a>Library</a>
            </Link>
          </Item>
          <Item
            className={`creatly-ant-menu-item ${activeName(
              '/admin/media/new',
            )}`}
            key="8"
          >
            <Link href="/admin/media/new">
              <a>New Media</a>
            </Link>
          </Item>
        </SubMenu>

        {/* comments */}
        <Item
          className={`creatly-ant-menu-item ${activeName('/admin/comments')}`}
          key="9"
          icon={<CommentOutlined />}
        >
          <Link href="/admin/comments">
            <a>Comments</a>
          </Link>
        </Item>

        {/* users */}
        <SubMenu key="10" icon={<UserSwitchOutlined />} title="Users">
          <Item
            className={`creatly-ant-menu-item ${activeName('/admin/users')}`}
            key="11"
          >
            <Link href="/admin/users">
              <a>All Users</a>
            </Link>
          </Item>
          <Item
            className={`creatly-ant-menu-item ${activeName(
              '/admin/users/new',
            )}`}
            key="12"
          >
            <Link href="/admin/users/new">
              <a>New User</a>
            </Link>
          </Item>
        </SubMenu>

        {/* profile */}
        <Item
          className={`creatly-ant-menu-item ${activeName('/admin/userid')}`}
          key="13"
          icon={<UserOutlined />}
        >
          <Link href="/admin/userid">
            <a>Profile</a>
          </Link>
        </Item>

        {/* Customize */}
        <Item
          className={`creatly-ant-menu-item ${activeName('/admin/customize')}`}
          key="14"
          icon={<BgColorsOutlined />}
        >
          <Link href="/admin/customize">
            <a>Customize</a>
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
