import { useEffect, useState } from 'react';
import {
  FileTextOutlined, MailOutlined, PhoneOutlined, UserOutlined,
} from '@ant-design/icons';
import {
  Avatar, Button, Flex, List, notification, Space, Typography,
} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import { fetchApplications } from '../../shared/requests/firebase-requests';
import {ApplicationsListProps, ApplicationType} from "../../shared/types/recruiter";


export const ApplicationsList = ({ id } : ApplicationsListProps) => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const applicationsData = await fetchApplications(id);
        setApplications(applicationsData);
      } catch (error) {
        notification.error({ message: 'Failed to fetch applications. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, [id]);
  const handleDownloadResume = (url:string) => {
    if (!url) {
      notification.error({ message: 'Resume URL is not available.' });
      return;
    }

    // Open the URL in a new tab
    window.open(url, '_blank');
    notification.success({ message: 'Resume download initiated. Check your browser downloads if it doesn\'t start automatically.' });
  };

  return (
    <Flex vertical>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={applications}
        renderItem={(application) => (
          <List.Item actions={[
            <Button
              key={application.id}
              type="primary"
              onClick={() => handleDownloadResume(application.uploaded_cv)}
              disabled={!application.uploaded_cv}
            >
              <FileTextOutlined />

              {' '}
              Open Resume
            </Button>,
          ]}
          >
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: '#73bb44' }} icon={<UserOutlined />} />}
              title={(
                <Space>
                  <Typography.Text>
                    {`${application.first_name} ${application.last_name}`}
                  </Typography.Text>

                  <Typography.Text type="secondary">
                    <MailOutlined />

                    {application.email}
                  </Typography.Text>

                  <Typography.Text type="secondary">
                    <PhoneOutlined />

                    {application.phone_number}
                  </Typography.Text>
                </Space>
                              )}
              description={(
                <Paragraph ellipsis={{
                  rows: 2,
                  expandable: true,
                  symbol: 'Read more',
                }}
                >
                  {application.cover_letter}
                </Paragraph>
                              )}
            />
          </List.Item>
        )}
      />
    </Flex>
  );
};
