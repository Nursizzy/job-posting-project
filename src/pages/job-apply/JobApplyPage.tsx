import {useEffect, useState} from 'react';
// @ts-ignore
import InputMask from 'react-input-mask';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowLeftOutlined, UploadOutlined} from '@ant-design/icons';
import {Button, Col, Flex, Form, Input, notification, Row, Space, Typography, Upload, UploadFile,} from 'antd';

import {submitApplication} from '../../shared/requests/firebase-requests';
import {MetaHelmet} from "../../shared/ui/meta-helmet/MetaHemlet";

export const JobApplyPage = () => {
  const { id: application_id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const PhoneInput = (props: { placeholder:string }) => (
    <InputMask
      mask="+9 999 9999 999"
      maskChar={null}
      {...props}
    >
      {(inputProps : { placeholder:string }) => <Input {...inputProps} />}
    </InputMask>
  );

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      try {
        await submitApplication(values, fileList, application_id);
        notification.success({ message: 'Application submitted successfully' });
        navigate('/job-listing-seeker');
      } catch (error) {
        notification.error({ message: 'Error submitting application' });
      }
    }).catch(() => {
     notification.error({ message: 'Error submitting application' });
    });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Flex vertical className={'full-height overflow-y-auto'}>
      <Space size={6} onClick={() => navigate(-1)} className={'back-button-container'}>
        <ArrowLeftOutlined className={'back-button'}/>

        <Typography.Text className={'back-button'}>
          Back to List
        </Typography.Text>
      </Space>

      <MetaHelmet
          title="JP: Job Application Page"
          description={`Job Application #${application_id}`}
      />
        <Typography.Title level={2} className={'zero-margin'}>Job Application</Typography.Title>

        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]} >
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input placeholder="Enter your first name" />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input placeholder="Enter your last name" />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  {
                    pattern: /^\+\d \d{3} \d{4} \d{3}$/,
                    message: 'Please enter a valid phone number',
                  },
                ]}
              >
                <PhoneInput placeholder="Enter your phone number" />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Form.Item
                name="uploaded_cv"
                label="Upload CV"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Please upload your CV' }]}
              >
                <Upload
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />} style={{ width: isMobile ? '100%' : '300px' }}>
                    Click to upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="cover_letter"
                label="Cover Letter"
              >
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 20 }}
                  showCount
                  maxLength={5000}
                  placeholder="Please write your cover letter"
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ width: isMobile ? '100%' : '300px', float: 'right' }}
                >
                  Submit Application
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
    </Flex>
  );
};
