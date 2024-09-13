import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {BankOutlined, CheckCircleOutlined, EnvironmentOutlined} from '@ant-design/icons';
import {Button, Card, Divider, Flex, Space, Typography,} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

// @ts-ignore
import dayjs, {Dayjs} from 'dayjs';

// @ts-ignore
import relativeTime from 'dayjs/plugin/relativeTime';

import {currencies, experiences, industries, locations,} from '../../shared/data';
import {JobCardProps} from "../../shared/types/seeker";


const { Title, Text } = Typography;

dayjs.extend(relativeTime);

export const JobCard = ({ posting } : JobCardProps) => {
  const navigate = useNavigate();

  const getRelativeTime = (timestamp: Dayjs) => {
    const postedDate = dayjs(timestamp.toDate());
    const now = dayjs();
    const diffMinutes = now.diff(postedDate, 'minute');
    const diffHours = now.diff(postedDate, 'hour');
    const diffDays = now.diff(postedDate, 'day');

    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  const locationObject = locations.find((location) => location.id === posting.locationId);
  const experienceObject = experiences.find((experience) => experience.id === posting.experienceId);
  const industryObject = industries.find((industry) => industry.id === posting.industryId);
  const currencyObject = currencies.find((currency) => currency.id === posting.salary_currencyId);

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Card
        hoverable
        onClick={
                () => setExpanded(!expanded)
            }
      >
        <Flex vertical key={posting.id} gap={8}>
          <Text>
            {'Posted '}
            {getRelativeTime(posting.posted_at)}
          </Text>

          <Title level={4} style={{margin:0}}>{posting.title}</Title>

          <Space>
            <BankOutlined />

            {posting.company_name}
          </Space>

          <Space>
            <Space>
              <EnvironmentOutlined />

              {locationObject?.name}
            </Space>

            <Divider type="vertical" />

            <Space>
              {industryObject?.icon}

              {industryObject?.name}
            </Space>
          </Space>

          <Space>
            <Text>Salary:</Text>

            {posting.salary_range.from}
            -

            {posting.salary_range.to}

            {currencyObject?.symbol}

            <Divider type="vertical" />

            {`Experience: ${experienceObject?.name}`}
          </Space>

          <Paragraph ellipsis={expanded ? false
            : {
              rows: 2,
              expandable: false,
              symbol: 'more',
            }}
          >
            {posting.description}
          </Paragraph>

          {expanded && (
          <Flex justify="end">
            <Button type="primary" onClick={() => navigate(`/job-listing-seeker/application/${posting.id}`)}>
              <CheckCircleOutlined />
              Apply for a Job
            </Button>
          </Flex>
          )}
        </Flex>

      </Card>

      <Divider/>
    </>
  );
};
