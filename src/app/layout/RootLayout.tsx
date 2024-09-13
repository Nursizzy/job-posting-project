import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Layout, Menu, Typography,} from 'antd';

const { Header, Content } = Layout;

const items = [
  {
    label: 'Job Seeker',
    key: '/job-listing-seeker',
  },
  {
    label: 'Recruiter',
    key: '/job-listing-recruiter',
  },
];

export const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const selectedKey = items.find((item) => location.pathname.startsWith(item.key))?.key;


    const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <Layout className={'layout-style'}>
      <Header className={'header-style'}>
        <Typography.Title level={2}>jp</Typography.Title>
        <Menu
          onClick={onClick}
          selectedKeys={[selectedKey]}
          mode="horizontal"
          items={items}
          theme="light"
          className={'menu-style'}
        />
      </Header>

      <Content className={'content-style'}>
        <Outlet />
      </Content>
    </Layout>
  );
};
