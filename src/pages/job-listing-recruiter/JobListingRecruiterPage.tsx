import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SignatureOutlined,
} from '@ant-design/icons';
import {
    Button, Flex, FloatButton, List, Modal, Radio, Tag,
} from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import { RecruiterListSkeleton } from '../../shared/ui/skeletons/RecruiterListSkeleton';
import { fetchPostingsForRecruiterList, handlePostingDelete } from '../../shared/requests/firebase-requests';
import {PostingType} from "../../shared/types/seeker";
import {MetaHelmet} from "../../shared/ui/meta-helmet/MetaHemlet";


export const JobListingRecruiterPage = () => {
  const [postings, setPostings] = useState<PostingType[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreate = () => {
    navigate('/job-posting');
  };

  useEffect(() => {
    setLoading(true);
    fetchPostingsForRecruiterList(setLoading, filterStatus, setPostings);
    const unsubscribe = fetchPostingsForRecruiterList(setLoading, filterStatus, setPostings);

    return () => unsubscribe();
  }, [filterStatus]);

  const returnTag = (status:string) => {
    switch (status) {
      case 'posted':
        return <Tag color="success" icon={<CheckCircleOutlined />} style={{ maxWidth: '100px' }}>Posted</Tag>;
      default:
        return <Tag color="default" icon={<SignatureOutlined />} style={{ maxWidth: '80px' }}>Draft</Tag>;
    }
  };

  const handleStatusFilterChange = (e:any) => {
    setFilterStatus(e.target.value);
  };

  const showDeleteConfirm = (id :string, title : string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this job posting?',
      content: `You are about to delete the job posting: "${title}". This action cannot be undone.`,
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, keep it',
      onOk() {
        return handlePostingDelete(id, setDeleting);
      },
    });
  };

  return (
    <Flex vertical className={'full-height overflow-y-auto'}>
        <MetaHelmet
            title="JP: Recruiter Job Listing"
            description={`List of job postings, manage and create new job postings`}
        />
      <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
        <Radio.Group
          onChange={handleStatusFilterChange}
          value={filterStatus}
          disabled={loading}
        >
          <Radio.Button value="all">All</Radio.Button>

          <Radio.Button value="draft">Draft</Radio.Button>

          <Radio.Button value="posted">Posted</Radio.Button>
        </Radio.Group>

        {!isMobile && (
        <Button type="primary" onClick={handleCreate} disabled={loading}>
          <PlusOutlined />
          Create new Job Posting
        </Button>
        )}
      </Flex>

      <List
        dataSource={postings}
        pagination={{
          position: 'bottom',
          align: 'end',
          pageSize: 5,
          showSizeChanger: true,
        }}
        renderItem={(item) => (
          loading ? null
            : (
              <List.Item
                actions={[
                  <Button onClick={() => navigate(`/job/${item.id}`)} disabled={loading || deleting}>
                    <EditOutlined />
                    Edit
                  </Button>,
                  <Button
                    type="primary"
                    danger
                    onClick={() => showDeleteConfirm(item.id, item.title)}
                    disabled={loading || deleting}
                  >
                    <DeleteOutlined />
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={(
                    <Flex gap={12} vertical={isMobile}>
                      {returnTag(item.status)}

                      <span>{item.title}</span>
                    </Flex>
                              )}
                  description={(
                    <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: 'more' }}>
                      {item.description}
                    </Paragraph>
                              )}
                />
              </List.Item>
            )
        )}
      >
        {
                    loading && (
                      Array(3).fill(0).map((_, index) => (
                        <List.Item key={index}>
                          <RecruiterListSkeleton />
                        </List.Item>
                      ))
                    )
                }

      </List>

      {isMobile && (
      <FloatButton
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        />
      )}
    </Flex>
  );
};
