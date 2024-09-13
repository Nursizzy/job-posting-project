import { Divider, Flex } from 'antd';
import Title from 'antd/es/typography/Title';

import { JobCreate } from '../../components/job-create/JobCreate';
import {MetaHelmet} from "../../shared/ui/meta-helmet/MetaHemlet";

export const JobPostingPage = () => (
  <Flex vertical className={'full-height'}>
    <MetaHelmet
          title="JP: Recruiter Job Posting Page"
          description={`Post a new job`}
    />

    <Title level={4} className={'zero-margin'}>
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
