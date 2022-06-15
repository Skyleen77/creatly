import { Space, Spin } from 'antd';

const Loading = () => (
  <div className="creatly-loading-wrapper">
    <Space size="middle">
      <Spin size="large" />
    </Space>
  </div>
);

export default Loading;
