import {Divider, Flex, Space, Typography} from 'antd';
import Title from 'antd/es/typography/Title';
import {useNavigate} from 'react-router-dom';

import {JobCreate} from '../../components/job-create/JobCreate';
import {MetaHelmet} from "../../shared/ui/meta-helmet/MetaHemlet";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const JobPostingPage = () => {
  const navigate = useNavigate();

  return (<Flex vertical className={'full-height'}>
    <MetaHelmet
          title="JP: Recruiter Job Posting Page"
          description={`Post a new job`}
    />

          <Space size={6} onClick={() => navigate(-1)} className={'back-button-container'}>
          <ArrowLeftOutlined className={'back-button'}/>

          <Typography.Text className={'back-button'}>
              Back to List
          </Typography.Text>
      </Space>

    <Title level={4} style={{margin:0}}>
      New Job Posting
    </Title>

    <Divider />

    <Flex
      vertical
      className={'overflow-y-auto overflow-x-hidden'}
    >
      <JobCreate initialData={null} />
    </Flex>
  </Flex>
);
}
