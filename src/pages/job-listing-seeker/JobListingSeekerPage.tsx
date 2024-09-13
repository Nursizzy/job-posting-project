import { useEffect, useState } from 'react';
import { ControlOutlined } from '@ant-design/icons';
import {
  Card, Col, Drawer, FloatButton, List, Row,
} from 'antd';

import { JobCard } from '../../components/job-card/JobCard';
import { JobFilters } from '../../components/job-filters/JobFilters';
import { SeekersListSkeleton } from '../../shared/ui/skeletons/SeekersListSkeleton';
import { fetchPostingsForSeekerList } from '../../shared/requests/firebase-requests';
import {FiltersType} from "../../shared/types/seeker";
import {MetaHelmet} from "../../shared/ui/meta-helmet/MetaHemlet";

export const JobListingSeekerPage = () => {
  const [postings, setPostings] = useState([]);
  const [filters, setFilters] = useState<FiltersType>({
    salary_currencyId: [],
    locationId: [],
    industryId: [],
    experienceId: [],
  });
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPostingsForSeekerList(setLoading, filters, setPostings);
    const unsubscribe = fetchPostingsForSeekerList(setLoading, filters, setPostings);
    return () => unsubscribe();
  }, [filters]);

  const updateFilters = (newFilters: FiltersType) => {
    setFilters(newFilters);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const FiltersComponent = (
    <Card>
      <JobFilters updateFilters={updateFilters} currentFilters={filters} />
    </Card>
  );

  return (
    <Row gutter={[16, 16]} className={'full-height'}>
      <MetaHelmet
          title="JP: Seeker Job Listing"
          description={`List of available job postings, browse and apply`}
      />

      {!isMobile && (
        <Col xl={6} sm={6} md={6}  className={'full-height overflow-y-auto'}
        >
          {FiltersComponent}
        </Col>
      )}

      <Col
        xs={24}
        sm={24}
        md={18}
        lg={18}
        xl={18}
        className={'full-height overflow-y-auto'}
      >
        <List
          pagination={{
            position: 'bottom',
            align: 'end',
            pageSize: 5,
            showSizeChanger: true,
          }}
          dataSource={postings}
          renderItem={(item) => (
            loading ? null : <JobCard posting={item} />
          )}
        >
          {loading && (
            Array(3).fill(0).map((_, index) => (
              <List.Item key={index}>
                <SeekersListSkeleton />
              </List.Item>
            ))
          )}
        </List>
      </Col>

      {isMobile && (
        <>
          <FloatButton
            type="primary"
            shape="circle"
            icon={<ControlOutlined />}
            onClick={() => setDrawerVisible(true)}
          />

          <Drawer
            title="Job Filters"
            placement="bottom"
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
            className={'full-height overflow-y-auto'}
          >
            {FiltersComponent}
          </Drawer>
        </>
      )}
    </Row>
  );
};
