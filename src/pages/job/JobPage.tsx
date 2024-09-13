import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Flex, notification, Space, Spin, Tabs, Typography,} from 'antd';
import Title from 'antd/es/typography/Title';

import {ApplicationsList} from '../../components/applications-list/ApplicationsList';
import {JobCreate} from '../../components/job-create/JobCreate';
import {fetchJobData} from '../../shared/requests/firebase-requests';
import {PostingType} from "../../shared/types/seeker";
import {MetaHelmet} from "../../shared/ui/meta-helmet/MetaHemlet";
import {ArrowLeftOutlined} from "@ant-design/icons";


export const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<PostingType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getJobData = async () => {
      try {
        const data = await fetchJobData(id);
        setJobData(data as PostingType);
      } catch (error) {
        notification.error({ message: 'Failed to fetch job data. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    getJobData();
  }, [id]);

  if (loading) {
    return (
      <Spin
        size="large"
        className={'spinner'}
      />
    );
  }

  const items = [
    {
      key: '1',
      label: 'Job Details',
      children: <JobCreate initialData={jobData as PostingType} />,
    },
    {
      key: '2',
      label: 'Applications',
      children: <ApplicationsList id={id as string} />,
      disabled: !id,
    },
  ];

  return (
    <Flex vertical className={'full-height'}>
      <Space size={6} onClick={() => navigate(-1)} className={'back-button-container'}>
        <ArrowLeftOutlined className={'back-button'}/>

        <Typography.Text className={'back-button'}>
          Back to List
        </Typography.Text>
      </Space>
      <MetaHelmet
          title="JP: Job Page"
          description={`Job Posting #${id}`}
      />

      <Title level={4} className={'zero-margin'}>
        {`Job Posting #${id}`}
      </Title>

      <Flex
        vertical
        className={'overflow-y-auto overflow-x-hidden'}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Flex>

    </Flex>
  );
};
